import {Component, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';

import {DialogResult, SubPageComponentWithComponentDialog} from '../ng2-fuzhutech-common';

import {SomeDemoModel} from './model/some-demo.model';
import {SomeDemoService} from './service/some-demo.service';
import {DialogDemoComponent} from './dialog/dialog-demo.component';

@Component({
    templateUrl: './sub-page-demo.component.html',
    styleUrls: ['./sub-page-demo.component.css']
})
export class SubPageDemoComponent extends SubPageComponentWithComponentDialog<SomeDemoModel, SomeDemoService, DialogDemoComponent> {

    //用户状态
    statuses = [{label: '正常', value: '0'}, {label: '非正常', value: '1'}];

    constructor(service: SomeDemoService, dialog: MdDialog, @Inject(DOCUMENT) doc: any) {
        super(service, '用户', dialog, DialogDemoComponent);
    }

    newInstance(): SomeDemoModel {
        return new SomeDemoModel();
    };

    getStatus(value) {
        let label = null;
        for (const status of this.statuses) {
            if (status.value == value) {
                label = status.label;
                break;
            }
        }

        return label;
    }

}
