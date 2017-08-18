/**
 * 继承{FzRouterOutletDirective} from './router_outlet'，修改为组件在tab标签页面展示
 */
import {Directive, Attribute, ChangeDetectorRef} from '@angular/core';
import {ChildrenOutletContexts} from '@angular/router';

import {
    ComponentFactoryResolver,
    OnDestroy, OnInit,
    ViewContainerRef,
} from '@angular/core';
import {ActivatedRoute, PRIMARY_OUTLET} from '@angular/router';
import {TabRouterOutletService} from './tab-router-outlet.service';
import {isUndefined} from 'util';

import {FzRouterOutletDirective} from './router_outlet';


@Directive({selector: 'fz-main-router-outlet'})
export class FzMainRouterOutLetDirective extends FzRouterOutletDirective implements OnDestroy, OnInit {

    /* @override */
    /**
     * 增加TabRouterOutletService变量
     * @param {ChildrenOutletContexts} parentContexts
     * @param {ViewContainerRef} location
     * @param {ComponentFactoryResolver} resolver
     * @param {string} name
     * @param {ChangeDetectorRef} changeDetector
     * @param {TabRouterOutletService} service
     */
    constructor(parentContexts: ChildrenOutletContexts,
                location: ViewContainerRef,
                resolver: ComponentFactoryResolver, @Attribute('name') name: string,
                changeDetector: ChangeDetectorRef,
                protected service: TabRouterOutletService) {

        super(parentContexts, location, resolver, name, changeDetector);
        console.log('fz-main-router-outlet constructor....');

        this.name_fz = name || PRIMARY_OUTLET;

        this.service.tabs = [];
        this.service.mainRouterOutLet = this;
    }

    /* @override */
    /**
     * todo:存在点击到导航子页面，返回到主页，再次点击导航子页面不出现界面的情况，待排查
     * @param {ActivatedRoute} activatedRoute
     * @param {ComponentFactoryResolver} resolver
     */
    activateWith(activatedRoute: ActivatedRoute, resolver: ComponentFactoryResolver | null) {
        console.log('fz-main-router-outlet activateWith....');

        if (this.isActivated) {
            throw new Error('Cannot activate an already activated outlet');
        }
        this._activatedRoute_fz = activatedRoute;

        //const snapshot = activatedRoute.snapshot;
        //const component = <any>snapshot.routeConfig !.component;

        resolver = resolver || this.resolver_fz;
        /*const factory = resolver.resolveComponentFactory(component);
        const childContexts = this.parentContexts_fz.getOrCreateContext(this.name_fz).children;
        const injector = new OutletInjector(activatedRoute, childContexts, this.location_fz.injector);

        this.activated_fz = this.location_fz.createComponent(factory, this.location_fz.length, injector);
        // Calling `markForCheck` to make sure we will run the change detection when the
        // `RouterOutlet` is inside a `ChangeDetectionStrategy.OnPush` component.
        this.changeDetector_fz.markForCheck();
        this.activateEvents.emit(this.activated_fz.instance);*/

        //-------------------------------------------------------------------------------------

        //查找标签页信息,若没有则创建
        const tabContext = this.service.getOrCreateContext(activatedRoute, resolver);

        //已经存在标签页组件
        if (tabContext.tabOutlet) {
            console.log('fz-main-router-outlet activateWith....已经存在标签页组件');
            //1.销毁组件
            tabContext.tabOutlet.deactivate();
            //2.创建路由内容；借鉴RouterOutlet.activate的原有实现代码
            tabContext.tabOutlet.activateWith(activatedRoute, resolver);
        }

        //-------------------------------------------------------------------------------------

    }

}




