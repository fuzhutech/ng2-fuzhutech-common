import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NestNavDemoComponent} from './nest-nav-demo.component';


import {SunnyTabContent, RainyTabContent, FoggyTabContent} from './nest-nav-demo.component';

export const TABS_DEMO_ROUTES: Routes = [
    {path: '', redirectTo: 'sunny-tab', pathMatch: 'full'},
    {path: 'sunny-tab', component: SunnyTabContent},
    {path: 'rainy-tab', component: RainyTabContent},
    {path: 'foggy-tab', component: FoggyTabContent},
];

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: NestNavDemoComponent, children: TABS_DEMO_ROUTES},
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FzNestNavDemoRoutingModule {
}
