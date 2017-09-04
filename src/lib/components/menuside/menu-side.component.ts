import {Component, OnInit, Input, Output, EventEmitter, QueryList, ContentChildren, ViewChildren} from '@angular/core';
import {Router, ActivatedRoute, Routes} from '@angular/router';
import {FzMenuItemComponent, MenuSideItem, PADDING_BASE, WIDTH_BASE} from './menu-side-item.component';

@Component({
    selector: 'fz-menu-side',
    templateUrl: './menu-side.component.html',
    styleUrls: ['./menu-side.component.css']
})
export class MenuSideComponent implements MenuItem {

    _width = WIDTH_BASE;

    @Input() menuData: MenuSideItem[]; //数组

    //@ContentChildren(FzMenuItemComponent) menuItems: QueryList<FzMenuItemComponent>;
    @ViewChildren(FzMenuItemComponent) menuItems;

    @Output() onRouterLinkClick: EventEmitter<any> = new EventEmitter();

    constructor(private router: Router, private route: ActivatedRoute) {
        //
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

