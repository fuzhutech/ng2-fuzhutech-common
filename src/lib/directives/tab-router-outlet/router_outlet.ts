/**
 * 拷贝router-outlet源码，因为官方源码私有变量无法访问。其中以“_fz”结尾的变量用途均为放开访问权限
 */
import {Directive, Input, Attribute, ChangeDetectorRef} from '@angular/core';
import {ChildrenOutletContexts, RouterOutlet} from '@angular/router';

import {
    ComponentFactoryResolver,
    Injector,
    OnDestroy, OnInit,
    ViewContainerRef,
    ComponentRef
} from '@angular/core';
import {ActivatedRoute, PRIMARY_OUTLET} from '@angular/router';
import {TabRouterOutletService} from './tab-router-outlet.service';
import {isUndefined} from 'util';

@Directive({selector: 'fz-router-outlet'})
export class FzRouterOutletDirective extends RouterOutlet implements OnDestroy, OnInit {

    protected activated_fz: ComponentRef<any> | null = null;
    protected _activatedRoute_fz: ActivatedRoute | null = null;
    protected name_fz: string;

    /* @override */
    /**
     * 放宽原始私有变量访问权限
     * @param {ChildrenOutletContexts} parentContexts_fz
     * @param {ViewContainerRef} location_fz
     * @param {ComponentFactoryResolver} resolver_fz
     * @param {string} name
     * @param {ChangeDetectorRef} changeDetector_fz
     * @param {TabRouterOutletService} service
     */
    constructor(protected parentContexts_fz: ChildrenOutletContexts, public location_fz: ViewContainerRef,
                protected  resolver_fz: ComponentFactoryResolver, @Attribute('name') name: string,
                protected  changeDetector_fz: ChangeDetectorRef) {

        super(parentContexts_fz, location_fz, resolver_fz, name, changeDetector_fz);

        this.name_fz = name || PRIMARY_OUTLET;
    }

    /* @override */
    ngOnDestroy(): void {
        this.parentContexts_fz.onChildOutletDestroyed(this.name_fz);
    }

    /* @override */
    ngOnInit(): void {
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
        if (this.activated_fz) {
            const c = this.component;
            this.activated_fz.destroy();
            this.activated_fz = null;
            this._activatedRoute_fz = null;
            this.deactivateEvents.emit(c);
        }
    };

    /* @override */
    /**
     * 因activatedRoute、snapshot属性访问限制，更换为公开方法
     * @param {ActivatedRoute} activatedRoute
     * @param {ComponentFactoryResolver} resolver
     */
    activateWith(activatedRoute: ActivatedRoute, resolver: ComponentFactoryResolver | null) {
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

/**
 * @angular/router 原始代码未导出，拷贝实现
 */
export class OutletInjector implements Injector {
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




