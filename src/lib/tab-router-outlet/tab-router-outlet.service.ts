import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TabGroupRouterOutLetDirective, TabRouterOutletDirective, ActivateInfo} from './tab-router-outlet';
import {MainLinkData} from '../menuside/menuside.component';

export class Data {
    [name: string]: any;
}

@Injectable()
export class TabRouterOutletService {

    tabOutlets: Data = {};
    activateInfos: Data = {};

    mainRouterOutLet: TabGroupRouterOutLetDirective;
    mainActivatedRoute: ActivatedRoute;
    menuDataCol: MainLinkData[];

    tabs: TabData[] = [];
    activeTabIndex = 0;
    addTabPosition = 0;

    //是否以TabView样式展示菜单内容，标签页模式
    showTabView = true;


    constructor() {
        //
    }


    registerOutlet(name: string, outlet: TabRouterOutletDirective): void {
        this.tabOutlets[name] = outlet;
    };

    removeOutlet(name: string): void {
        this.tabOutlets[name] = undefined;
    };

    registerActivate(name: string, activate: ActivateInfo): void {
        this.activateInfos[name] = activate;
    };

    removeActivate(name: string): void {
        this.activateInfos[name] = undefined;
    };

    addTab(label, content, path): void {

        this.tabs.splice(this.addTabPosition, 0, {
            label: label ? label : 'New Tab ' + (this.tabs.length + 1),
            content: 'New tab contents ' + (this.tabs.length + 1),
            path: path ? path : 'New Tab ' + (this.tabs.length + 1),
            tabIndex: this.addTabPosition,
            closable: true
        });

        for (let i = this.addTabPosition + 1; i < this.tabs.length; i++) {
            this.tabs[i].tabIndex = this.tabs[i].tabIndex + 1;
        }

        this.activeTabIndex = this.addTabPosition;
    }

    deleteTab(tab: any) {
        const index = this.tabs.indexOf(tab);
        this.tabs.splice(index, 1);
        for (let i = index; i < this.tabs.length; i++) {
            this.tabs[i].tabIndex = this.tabs[i].tabIndex - 1;
        }

    }

    activeTab(path: string) {
        for (const entry of this.tabs) {
            if (entry.path == path) {
                this.activeTabIndex = entry.tabIndex;
                break;
            }
        }
    }

}

export interface TabData {
    label?: any;
    content?: any;
    path?: any;
    extraContent?: any;
    disabled?: any;
    tabIndex?: any;
    closable?: boolean;
}
