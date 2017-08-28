import {Component, OnInit, Input, Output, EventEmitter, QueryList, ContentChildren, ViewChildren} from '@angular/core';
import {Router, ActivatedRoute, Routes} from '@angular/router';
import {FzMenuItemComponent, MenuSideItem, PADDING_BASE} from './menu-side-item.component';

@Component({
    selector: 'fz-menuside',
    templateUrl: './menuside.component.html',
    styleUrls: ['./menuside.component.css']
})
export class MenuSideComponent implements MenuItem {

    _width = 120;

    @Input() menuDataCol: MainLinkData[]; //数组

    @Input() menuData: MenuSideItem[]; //数组

    //@ContentChildren(FzMenuItemComponent) menuItems: QueryList<FzMenuItemComponent>;
    @ViewChildren(FzMenuItemComponent) menuItems;

    @Output() onRouterLinkClick: EventEmitter<any> = new EventEmitter();

    constructor(private router: Router, private route: ActivatedRoute) {
        this.menuData = [
            {
                path: '/test',
                title: '测试菜单'
            },
            {
                title: '系统管理',
                children: [
                    {
                        path: 'sub-page',
                        title: '子页面示例'
                    },
                    {
                        path: 'sub-page1',
                        title: '子页面示例1'
                    },
                    {
                        path: 'sub-page2',
                        title: '子页面示例2'
                    },
                    {
                        title: '故障登记',
                        children: [
                            {path: 'test2', title: '测试菜单2'},
                            {path: 'test3', title: '测试菜单3'}
                        ]
                    }
                ]
            }
        ];
    }

    setWidth(value) {
        if (this._width != value) {
            this._width = value;
        }
        console.log(value);
    }

    subRouterLinkClick(event: Event, item: MenuSideItem) {
        console.log('subRouterLinkClick....2.......', item);
        this.onRouterLinkClick.next({originalEvent: event, item: item});
    }

}

export interface MenuItem {
    menuItems: any;

    subRouterLinkClick(event: Event, item: MenuSideItem): void;

    //command?: (event?: any) => void;
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

