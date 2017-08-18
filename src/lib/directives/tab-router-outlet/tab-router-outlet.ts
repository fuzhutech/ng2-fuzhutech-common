import {Directive, Input, Attribute, ChangeDetectorRef} from '@angular/core';
import {ChildrenOutletContexts, RouterOutlet} from '@angular/router';

import {
    ComponentFactoryResolver,
    EventEmitter,
    Injector,
    OnDestroy,
    ViewContainerRef,
    AfterViewInit,
    OnChanges,
    SimpleChanges, OnInit, DoCheck, AfterContentChecked, AfterContentInit, AfterViewChecked, ComponentRef
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TabRouterOutletService} from './tab-router-outlet.service';
import {isUndefined} from 'util';
import {OutletInjector} from './router_outlet';

@Directive({
    selector: 'fz-tab-router-outlet'
})
export class FzTabRouterOutletDirective
    implements AfterViewInit, OnDestroy, OnChanges, OnInit, DoCheck, AfterContentChecked, AfterContentInit, AfterViewChecked {

    protected activated: ComponentRef<any> | null = null;
    protected _activatedRoute: ActivatedRoute | null = null;

    @Input() name: string;
    @Input() mainRouterOutlet: any;

    constructor(protected parentContexts_fz: ChildrenOutletContexts,
                protected  location_fz: ViewContainerRef,
                protected  resolver_fz: ComponentFactoryResolver,
                protected  changeDetector_fz: ChangeDetectorRef,
                protected  service: TabRouterOutletService) {

        console.log('TabRouterOutletDirective constructor...');
    }

    /**
     * 当被绑定的输入属性的值发生变化时调用，首次调用一定会发生在 ngOnInit之前
     * @param {SimpleChanges} changes
     */
    ngOnChanges(changes: SimpleChanges) {
        console.log('TabRouterOutletDirective ngOnChanges...', this.name, changes);
    }

    /**
     * 在第一轮 ngOnChanges 完成之后调用。
     * (注：也就是说当每个输入属性的值都被触发了一次 ngOnChanges 之后才会调用 ngOnInit ，此时所有输入属性都已经有了正确的初始绑定值 )
     */
    ngOnInit(): void {
        console.log('TabRouterOutletDirective ngOnInit...', this.name);
        this.service.onChildOutletCreated(this.name, this);

        //检查是否存在保存的activate信息,//标签页是否被激活，若未激活，则只是增加了tab信息，但页面中tab组件还未真正建立
        const context = this.service.getContext(this.name);
        if (!context.isActivated) {
            context.isActivated = true;
            this.activateWith(context.route, context.resolver);
        }
    }

    /**
     * 在每个 Angular 变更检测周期中调用。
     */
    ngDoCheck() {
        //console.log('TabRouterOutletDirective ngDoCheck...', this.name);
    }

    /**
     * 当把内容投影进组件之后调用。
     */
    ngAfterContentInit() {
        //console.log('TabRouterOutletDirective ngAfterContentInit...', this.name);
    }

    /**
     * 每次完成被投影组件内容的变更检测之后调用。
     */
    ngAfterContentChecked() {
        //console.log('TabRouterOutletDirective ngAfterContentChecked...', this.name);
    }

    /**
     * 初始化完组件视图及其子视图之后调用。
     */
    public ngAfterViewInit() {
        console.log('TabRouterOutletDirective ngAfterViewInit...', this.name);

        //检查是否存在保存的activate信息,//标签页是否被激活，若未激活，则只是增加了tab信息，但页面中tab组件还未真正建立
        /*const context = this.service.getContext(this.name);
        if (!context.isActivated) {
            context.isActivated = true;
            this.activateWith(context.route, context.resolver);
        }*/
    }

    /**
     * 每次做完组件视图和子视图的变更检测之后调用。
     */
    ngAfterViewChecked() {
        //console.log('TabRouterOutletDirective ngAfterViewChecked...', this.name);
    }

    /**
     * 当 Angular 每次销毁指令 / 组件之前调用。
     */
    ngOnDestroy() {
        //this.service.removeOutlet(this.name);
        //this.service.removeActivate(this.name);

        this.service.onChildOutletDestroyed(this.name);
    }

    get isActivated(): boolean {
        return !!this.activated;
    }

    activateWith(activatedRoute: ActivatedRoute, resolver: ComponentFactoryResolver | null) {

        console.log('fz-tab-router-outlet activateWith....');
        if (this.isActivated) {
            throw new Error('Cannot activate an already activated outlet');
        }

        this._activatedRoute = activatedRoute;

        const snapshot = activatedRoute.snapshot;
        const component = <any>snapshot.routeConfig.component;

        resolver = resolver || this.resolver_fz;
        const factory = resolver.resolveComponentFactory(component);
        const childContexts = this.parentContexts_fz.getOrCreateContext(this.name).children;
        const injector = new OutletInjector(activatedRoute, childContexts, this.location_fz.injector);

        this.activated = this.location_fz.createComponent(factory, this.location_fz.length, injector);
        // Calling `markForCheck` to make sure we will run the change detection when the
        // `RouterOutlet` is inside a `ChangeDetectionStrategy.OnPush` component.
        this.activated.changeDetectorRef.detectChanges();
        this.activated.changeDetectorRef.markForCheck();

        //选中对应的标签
        this.service.activeTab(this.name);
    }

    deactivate() {
        //console.log('deactivate router outlet!');
        if (this.activated) {
            const c = this.activated.instance;
            this.activated.destroy();
            this.activated = null;
            this._activatedRoute = null;
        }
    };
}

export interface ActivateInfo {
    activatedRoute: ActivatedRoute;
    resolver: ComponentFactoryResolver;
}




