import {NgModule/*, ModuleWithProviders*/} from '@angular/core';

import {FzConfirmDialogModule} from './confirm-dialog/index';
import {FzFooterModule} from './footer/index';
import {FzMenuSideModule} from './menuside/index';
import {FzTabRouterOutletModule} from './tab-router-outlet/index';
import {FzToolbarModule} from './toolbar/index';

const SHARED_MODULES = [
    FzConfirmDialogModule,
    FzFooterModule,
    FzMenuSideModule,
    FzTabRouterOutletModule,
    FzToolbarModule
];

@NgModule({
    imports: SHARED_MODULES,
    exports: SHARED_MODULES,
})
export class FzSharedModule {
    //
}
