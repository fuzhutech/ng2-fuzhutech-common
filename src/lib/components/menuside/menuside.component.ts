import {Component, OnInit, Input, Output, EventEmitter, QueryList, ContentChildren, ViewChildren} from '@angular/core';
import {MenuItem} from 'primeng/primeng';
import {Message} from 'primeng/primeng';

import {Router, ActivatedRoute, Routes} from '@angular/router';
import {FzMenuItemComponent, MenuSideItem} from './menu-side-item.component';

@Component({
    selector: 'fz-menuside',
    templateUrl: './menuside.component.html',
    styleUrls: ['./menuside.component.css']
})
export class MenuSideComponent implements OnInit {

    activeMenuId: string;

    mobileMenuActive = false;

    inactive = false;

    @Input() menuDataCol: MainLinkData[]; //数组
    menuDataItem: SubLinkData;  //数据项

    @Input() menuData: MenuSideItem[]; //数组

    msgs: Message[] = [];


    private items: MenuItem[];

    //@ContentChildren(FzMenuItemComponent) menuItems: QueryList<FzMenuItemComponent>;
    @ViewChildren(FzMenuItemComponent) menuItems;

    @Output() onRouterLinkClick: EventEmitter<any> = new EventEmitter();


    toggleMenu(e) {
        this.mobileMenuActive = !this.mobileMenuActive;
        e.preventDefault();

        this.inactive = !this.inactive;
    }

    /*------------------*/


    constructor(private router: Router, private route: ActivatedRoute) {
        //console.log(router);
        //console.log(route);
        //this.menuDataCol = MainLink;

        //title: string;
        //path?: string;
        //children?: MenuSideItem;

        this.items = [];

        this.menuData = [
            {
                path: '/test',
                title: '测试菜单'
            },
            {
                title: '系统管理',
                children: [
                    {
                        path: '/menumodel',
                        title: '权限变更'
                    },
                    {
                        path: '/breadcrumb',
                        title: '版本升级'
                    },
                    {
                        path: '/contextmenu',
                        title: '需求管理'
                    },
                    {
                        title: '故障登记',
                        children: [
                            {path: 'test2', title: '测试菜单2'},
                            {path: 'test3', title: '测试菜单3'}
                        ]
                    }
                ]
            }/*,
            {
                title: '硬件管理',
                children: [
                    {
                        path: '/computer1',
                        title: '工位电脑'
                    },
                    {
                        path: '/server',
                        title: '服务器'
                    },
                    {
                        path: '/device',
                        title: '网络设备'
                    }
                ]
            }*/
        ];
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Update', icon: 'fa-refreshAction', command: () => {
                this.update();
            }
            },
            {
                label: 'Delete', icon: 'fa-close', command: () => {
                this.delete();
            }
            },
            {label: 'Angular.io', icon: 'fa-link', url: 'http://angular.io'},
            {label: 'Theming', icon: 'fa-paint-brush', routerLink: ['/theming']}
        ];
    }

    save() {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Success', detail: 'Data Saved'});
    }

    update() {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Success', detail: 'Data Updated'});
    }

    delete() {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Success', detail: 'Data Deleted'});
    }

    onclick() {
        console.log('menuside click');
        //return confirm('Confirm?');
    }

    /*
     routerLinkClick(event: Event,path:string,title:string) {

     this.mobileMenuActive = false;

     this.onRouterLinkClick.next({originalEvent: event,path:path,title:title});
     }*/

    routerLinkClick1(event: Event, subLink: SubLinkData) {
        this.mobileMenuActive = false;

        this.onRouterLinkClick.next(subLink);
    }


    test() {
        console.log(this.menuItems);
        this.menuItems.forEach((node: FzMenuItemComponent) => node._active = false);
    }

}

export interface MainLinkData {
    id: string;
    img: string;
    text: string;

    subMenuLinkCol: SubLinkData[];
}

export interface SubLinkData {
    path: string;
    title: string;

    children?: SubLinkData[];
}

