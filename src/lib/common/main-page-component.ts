import {Component, ComponentFactoryResolver, ViewChild, AfterViewInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {isUndefined} from 'util';

import {TabRouterOutletService, TabData, MainLinkData, SubLinkData} from '../index';


export class MainTabPageComponent {

    isDarkTheme = false;

    tabRouterOutletService: TabRouterOutletService;
    private activatedRoute: ActivatedRoute;

    constructor(service: TabRouterOutletService, activatedRoute: ActivatedRoute, configMenuData: MainLinkData[]) {
        this.tabRouterOutletService = service;
        this.tabRouterOutletService.mainActivatedRoute = activatedRoute;
        this.tabRouterOutletService.menuDataCol = configMenuData;
    }

    onRouterLinkClick(event: SubLinkData) {

        //选择对应的标签页tab
        if (!this.tabRouterOutletService.showTabView) return;

        //获取showPath
        let showPath = '';
        if ((!isUndefined(event)) && (!isUndefined(event.path)))
            showPath = event.path;

        //查找对应的标签页
        this.tabRouterOutletService.activeTab('/' + showPath);
    }

    closeTab(event: Event, tab: TabData) {
        if (tab.closable)
            this.tabRouterOutletService.deleteTab(tab);
    }
}
