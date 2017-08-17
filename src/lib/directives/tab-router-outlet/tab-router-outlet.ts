import {Directive, Input, Attribute, ChangeDetectorRef} from '@angular/core';
import {ChildrenOutletContexts, RouterOutlet} from '@angular/router';

import {
    ComponentFactoryResolver,
    EventEmitter,
    Injector,
    OnDestroy,
    ViewContainerRef,
    AfterViewInit
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TabRouterOutletService} from './tab-router-outlet.service';
import {isUndefined} from 'util';

@Directive({
    selector: 'fz-tab-router-outlet'
})
export class TabRouterOutletDirective implements AfterViewInit, OnDestroy {

    private parentContexts;
    private location;
    private resolver;
    @Input() name: string;
    private activated;
    private _activatedRoute;
    //outletMap: RouterOutletMap;
    activateEvents: EventEmitter<any>;
    deactivateEvents: EventEmitter<any>;

    private service: TabRouterOutletService;

    @Input() mainRouterOutlet: any;

    //@Input() mainRouterOutlet: TabGroupRouterOutLetDirective;

    constructor(service: TabRouterOutletService, parentContexts: ChildrenOutletContexts, location: ViewContainerRef,
                resolver: ComponentFactoryResolver) {
        this.parentContexts = parentContexts;
        this.location = location;
        this.resolver = resolver;
        //this.name = name;
        this.activateEvents = new EventEmitter();
        this.deactivateEvents = new EventEmitter();
        //parentOutletMap.registerOutlet(name ? name : PRIMARY_OUTLET, this);

        this.service = service;
        this.service.registerOutlet(this.name, this);
    };

    public ngAfterViewInit() {
        this.service.registerOutlet(this.name, this);

        //检查是否存在保存的activate信息
        const info = this.service.activateInfos[this.name];
        if (!isUndefined(info)) {
            //根据activateInfo实例化组件
            this.activateWith(info.activatedRoute, info.resolver);
            this.service.removeActivate(this.name);
        }
    }

    ngOnDestroy() {
        this.service.removeOutlet(this.name);
        this.service.removeActivate(this.name);
    }

    get isActivated(): boolean {
        return !!this.activated;
    }

    activateWith(activatedRoute: ActivatedRoute, resolver: ComponentFactoryResolver | null) {
        if (this.isActivated) {
            throw new Error('Cannot activate an already activated outlet');
        }

        this._activatedRoute = activatedRoute;

        const snapshot = activatedRoute.snapshot;
        const component = <any>snapshot.routeConfig.component;

        resolver = resolver || this.resolver;
        const factory = resolver.resolveComponentFactory(component);
        const childContexts = this.parentContexts.getOrCreateContext(this.name).children;
        const injector = new OutletInjector(activatedRoute, childContexts, this.location.injector);

        this.activated = this.location.createComponent(factory, this.location.length, injector);
        // Calling `markForCheck` to make sure we will run the change detection when the
        // `RouterOutlet` is inside a `ChangeDetectionStrategy.OnPush` component.
        this.activated.changeDetectorRef.detectChanges();
        this.activated.changeDetectorRef.markForCheck();

        this.activateEvents.emit(this.activated.instance);

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
            this.deactivateEvents.emit(c);
        }
    };
}

class OutletInjector implements Injector {
    constructor(private route: ActivatedRoute, private childContexts: ChildrenOutletContexts, private parent: Injector) {
    }

    get(token: any, notFoundValue?: any): any {
        if (token === ActivatedRoute) {
            return this.route;
        }

        if (token === ChildrenOutletContexts) {
            return this.childContexts;
        }

        return this.parent.get(token, notFoundValue);
    }
}

export interface ActivateInfo {
    activatedRoute: ActivatedRoute;
    resolver: ComponentFactoryResolver;
}




