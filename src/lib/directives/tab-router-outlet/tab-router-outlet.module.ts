import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {TabRouterOutletService} from './tab-router-outlet.service';
import {TabGroupRouterOutLetDirective} from './router_outlet';
import {TabRouterOutletDirective} from './tab-router-outlet';
import {FzMainRouterOutLetDirective} from './main_router_outlet';
import {FormsModule} from '@angular/forms';


@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [TabGroupRouterOutLetDirective, TabRouterOutletDirective, FzMainRouterOutLetDirective],
    declarations: [TabGroupRouterOutLetDirective, TabRouterOutletDirective, FzMainRouterOutLetDirective],
    providers: [TabRouterOutletService]
})
export class FzTabRouterOutletModule {
}

export * from './tab-router-outlet.service';
