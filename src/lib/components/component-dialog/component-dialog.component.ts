/**
 * Created by fuzhutech on 2017/8/11.
 *
 * @license
 * Copyright www.fuzhutech.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.fuzhutech.com/license
 */

import {MdDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Rx';

import {BaseService} from '../../core/service/base-service';
import {BaseDialog, ConfirmProcess, DialogResult} from '../../core/model/dialog';
import {ResponseResult} from '../../core/model/response-result.model';
import {ActionType} from '../../core/model/sub-page';


export class ComponentDialog<D, R, S extends BaseService> implements BaseDialog {
    progress = false;
    dialogHeader: string;  //编辑页面标题

    action: ActionType;
    service: S;

    dialogRef: MdDialogRef<D>;
    record: R;        //临时变量

    confirmProcess: ConfirmProcess;

    constructor(_dialogRef: MdDialogRef<D>) {
        this.dialogRef = _dialogRef;
    }

    //按钮-确认
    handleConfirm() {
        this.progress = true;
        const observable: Observable<any> = this.confirmProcess.doConfirm(this.record);
        if (observable == null) {
            return;
        }

        observable.subscribe(
            (responseResult: ResponseResult) => {

                if (responseResult.status == -1) {
                    return;
                }

                const dialogResult: DialogResult = {'success': true, 'recordId': responseResult.data.id};
                this.dialogRef.close(dialogResult);
                this.progress = false;
            },
            err => {
                console.log('出错', err);
                this.progress = false;
            }
        );
    }

    //按钮-取消
    handleCancel() {
        const dialogResult: DialogResult = {'success': false, 'cancel': false};
        this.dialogRef.close(dialogResult);
    }

}
