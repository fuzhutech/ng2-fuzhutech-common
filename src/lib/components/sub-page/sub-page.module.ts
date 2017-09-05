import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {DataTableModule, PickListModule} from 'primeng/primeng';

import {MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdSelectModule} from '@angular/material';
import {FzToolbarModule} from '../toolbar/toolbar.module';
import {FzSubPageComponent} from './sub-page.component';

@NgModule({
    imports: [
        CommonModule, FormsModule, HttpModule,
        DataTableModule, PickListModule,
        MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdSelectModule,
        FzToolbarModule
    ],
    exports: [
        FzSubPageComponent
    ],
    declarations: [
        FzSubPageComponent
    ],
    providers: [],
    entryComponents: [],
})
export class FzSubPageModule {
}
