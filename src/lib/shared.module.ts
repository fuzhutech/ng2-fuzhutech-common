import {NgModule/*, ModuleWithProviders*/} from '@angular/core';

import {FzConfirmDialogModule} from './components/confirm-dialog/index';
import {FzFooterModule} from './components/footer/index';
import {FzMenuSideModule} from './components/menuside/index';
import {FzTabRouterOutletModule} from './directives/tab-router-outlet/index';
import {FzToolbarModule} from './components/toolbar/index';
import {FzTabPageModule} from './components/main-page/tab-page.module';

const SHARED_MODULES = [
    FzConfirmDialogModule,
    FzFooterModule,
    FzMenuSideModule,
    FzTabRouterOutletModule,
    FzToolbarModule,
    FzTabPageModule
];

@NgModule({
    imports: SHARED_MODULES,
    exports: SHARED_MODULES,
})
export class FzSharedModule {
    //
}
