import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SubPageDemoComponent} from './sub-page-demo.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: SubPageDemoComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FzSubPageDemoRoutingModule {
}
