import {Component, ComponentFactoryResolver, ViewChild, AfterViewInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {isUndefined} from 'util';

import {TabRouterOutletService, TabData} from '../../index';
import {MenuSideItem} from '../menuside/menu-side-item.component';


export class MainTabPageComponent {

    isDarkTheme = false;

    tabRouterOutletService: TabRouterOutletService;
    private activatedRoute: ActivatedRoute;

    constructor(service: TabRouterOutletService, activatedRoute: ActivatedRoute, configMenuData: MenuSideItem[]) {
        this.tabRouterOutletService = service;
        this.tabRouterOutletService.mainActivatedRoute = activatedRoute;
        this.tabRouterOutletService.menuData = configMenuData;
    }

    onRouterLinkClick(event: MenuSideItem) {
        //获取showPath
        let showPath = '';
        if ((!isUndefined(event)) && (!isUndefined(event.path))) {
            showPath = event.path;
        }

        //查找对应的标签页
        this.tabRouterOutletService.activeTab('/' + showPath);
    }

    closeTab(event: Event, tab: TabData) {
        if (tab.closable) {
            this.tabRouterOutletService.deleteTab(tab);
        }
    }
}
