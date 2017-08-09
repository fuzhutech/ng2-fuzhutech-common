import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {DataTableModule, PickListModule} from 'primeng/primeng';

import {MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdSelectModule} from '@angular/material';

import {FzToolbarModule} from '../ng2-fuzhutech-common';

import {FzSubPageDemoRoutingModule} from './sub-page-demo-routing.module';
import {SomeDemoService} from './service/some-demo.service';
import {SubPageDemoComponent} from './sub-page-demo.component';
import {DialogDemoComponent} from './dialog/dialog-demo.component';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {SomeDemoDataService, SomeDemoDataOverrideService} from './service/some-demo-data.service';

@NgModule({
    imports: [
        CommonModule, FormsModule, HttpModule,
        InMemoryWebApiModule.forRoot(SomeDemoDataOverrideService, {put204: false}),
        //InMemoryWebApiModule.forRoot(SomeDemoDataService),
        DataTableModule, PickListModule,
        MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdSelectModule,
        FzToolbarModule,
        FzSubPageDemoRoutingModule
    ],
    exports: [
        SubPageDemoComponent
    ],
    declarations: [
        SubPageDemoComponent, DialogDemoComponent
    ],
    providers: [SomeDemoService],
    entryComponents: [DialogDemoComponent],
})
export class FzSubPageDemoModule {
}
