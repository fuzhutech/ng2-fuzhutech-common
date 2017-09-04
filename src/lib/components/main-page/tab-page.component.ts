import {
    Component,
    ComponentFactoryResolver,
    ViewChild,
    AfterViewInit,
    ViewContainerRef,
    Input,
    OnInit
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {isUndefined} from 'util';

import {TabRouterOutletService, TabData} from '../../index';
import {MenuSideItem} from '../menuside/menu-side-item.component';

@Component({
    moduleId: module.id,
    selector: 'fz-tab-page',
    templateUrl: './tab-page.component.html',
    styleUrls: ['./tab-page.component.css'],
    providers: [TabRouterOutletService]
})
export class TabPageComponent implements OnInit {

    isDarkTheme = false;

    tabRouterOutletService: TabRouterOutletService;
    private activatedRoute: ActivatedRoute;

    @Input() configMenuData: MenuSideItem[] = [];

    constructor(service: TabRouterOutletService, activatedRoute: ActivatedRoute/*, configMenuData: MenuSideItem[]*/) {
        this.tabRouterOutletService = service;
        this.tabRouterOutletService.mainActivatedRoute = activatedRoute;
        //this.tabRouterOutletService.menuData = this.configMenuData;
    }

    ngOnInit(): void {
        this.tabRouterOutletService.menuData = this.configMenuData;
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
