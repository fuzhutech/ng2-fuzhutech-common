import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FzSharedModule} from '../ng2-fuzhutech-common';

import {FzTabPageDemoRoutingModule} from './tab-page-demo-routing.module';
import {TabPageDemoComponent} from './tab-page-demo.component';

@NgModule({
    imports: [
        CommonModule, FormsModule,
        FzSharedModule,
        FzTabPageDemoRoutingModule
    ],
    declarations: [TabPageDemoComponent],
    providers: []
})
export class FzTabPageDemoModule {
}
