import {Component, OnInit, OnDestroy} from '@angular/core';
import {MdDialog} from '@angular/material';
import {SubPageComponentWithComponentDialog} from '../ng2-fuzhutech-common';

import {SomeDemoModel} from './model/some-demo.model';
import {SomeDemoService} from './service/some-demo.service';
import {DialogDemoComponent} from './dialog/dialog-demo.component';

@Component({
    templateUrl: './sub-page-demo.component.html',
    styleUrls: ['./sub-page-demo.component.css']
})
export class SubPageDemoComponent
    extends SubPageComponentWithComponentDialog<SomeDemoModel, SomeDemoService, DialogDemoComponent> implements OnInit, OnDestroy {

    constructor(service: SomeDemoService, dialog: MdDialog) {
        super(service, '子页面示例', dialog, DialogDemoComponent);

        this.records$ = service.records$;
    }

    newInstance(): SomeDemoModel {
        return new SomeDemoModel();
    };

    ngOnInit(): void {
        console.log('SubPageDemoComponent ngOnInit....');
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        console.log('SubPageDemoComponent ngOnDestroy....');
        super.ngOnDestroy();
    }
}
