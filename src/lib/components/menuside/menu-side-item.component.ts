/**
 * Created by fuzhutech on 2017/8/24.
 *
 * @license
 * Copyright www.fuzhutech.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.fuzhutech.com/license
 */

import {
    Component,
    Input,
    ElementRef,
    Host, HostBinding, QueryList, ContentChildren, ViewChild, ViewChildren, EventEmitter, Output
} from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

export const PADDING_BASE = 24;
export const WIDTH_BASE = 140;

@Component({
    selector: 'fz-menu-item',
    template: `
        <ng-template [ngIf]="item">
            <span class="menu-side-item-title" 
                  [class.menu-side-item-title-active]="_active && !item.children"
                  (click)="clickHeader($event)">
                  <span *ngIf="item.path" class="menu-side-item-title-text">
                      <a [routerLink]="item.path" [style.padding-left.px]="paddingLeft" (click)="routerLinkClick($event,item)">
                         {{item.title}}
                         <md-icon class="menu-side-item-title-icon" *ngIf="!_active && item.children">expand_more</md-icon>
                         <md-icon class="menu-side-item-title-icon" *ngIf="_active && item.children">expand_less</md-icon>
                      </a>
                  </span>
                  <span *ngIf="!item.path" class="menu-side-item-title-text" [style.padding-left.px]="paddingLeft">
                       {{item.title}}
                       <md-icon class="menu-side-item-title-icon" *ngIf="!_active && item.children">expand_more</md-icon>
                       <md-icon class="menu-side-item-title-icon" *ngIf="_active && item.children">expand_less</md-icon>
                  </span>
            </span>
            
            <div class="ant-collapse-content" [@collapseState]="_active?'active':'inactive'">
                <!--div style="width:100%;background-color: #673ab7;height: 2px;transition: .5s cubic-bezier(.35,0,.25,1);"></div-->
                <div class="ant-collapse-content-box">
                    <fz-menu-item *ngFor="let subItem of item.children" [item]="subItem" [level]="level+1" [parent]="this"></fz-menu-item>
                    <ng-content></ng-content>
                </div>
            </div>
        </ng-template>`,
    styleUrls: ['./menu-side.component.css'],
    animations: [
        trigger('collapseState', [
            state('inactive', style({
                opacity: '0',
                height: 0
            })),
            state('active', style({
                opacity: '1',
                height: '*'
            })),
            transition('inactive => active', animate('150ms ease-in')),
            transition('active => inactive', animate('150ms ease-out'))
        ])
    ]
})

export class FzMenuItemComponent {

    _active: boolean;

    @Input()
    level = 0;

    @Input()
    item: MenuSideItem;

    @Input()
    parent: any;

    @ViewChildren(FzMenuItemComponent) menuItems;

    get paddingLeft() {
        return (this.level + 1) * PADDING_BASE;
        //return this.level * PADDING_BASE;
    }

    clickHeader($event) {
        this._active = !this._active;

        if (this._active && this.parent.menuItems) {
            this.parent.menuItems.filter(x => x !== this).forEach(menu => menu._active = false);
        }

        const level = this.expandDown(this, this.level);

        this.parent.setWidth(WIDTH_BASE + level * 30)
    }

    expandDown(menuItem: any, level: number): number {
        let i = level;

        if ((menuItem.level - level) > 0) {
            i = menuItem.level;
        }

        if (menuItem._active && menuItem.menuItems) {
            for (const entry of menuItem.menuItems.toArray()) {
                i = this.expandDown(entry, i);
            }
        }

        return i;
    }

    setWidth(value) {
        this.parent.setWidth(value);
    }

    routerLinkClick(event: Event, item: MenuSideItem) {
        this.parent.subRouterLinkClick(event, item);
    }

    subRouterLinkClick(event: Event, item: MenuSideItem) {
        this.parent.subRouterLinkClick(event, item);
    }

}

export interface MenuSideItem {
    title: string;
    path?: string;
    children?: MenuSideItem[];
}
