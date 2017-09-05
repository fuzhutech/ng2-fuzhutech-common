import {Component, Input} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'fz-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

    color = 'primary';

    @Input() dialogHeader: string;  //编辑页面标题

    @Input() hostComponent: any;

    //record: any;

    actionsAlignment = 'end';
    progress = false;

    handleConfirm() {
        this.hostComponent.handleConfirm();
    }

    handleCancel() {
        this.hostComponent.handleCancel();
    }

}
