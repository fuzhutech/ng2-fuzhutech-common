import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    FoggyTabContentComponent, NestNavDemoComponent, RainyTabContentComponent,
    SunnyTabContentComponent
} from './nest-nav-demo.component';
import {MenuSideItem} from '../ng2-fuzhutech-common';

export const TABS_DEMO_ROUTES: Routes = [
    {path: '', redirectTo: 'sunny-tab', pathMatch: 'full'},
    {path: 'sunny-tab', component: SunnyTabContentComponent},
    {path: 'rainy-tab', component: RainyTabContentComponent},
    {path: 'foggy-tab', component: FoggyTabContentComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: NestNavDemoComponent, children: TABS_DEMO_ROUTES}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FzNestNavDemoRoutingModule {
}

export const ConfigMenuData: MenuSideItem[] = [
    {
        path: 'sunny-tab',
        title: 'sunny-tab'
    },
    {
        path: 'rainy-tab',
        title: 'rainy-tab'
    },
    {
        path: 'foggy-tab',
        title: 'foggy-tab'
    }
];
