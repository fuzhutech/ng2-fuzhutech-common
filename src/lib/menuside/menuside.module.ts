import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuSideComponent} from './menuside.component';
import {ButtonModule} from 'primeng/primeng';
import {SplitButtonModule} from 'primeng/primeng';
import {BreadcrumbModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        SplitButtonModule,
        TabViewModule,
        BreadcrumbModule
    ],
    declarations: [
        MenuSideComponent
    ],
    exports: [
        MenuSideComponent
    ]

})
export class FzMenuSideModule {
}

export * from './menuside.component';
