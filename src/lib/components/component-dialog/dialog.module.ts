import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdSelectModule} from '@angular/material';
import {DialogComponent} from './dialog.component';

@NgModule({
    imports: [
        CommonModule, FormsModule, HttpModule,
        MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdSelectModule,
    ],
    exports: [
        DialogComponent
    ],
    declarations: [
        DialogComponent
    ],
    providers: [],
    entryComponents: [],
})
export class FzDialogModule {
}
