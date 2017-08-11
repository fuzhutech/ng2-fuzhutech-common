import {NgModule/*, ModuleWithProviders*/} from '@angular/core';

import {FzConfirmDialogModule} from './components/confirm-dialog/index';
import {FzFooterModule} from './components/footer/index';
import {FzMenuSideModule} from './components/menuside/index';
import {FzTabRouterOutletModule} from './directives/tab-router-outlet/index';
import {FzToolbarModule} from './components/toolbar/index';

const COMMON_MODULES = [
    FzConfirmDialogModule,
    FzFooterModule,
    FzMenuSideModule,
    FzTabRouterOutletModule,
    FzToolbarModule
];

@NgModule({
    imports: COMMON_MODULES,
    exports: COMMON_MODULES,
})
export class FzCommonModule {
    //
}
