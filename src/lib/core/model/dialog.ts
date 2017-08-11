/**
 * Created by fuzhutech on 2017/8/11.
 *
 * @license
 * Copyright www.fuzhutech.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.fuzhutech.com/license
 */

import {Observable} from 'rxjs/Rx';
import {ResponseResult} from './response-result.model';

export interface BaseDialog {
    record: any;
    dialogHeader: string;
    action: any;
    service: any;
    confirmProcess: ConfirmProcess;
}

export interface ConfirmProcess {
    //doProgress(): Observable<ResponseResult>;
    doConfirm(record?: any): Observable<ResponseResult>;
}

export interface DialogResult {
    success: boolean;
    cancel?: boolean;
    recordId?: number;
}
