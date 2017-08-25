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
    Host, HostBinding, QueryList, ContentChildren, ViewChild, ViewChildren
} from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

export const PADDING_BASE = 24;

@Component({
    selector: 'fz-menu-item',
    template: `
        <ng-template [ngIf]="item">
            <span class="menu-side-item-title" 
                  [class.menu-side-item-title-active]="_active"
                  (click)="clickHeader($event)">
                  <span *ngIf="item.path" class="menu-side-item-title-text" [style.padding-left.px]="paddingLeft">
                      <!--a-- routerLink="path">{{item.title}}</a-->
                      {{item.title}}
                  </span>
                  <span *ngIf="!item.path" class="menu-side-item-title-text" [style.padding-left.px]="paddingLeft">
                       {{item.title}}
                  </span>
            </span>
            
            <div class="ant-collapse-content" [@collapseState]="_active?'active':'inactive'">
                <div style="width:100%;background-color: #673ab7;height: 2px;transition: .5s cubic-bezier(.35,0,.25,1);"></div>
                <div class="ant-collapse-content-box">
                    <fz-menu-item *ngFor="let subItem of item.children" [item]="subItem" [level]="level+1" [parent]="this"></fz-menu-item>
                    <ng-content></ng-content>
                </div>
            </div>
        </ng-template>`,
    styleUrls: ['./menuside.component.css'],
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
    disable = false;

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
    }

}

export interface MenuSideItem {
    title: string;
    path?: string;
    children?: MenuSideItem[];
}
