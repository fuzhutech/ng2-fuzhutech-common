import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
    MdToolbarModule,
    MdButtonModule,
    MdDialogModule,
    MdIconModule,
    MdMenuModule,
    MdSidenavModule
} from '@angular/material';

import {
    ConfirmDialogComponent,
    FzConfirmDialogModule,
    FzErrorModule,
    FzFooterModule,
    FzUploadDialogModule,
    AuthInfoModule
} from './ng2-fuzhutech-common';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule, BrowserAnimationsModule,
        MdToolbarModule, MdButtonModule, MdDialogModule, MdIconModule, MdMenuModule, MdSidenavModule,
        AppRoutingModule, FzErrorModule, FzFooterModule, FzConfirmDialogModule, FzUploadDialogModule,
        AuthInfoModule
    ],
    providers: [],
    entryComponents: [ConfirmDialogComponent],
    bootstrap: [AppComponent]
})
export class FzAppModule {
    //angular2全局依赖注入
    //有些服务在整个应用中都要保持唯一实例（singleton），比如用户登录信息。一种最好的方式是在bootstrap时就实例化这个服务
    //bootstrap(myApp,[MyService]).catch(err=>console.error(err));
}
