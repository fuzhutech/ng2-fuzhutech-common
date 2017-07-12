import {Component} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import {ComponentDialog} from '../../ng2-fuzhutech-common';
import {SomeDemoService} from '../service/some-demo.service';
import {SomeDemoModel} from '../model/some-demo.model';

@Component({
    templateUrl: './dialog-demo.component.html',
    styleUrls: ['./dialog-demo.component.css']
})
export class DialogDemoComponent extends ComponentDialog<DialogDemoComponent, SomeDemoModel, SomeDemoService> {

    color = 'primary';


    constructor(dialogRef: MdDialogRef<DialogDemoComponent>) {
        super(dialogRef);
    }

}
