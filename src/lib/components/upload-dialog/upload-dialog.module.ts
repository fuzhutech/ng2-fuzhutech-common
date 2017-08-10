import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms'
import {MdButtonModule, MdDialogModule, MdCardModule, MdProgressBarModule, MdToolbarModule} from '@angular/material';

import {FileUploadModule} from 'ng2-file-upload';

import {UploadDialogComponent} from './upload-dialog.component';

@NgModule({
    imports: [
        CommonModule, FormsModule,
        MdButtonModule, MdDialogModule, MdCardModule, MdProgressBarModule, MdToolbarModule,
        FileUploadModule
    ],
    declarations: [UploadDialogComponent],
    exports: [UploadDialogComponent],
    entryComponents: [UploadDialogComponent]
})
export class FzUploadDialogModule {
}

export * from './upload-dialog.component';
