import {NgModule/*, ModuleWithProviders*/} from '@angular/core';

import {FzConfirmDialogModule} from './components/confirm-dialog/index';
import {FzFooterModule} from './components/footer/index';
import {FzMenuSideModule} from './components/menuside/index';
import {FzTabRouterOutletModule} from './directives/tab-router-outlet/index';
import {FzToolbarModule} from './components/toolbar/index';
import {FzUploadDialogModule} from './components/upload-dialog/index';

const COMMON_MODULES = [
    FzConfirmDialogModule,
    FzFooterModule,
    FzMenuSideModule,
    FzTabRouterOutletModule,
    FzToolbarModule,
    FzUploadDialogModule
];

@NgModule({
    imports: COMMON_MODULES,
    exports: COMMON_MODULES,
})
export class FzCommonModule {
    //
}
