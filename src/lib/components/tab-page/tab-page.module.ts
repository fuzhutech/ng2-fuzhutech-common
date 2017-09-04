import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MdDialogModule, MdSidenavModule, MdTabsModule} from '@angular/material';
import {ContextMenuModule} from 'primeng/primeng';
import {TabPageComponent} from './tab-page.component';
import {FzMenuSideModule} from '../menu-side/menu-side.module';
import {FzTabRouterOutletModule} from '../../directives/tab-router-outlet/tab-router-outlet.module';

@NgModule({
    imports: [
        CommonModule, FormsModule,
        MdDialogModule, MdSidenavModule, MdTabsModule,
        ContextMenuModule, FzMenuSideModule,
        FzTabRouterOutletModule,
    ],
    declarations: [TabPageComponent],
    exports: [
        TabPageComponent
    ]
})
export class FzTabPageModule {
}
