import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthInfoService} from './auth-info.service';
import {AuthInfoConfig} from './auth-info.config';

@NgModule({
    imports: [CommonModule],
    exports: [],
    declarations: [],
    providers: [AuthInfoService]
})
export class AuthInfoModule {
    static forRoot(config: AuthInfoConfig): ModuleWithProviders {
        return {
            ngModule: AuthInfoModule,
            providers: [
                {provide: AuthInfoConfig, useValue: config}
            ]
        };
    }
}

export * from './auth-info.service';
export * from './auth-info.model';
export * from './auth-info.config';
