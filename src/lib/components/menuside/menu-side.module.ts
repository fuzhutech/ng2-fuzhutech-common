import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuSideComponent} from './menu-side.component';
import {ButtonModule} from 'primeng/primeng';
import {SplitButtonModule} from 'primeng/primeng';
import {BreadcrumbModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';

import {MdIconModule} from '@angular/material';

import {FzMenuItemComponent} from './menu-side-item.component';


@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        SplitButtonModule,
        TabViewModule,
        BreadcrumbModule,
        MdIconModule
    ],
    declarations: [
        MenuSideComponent, FzMenuItemComponent
    ],
    exports: [
        MenuSideComponent, FzMenuItemComponent
    ]

})
export class FzMenuSideModule {
}

export * from './menu-side.component';
export * from './menu-side-item.component';
