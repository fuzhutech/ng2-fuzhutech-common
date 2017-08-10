import {Component, Inject, Input, OnInit} from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {FileUploader, FileItem} from 'ng2-file-upload';

@Component({
    templateUrl: './upload-dialog.component.html',
    styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit {

    color = 'primary';
    actionsAlignment = 'end';
    uploader: FileUploader;

    public url;

    constructor(public dialogRef: MdDialogRef<UploadDialogComponent>, @Inject(MD_DIALOG_DATA) public data: any) {
        //
    }

    ngOnInit(): void {
        this.uploader = new FileUploader({url: this.url, authToken: ''});
    }

    //按钮-确认
    handleConfirm() {
        /*this.progress = true;
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
        );*/
        //this.record = null;
    }

    handleCancel() {
        this.dialogRef.close(false);
    }

    onChooseClick(event, fileInput) {
        fileInput.value = null;
        fileInput.click();
    }

    selectedFileOnChanged(event) {
        const fileItem: FileItem = this.uploader.queue[0];
        fileItem.alias = 'excel';
        console.log(fileItem);
    }

}
