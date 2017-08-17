import {Directive, Input, Attribute, ChangeDetectorRef} from '@angular/core';
import {ChildrenOutletContexts, RouterOutlet} from '@angular/router';

import {
    ComponentFactoryResolver,
    EventEmitter,
    Injector,
    OnDestroy, OnInit,
    ViewContainerRef,
    AfterViewInit,
    ComponentRef
} from '@angular/core';
import {ActivatedRoute, PRIMARY_OUTLET} from '@angular/router';
import {TabRouterOutletService} from './tab-router-outlet.service';
import {isUndefined} from 'util';

import {getShowPath, getHeader} from './utils';

@Directive({selector: 'fz-router-outlet'})
export class TabGroupRouterOutLetDirective extends RouterOutlet implements OnDestroy, OnInit {

    private activated_fz: ComponentRef<any> | null = null;
    private _activatedRoute_fz: ActivatedRoute | null = null;
    private name_fz: string;

    /* @override */
    constructor(private parentContexts_fz: ChildrenOutletContexts,
                private location_fz: ViewContainerRef,
                private resolver_fz: ComponentFactoryResolver, @Attribute('name') name: string,
                private changeDetector_fz: ChangeDetectorRef,
                private service: TabRouterOutletService) {

        super(parentContexts_fz, location_fz, resolver_fz, name, changeDetector_fz);
        console.log('fz-router-outlet constructor....');

        this.name_fz = name || PRIMARY_OUTLET;

        //this.service = service;
        this.service.tabs = [];

        service.mainRouterOutLet = this;
    }

    /* @override */
    ngOnDestroy(): void {
        console.log('fz-router-outlet ngOnDestroy....');
        this.parentContexts_fz.onChildOutletDestroyed(this.name_fz);
    }

    /* @override */
    ngOnInit(): void {
        console.log('fz-router-outlet ngOnInit....');
        if (!this.activated_fz) {
            // If the outlet was not instantiated at the time the route got activated we need to populate
            // the outlet when it is initialized (ie inside a NgIf)
            const context = this.parentContexts_fz.getContext(this.name_fz);
            if (context && context.route) {
                if (context.attachRef) {
                    // `attachRef` is populated when there is an existing component to mount
                    this.attach(context.attachRef, context.route);
                } else {
                    // otherwise the component defined in the configuration is created
                    this.activateWith(context.route, context.resolver || null);
                }
            }
        }
    }

    get isActivated(): boolean {
        return !!this.activated_fz;
    }

    get component(): Object {
        if (!this.activated_fz) {
            throw new Error('Outlet is not activated');
        }
        return this.activated_fz.instance;
    }

    get activatedRoute(): ActivatedRoute {
        if (!this.activated_fz) {
            throw new Error('Outlet is not activated');
        }
        return this._activatedRoute_fz as ActivatedRoute;
    }

    get activatedRouteData() {
        if (this._activatedRoute_fz) {
            return this._activatedRoute_fz.snapshot.data;
        }
        return {};
    }

    /**
     * Called when the `RouteReuseStrategy` instructs to detach the subtree
     */
    detach(): ComponentRef<any> {
        if (!this.activated_fz) {
            throw new Error('Outlet is not activated');
        }
        this.location_fz.detach();
        const cmp = this.activated_fz;
        this.activated_fz = null;
        this._activatedRoute_fz = null;
        return cmp;
    }

    /**
     * Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree
     */
    attach(ref: ComponentRef<any>, activatedRoute: ActivatedRoute) {
        this.activated_fz = ref;
        this._activatedRoute_fz = activatedRoute;
        this.location_fz.insert(ref.hostView);
    }

    /* @override */
    deactivate() {
        console.log('fz-router-outlet deactivate....');
        if (this.activated_fz) {
            const c = this.component;
            this.activated_fz.destroy();
            this.activated_fz = null;
            this._activatedRoute_fz = null;
            this.deactivateEvents.emit(c);
        }
    };

    /* @override */

    /*activateWith(activatedRoute: ActivatedRoute, resolver: ComponentFactoryResolver | null) {
        const showPath = getShowPath(activatedRoute);
        const header = getHeader(activatedRoute, showPath);

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

    }*/

    /* @override */
    activateWith(activatedRoute: ActivatedRoute, resolver: ComponentFactoryResolver | null) {
        console.log('fz-router-outlet activateWith....');

        if (this.isActivated) {
            throw new Error('Cannot activate an already activated outlet');
        }
        this._activatedRoute_fz = activatedRoute;

        //const snapshot = activatedRoute._futureSnapshot;
        //const component = <any>snapshot._routeConfig !.component;

        const snapshot = activatedRoute.snapshot;
        const component = <any>snapshot.routeConfig !.component;

        resolver = resolver || this.resolver_fz;
        const factory = resolver.resolveComponentFactory(component);
        const childContexts = this.parentContexts_fz.getOrCreateContext(this.name_fz).children;
        const injector = new OutletInjector(activatedRoute, childContexts, this.location_fz.injector);
        this.activated_fz = this.location_fz.createComponent(factory, this.location_fz.length, injector);
        // Calling `markForCheck` to make sure we will run the change detection when the
        // `RouterOutlet` is inside a `ChangeDetectionStrategy.OnPush` component.
        this.changeDetector_fz.markForCheck();
        this.activateEvents.emit(this.activated_fz.instance);
    }

}

class OutletInjector implements Injector {
    constructor(private route: ActivatedRoute, private childContexts: ChildrenOutletContexts,
                private parent: Injector) {
    }

    get (token: any, notFoundValue?: any): any {
        if (token === ActivatedRoute) {
            return this.route;
        }

        if (token === ChildrenOutletContexts) {
            return this.childContexts;
        }

        return this.parent.get(token, notFoundValue);
    }
}




