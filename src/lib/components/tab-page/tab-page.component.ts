import {
    Component,
    ComponentFactoryResolver,
    ViewChild,
    AfterViewInit,
    ViewContainerRef,
    Input,
    OnInit, OnDestroy
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {ContextMenu} from 'primeng/primeng';
import {isUndefined} from 'util';

import {TabData, TabRouterOutletService} from '../../directives/tab-router-outlet/tab-router-outlet.service';
import {MenuSideItem} from '../menu-side/menu-side-item.component';
import {MenuInfo} from '../../core/auth-info/auth-info.model';

@Component({
    moduleId: module.id,
    selector: 'fz-tab-page',
    templateUrl: './tab-page.component.html',
    styleUrls: ['./tab-page.component.css'],
    providers: [TabRouterOutletService]
})
export class TabPageComponent implements OnInit, OnDestroy {

    tabRouterOutletService: TabRouterOutletService;

    @Input() configMenuData: MenuSideItem[] = [];

    items = [
        {label: '关闭标签页', icon: 'fa-search', command: (event) => this.Close(event)},
        {label: '关闭全部', icon: 'fa-close', command: (event) => this.CloseAll(event)}
    ];

    private subscription: Subscription;
    private menuInfo: MenuInfo;
    private systemId = 110;

    constructor(service: TabRouterOutletService, activatedRoute: ActivatedRoute/*, configMenuData: MenuSideItem[]*/) {
        this.tabRouterOutletService = service;
        this.tabRouterOutletService.mainActivatedRoute = activatedRoute;
        //this.tabRouterOutletService.menuData = this.configMenuData;
    }

    ngOnInit(): void {
        console.log('TabPageComponent ngOnInit');

        this.tabRouterOutletService.menuData = this.configMenuData;

        /*this.authInfoService.refreshMenuInfo(this.systemId);

        this.subscription = this.authInfoService.menuInfoSubject
            .subscribe(
                data => {
                    this.menuInfo = data;
                },
                error => console.error(error)
            );*/
    }

    ngOnDestroy() {
        if (this.subscription !== undefined) {
            this.subscription.unsubscribe();
        }

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

    onNodeRightClick(event: MouseEvent, tab: TabData, contextMenu: ContextMenu) {
        console.log(contextMenu);
        contextMenu.show(event);
    }

    Close(event) {
        console.log(event);
    }

    CloseAll(event) {
        console.log(event);
    }
}
