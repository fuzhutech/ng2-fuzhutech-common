import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MenuItem} from 'primeng/primeng';
import {Message} from 'primeng/primeng';

import {Router, ActivatedRoute, Routes} from '@angular/router';

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

    msgs: Message[] = [];


    private items: MenuItem[];

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

export const MainLink: MainLinkData[] = [
    {
        id: 'menu_menu',
        img: 'showcase/resources/images/mono/menu.svg',
        text: '系统管理',
        subMenuLinkCol: [
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
                path: '/megamenu',
                title: '故障登记'
            }
        ]
    },
    {
        id: 'menu_overlay',
        img: 'showcase/resources/images/mono/overlay.svg',
        text: '硬件管理',
        subMenuLinkCol: [
            {
                path: '/computer',
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
    },
    {
        id: 'menu_dnd',
        img: 'showcase/resources/images/mono/dragdrop.svg',
        text: '项目管理',
        subMenuLinkCol: [
            {
                path: '/galleria',
                title: '项目列表'
            },
            {
                path: '/galleria',
                title: '管理流程'
            }
        ]
    },
    {
        id: 'menu_multimedia',
        img: 'showcase/resources/images/mono/multimedia.svg',
        text: '预算费用',
        subMenuLinkCol: [
            {
                path: '/galleria',
                title: '年度预算'
            },
            {
                path: '/toolbar',
                title: '支出管理'
            }
        ]
    },
    {
        id: 'menu_file',
        img: 'showcase/resources/images/mono/file.svg',
        text: '文档管理',
        subMenuLinkCol: [
            {
                path: '/galleria',
                title: '合同'
            },
            {
                path: '/tabview',
                title: '签报'
            }
        ]
    },
    {
        id: 'menu_panel',
        img: 'showcase/resources/images/mono/panel.svg',
        text: '其他工作',
        subMenuLinkCol: [
            {
                path: '/accordion',
                title: 'accordion'
            },
            {
                path: '/fieldset',
                title: 'fieldset'
            }
        ]
    },
    {
        id: 'menu_messages',
        img: 'showcase/resources/images/mono/message.svg',
        text: '任务计划',
        subMenuLinkCol: [
            {
                path: '/messages',
                title: 'messages'
            },
            {
                path: '/growl',
                title: 'growl'
            }
        ]
    },
    {
        id: 'chartmenutitle',
        img: 'showcase/resources/images/mono/charts.svg',
        text: '报表管理',
        subMenuLinkCol: [
            {
                path: '/chart',
                title: 'ChartModel'
            },
            {
                path: '/chart/bar',
                title: 'Bar'
            }
        ]
    },
    {
        id: 'datamenutitle',
        img: 'showcase/resources/images/mono/data.svg',
        text: '数据字典',
        subMenuLinkCol: [
            {
                path: '/user',
                title: '用户'
            },
            {
                path: '/computer',
                title: '工位电脑'
            },
            {
                path: '/role',
                title: '角色管理'
            },
            {
                path: '/auth/organization',
                title: '组织管理'
            },
            {
                path: '/todo',
                title: 'TODO任务'
            }
        ]
    }
];

/*export declare class MenuLinkDataModule {
 constructor(guard: any);

 static forRoot(routes: Routes, config?: ExtraOptions): ModuleWithProviders;

 static forChild(routes: Routes): ModuleWithProviders;
 }*/

/*<span id="menu_chart" #chartmenutitle class="MenuSideMainLink bordersOfMenuSide"
 [class.MenuSideMainLinkDark]="chartmenutitle.id == activeMenuId"
 (click)="activeMenuId = chartmenutitle.id">
 <img src="showcase/resources/images/mono/charts.svg"/>
 <span class="MainLinkText">报表管理</span></span>
 <div class="SubMenuLinkContainer"
 [ngClass]="{'submenushow': (chartmenutitle.id == activeMenuId), 'submenuhide': (chartmenutitle.id != activeMenuId)}">
 <a class="SubMenuLink" [routerLink]="['/chart']" (click)="mobileMenuActive = false">&#9679; ChartModel</a>
 <a class="SubMenuLink" [routerLink]="['/chart/bar']" (click)="mobileMenuActive = false">&#9679; Bar</a>
 <a class="SubMenuLink" [routerLink]="['/chart/doughnut']" (click)="mobileMenuActive = false">&#9679;
 Doughnut</a>
 <a class="SubMenuLink" [routerLink]="['/chart/line']" (click)="mobileMenuActive = false">&#9679; Line</a>
 <a class="SubMenuLink" [routerLink]="['/chart/polararea']" (click)="mobileMenuActive = false">&#9679;
 PolarArea</a>
 <a class="SubMenuLink" [routerLink]="['/chart/pie']" (click)="mobileMenuActive = false">&#9679; Pie</a>
 <a class="SubMenuLink" [routerLink]="['/chart/radar']" (click)="mobileMenuActive = false">&#9679; Radar</a>
 </div>
 * */
