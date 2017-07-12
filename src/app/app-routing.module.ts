import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', component: HomeComponent},
            {path: 'tab-page', loadChildren: './tab-page/tab-page-demo.module#FzTabPageDemoModule'}
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

