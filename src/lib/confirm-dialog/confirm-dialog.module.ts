import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdButtonModule, MdDialogModule, MdCardModule} from '@angular/material';
import {ConfirmDialogComponent} from './confirm-dialog.component';

@NgModule({
    imports: [CommonModule,
        MdButtonModule, MdDialogModule, MdCardModule],
    declarations: [ConfirmDialogComponent],
    exports: [ConfirmDialogComponent],
    entryComponents: [ConfirmDialogComponent]
})
export class FzConfirmDialogModule {
}

export * from './confirm-dialog.component';
