import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorService} from './error.service';

@NgModule({
    imports: [CommonModule],
    exports: [],
    declarations: [],
    providers: [ErrorService]
})
export class FzErrorModule {

}

export * from './error.model';
export * from './error.service';
