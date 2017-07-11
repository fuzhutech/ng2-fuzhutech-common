import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {TabRouterOutletService} from './tab-router-outlet.service';
import {TabGroupRouterOutLetDirective, TabRouterOutletDirective} from './tab-router-outlet';
import {FormsModule} from '@angular/forms';


@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [TabGroupRouterOutLetDirective, TabRouterOutletDirective],
    declarations: [TabGroupRouterOutLetDirective, TabRouterOutletDirective],
    providers: [TabRouterOutletService]
})
export class FzTabRouterOutletModule {
}

export * from './tab-router-outlet.service';
