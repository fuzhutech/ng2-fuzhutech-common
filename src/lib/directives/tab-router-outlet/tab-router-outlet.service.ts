import {Injectable, ComponentFactoryResolver, ComponentRef} from '@angular/core';
import {ActivatedRoute, RouterOutlet, ChildrenOutletContexts} from '@angular/router';
import {FzRouterOutletDirective} from './router_outlet';
import {FzTabRouterOutletDirective, ActivateInfo} from './tab-router-outlet';
import {isUndefined} from 'util';
import {MenuSideItem} from '../../components/menuside/menu-side-item.component';

export class TabOutletContext {
    showPath: string;
    header: string;
    tab: any;
    isActivated = false;


    outlet: RouterOutlet | null = null;

    //children = new ChildrenOutletContexts();
    //attachRef: ComponentRef<any> | null = null;

    tabOutlet: any | null = null;
    route: ActivatedRoute | null = null;
    resolver: ComponentFactoryResolver | null = null;
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

@Injectable()
export class TabRouterOutletService {
    mainRouterOutLet: FzRouterOutletDirective;
    mainActivatedRoute: ActivatedRoute;

    private contexts = new Map<string, TabOutletContext>();

    public activeTabIndex = 0;
    public addTabPosition = 0;
    public menuData: MenuSideItem[];
    public tabs: TabData[] = [];

    constructor() {
        console.log('TabRouterOutlet1Service constructor');
    }

    onChildOutletCreated(childName: string, outlet: FzTabRouterOutletDirective): void {
        /*const context = this.getOrCreateContext(childName);
        context.outlet = outlet;
        this.contexts.set(childName, context);*/

        const context = this.getContext(childName);
        if (context) {
            context.tabOutlet = outlet;
        } else {
            console.log('TabRouterOutlet1Service onChildOutletCreated 不存在对应的 context');
        }
    }

    onChildOutletDestroyed(childName: string): void {
        /*const context = this.getContext(childName);
        if (context) {
            context.outlet = null;
        }*/

        const context = this.getContext(childName);
        if (context) {
            context.tabOutlet = null;
        }
    }

    onOutletDeactivated(): Map<string, TabOutletContext> {
        const contexts = this.contexts;
        this.contexts = new Map();
        return contexts;
    }

    getContext(childName: string): TabOutletContext | null {
        return this.contexts.get(childName) || null;
    }

    getOrCreateContext(activatedRoute: ActivatedRoute, resolver: ComponentFactoryResolver | null): TabOutletContext {
        const showPath = this.getShowPath(activatedRoute);
        let context = this.contexts.get(showPath) || null;

        if (!context) {
            console.log('TabRouterOutlet1Service 不存在context');
            context = new TabOutletContext();
            context.showPath = showPath;
            context.header = this.getHeader(activatedRoute, showPath);
            context.tab = this.addTab(context);

            context.route = activatedRoute;
            context.resolver = resolver;


            this.contexts.set(showPath, context);
        }

        return context;
    }

    private getShowPath(activatedRoute: ActivatedRoute): string {
        //获取showPath
        let showPath = '';
        const pathFromRoot = activatedRoute.pathFromRoot;
        let s1 = '';
        for (let i = pathFromRoot.indexOf(this.mainActivatedRoute); i < pathFromRoot.length; i++) {
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
        if (isUndefined(this.menuData)) {
            return null;
        }

        for (const entry of this.menuData) {
            if (entry.children) {
                for (const subMenuLinkItem of entry.children) {
                    if ('/' + subMenuLinkItem.path == showPath) {
                        return subMenuLinkItem;
                    }
                }
            }
        }

        return null;
    }

    /**
     * 添加tab，只是添加相关信息，页面中tab组件还未真正建立
     * @param {TabContext} context
     * @returns {TabData}
     */
    private addTab(context: TabOutletContext): TabData {
        console.log('TabRouterOutletService addTab.......');

        const tab = {
            label: context.header ? context.header : '未定义 ' + (this.tabs.length + 1),
            content: 'New tab contents ' + (this.tabs.length + 1),
            path: context.showPath,
            tabIndex: this.addTabPosition,
            closable: true
        };

        this.tabs.splice(this.addTabPosition, 0, tab);

        for (let i = this.addTabPosition + 1; i < this.tabs.length; i++) {
            this.tabs[i].tabIndex = this.tabs[i].tabIndex + 1;
        }

        this.activeTabIndex = this.addTabPosition;

        return tab;
    }

    public deleteTab(tab: any) {
        const index = this.tabs.indexOf(tab);
        this.tabs.splice(index, 1);
        for (let i = index; i < this.tabs.length; i++) {
            this.tabs[i].tabIndex = this.tabs[i].tabIndex - 1;
        }

    }

    public activeTab(path: string) {
        for (const entry of this.tabs) {
            if (entry.path == path) {
                this.activeTabIndex = entry.tabIndex;
                break;
            }
        }
    }

}
