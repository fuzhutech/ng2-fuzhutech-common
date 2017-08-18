import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {TabRouterOutletService} from './tab-router-outlet.service';
import {FzRouterOutletDirective} from './router_outlet';
import {FzMainRouterOutLetDirective} from './main_router_outlet';
import {FzTabRouterOutletDirective} from './tab-router-outlet';

import {FormsModule} from '@angular/forms';


@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [FzRouterOutletDirective, FzTabRouterOutletDirective, FzMainRouterOutLetDirective],
    declarations: [FzRouterOutletDirective, FzTabRouterOutletDirective, FzMainRouterOutLetDirective],
    providers: [TabRouterOutletService]
})
export class FzTabRouterOutletModule {
}

export * from './tab-router-outlet.service';
