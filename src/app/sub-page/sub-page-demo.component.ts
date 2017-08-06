import {Component} from '@angular/core';
import {MdDialog} from '@angular/material';
import {SubPageComponentWithComponentDialog} from '../ng2-fuzhutech-common';

import {SomeDemoModel} from './model/some-demo.model';
import {SomeDemoService} from './service/some-demo.service';
import {DialogDemoComponent} from './dialog/dialog-demo.component';
import {Todo} from '../../lib/core/service/base-service';
import {Observable} from 'rxjs/Observable';

@Component({
    templateUrl: './sub-page-demo.component.html',
    styleUrls: ['./sub-page-demo.component.css']
})
export class SubPageDemoComponent extends SubPageComponentWithComponentDialog<SomeDemoModel, SomeDemoService, DialogDemoComponent> {

    constructor(service: SomeDemoService, dialog: MdDialog) {
        super(service, '子页面示例', dialog, DialogDemoComponent);

        this.records$ = service.records;
    }

    newInstance(): SomeDemoModel {
        return new SomeDemoModel();
    };
}
