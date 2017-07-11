import {Component, Inject} from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {Observable} from 'rxjs/Rx';
import {Response} from '@angular/http';
import {DialogResult} from '../index';
import {ResponseResult} from '../model/response-result-model';
import {BaseDialog} from '../common/sub-page-component';

@Component({
    moduleId: module.id,
    selector: 'fz-confirm-dialog',
    templateUrl: 'confirm-dialog.component.html',
    styleUrls: ['confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements BaseDialog {

    record: any;
    dialogHeader: string;
    action: any;
    service: any;

    messages: string[] = ['角色管理记录', 'ID:[2]', '名称:[测试1]'];
    actionsAlignment = 'end';
    progress = false;

    confirmProcess: ConfirmProcess;

    constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>, @Inject(MD_DIALOG_DATA) public data: any) {
        //
    }

    //按钮-确认
    confirm() {
        this.progress = true;
        const observable: Observable<any> = this.confirmProcess.doProgress();

        observable.subscribe(
            data => {
                const dialogResult: DialogResult = {'success': true, 'recordId': data.data};
                this.dialogRef.close(dialogResult);
                this.progress = false;
            },
            err => {
                console.log('出错');
                console.log(err);
                this.progress = false;
            },
            () => console.log('confirm Complete')
        );
        //this.record = null;
    }

    cancel() {
        this.dialogRef.close(false);
    }

}

export interface ConfirmProcess {
    doProgress(): Observable<ResponseResult>;
    doConfirm(record): Observable<ResponseResult>;
}
