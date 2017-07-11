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
    //selector: '[fz-router-outlet]'
    selector: 'fz-router-outlet'
})
export class TabGroupRouterOutLetDirective extends RouterOutlet {

    private service: TabRouterOutletService;

    /* @override */
    constructor(service: TabRouterOutletService, parentContexts: ChildrenOutletContexts, location: ViewContainerRef,
                resolver: ComponentFactoryResolver, @Attribute('name') name: string,
                changeDetector: ChangeDetectorRef) {

        super(parentContexts, location, resolver, name, changeDetector);

        this.service = service;
        this.service.tabs = [];

        service.mainRouterOutLet = this;
    }

    /* @override */
    activateWith(activatedRoute: ActivatedRoute, resolver: ComponentFactoryResolver | null) {
        const showPath = this.getShowPath(activatedRoute);
        const header = this.getHeader(activatedRoute, showPath);

        //查找对应的TabRouterOutlet、标签页
        const tabRouterOutlet = this.service.tabOutlets[showPath];
        const activateInfo = this.service.activateInfos[showPath];
        if (isUndefined(tabRouterOutlet) && isUndefined(activateInfo)) {
            //若不存在对应的TabRouterOutlet，则创建Tab
            this.service.addTab(header, null, showPath);
            //由于新创建的Tab，此时对应的TabRouterOutlet并未创建，故将activate信息保存
            this.service.registerActivate(showPath, {
                activatedRoute: activatedRoute,
                resolver: resolver
            });
        } else if (!isUndefined(tabRouterOutlet)) {
            //存在TabRouterOutlet，且有组件，则销毁
            tabRouterOutlet.deactivate();

            //标签页模式：创建路由内容；借鉴RouterOutlet.activate的原有实现代码
            tabRouterOutlet.activateWith(activatedRoute, resolver);
        }

    }

    private getShowPath(activatedRoute: ActivatedRoute): string {
        //获取showPath
        let showPath = '';
        const pathFromRoot = activatedRoute.pathFromRoot;
        let s1 = '';
        for (let i = pathFromRoot.indexOf(this.service.mainActivatedRoute); i < pathFromRoot.length; i++) {
            s1 = activatedRoute.pathFromRoot[i].snapshot.url.join('/');
            if (s1 != '') {
                showPath = showPath + '/' + s1;
            }
        }

        //获取activatedPath
        let activatedPath = '';
        let s2;
        for (const entry of activatedRoute.pathFromRoot) {
            s2 = entry.snapshot.url.join('/');
            if (s2 != '') {
                activatedPath = activatedPath + '/' + s2;
            }
        }

        return showPath;

    }

    private getHeader(activatedRoute: ActivatedRoute, showPath: string): string {
        //查找是否对应的MenuData
        const subMenuLinkItemData = this.getSubMenuLinkItemData(showPath);

        //获取header
        let header: string = null;
        if (subMenuLinkItemData != null) {
            header = subMenuLinkItemData.title;
        }

        if (header == null) {
            if ((!isUndefined(activatedRoute.routeConfig.data)) && (!isUndefined(activatedRoute.routeConfig.data['title']))) {
                header = activatedRoute.routeConfig.data['title'];
            } else {
                header = '无定义';
            }

            console.log(header);
        }

        return header;
    }

    private getSubMenuLinkItemData(showPath: string) {
        //let subMenuLinkItemData = null;
        if (isUndefined(this.service.menuDataCol)) {
            return null;
        }

        for (const entry of this.service.menuDataCol) {

            for (const subMenuLinkItem of entry.subMenuLinkCol) {
                //console.log('subMenuLinkItem.path:'+'/'+subMenuLinkItem.path+';showpath:'+showPath);
                if ('/' + subMenuLinkItem.path == showPath) {
                    return subMenuLinkItem;
                }
            }
        }

        return null;
    }

    deactivate() {
        //console.log('deactivate router outlet!');
        super.deactivate();
    };
}

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

    @Input() mainRouterOutlet: TabGroupRouterOutLetDirective;

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




