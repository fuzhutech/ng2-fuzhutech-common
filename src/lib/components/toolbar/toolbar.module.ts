import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from './toolbar.component';

import {MdToolbarModule, MdButtonModule, MdIconModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MdToolbarModule, MdButtonModule, MdIconModule
    ],
    declarations: [
        ToolbarComponent
    ],
    exports: [
        ToolbarComponent
    ]

})
export class FzToolbarModule {
}
