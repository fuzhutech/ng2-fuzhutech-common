import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FzSharedModule} from '../ng2-fuzhutech-common';

import {FzNestNavDemoRoutingModule} from './nest-nav-demo-routing.module';
import {
    NestNavDemoComponent,
    FoggyTabContentComponent,
    SunnyTabContentComponent,
    RainyTabContentComponent
} from './nest-nav-demo.component';

@NgModule({
    imports: [
        CommonModule, FormsModule,
        FzSharedModule,
        FzNestNavDemoRoutingModule
    ],
    declarations: [NestNavDemoComponent, FoggyTabContentComponent, SunnyTabContentComponent, RainyTabContentComponent],
    providers: []
})
export class FzNestNavDemoModule {
}

