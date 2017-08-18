import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {DataTableModule, PickListModule} from 'primeng/primeng';

import {
    MdButtonModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdSelectModule,
    MdTabsModule
} from '@angular/material';

import {FzToolbarModule, FzTabRouterOutletModule} from '../ng2-fuzhutech-common';

import {NestNavDemoComponent, FoggyTabContent, SunnyTabContent, RainyTabContent} from './nest-nav-demo.component';
import {FzNestNavDemoRoutingModule} from './nest-nav-demo-routing.module';

@NgModule({
    imports: [
        CommonModule, FormsModule, HttpModule,
        //InMemoryWebApiModule.forRoot(SomeDemoDataService),
        DataTableModule, PickListModule,
        MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdSelectModule, MdTabsModule,
        FzToolbarModule, FzTabRouterOutletModule,
        FzNestNavDemoRoutingModule
    ],
    exports: [NestNavDemoComponent, FoggyTabContent, SunnyTabContent, RainyTabContent],
    declarations: [NestNavDemoComponent, FoggyTabContent, SunnyTabContent, RainyTabContent],
    providers: [],
    entryComponents: [],
})
export class FzSubPageDemoModule {
}
