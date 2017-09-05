import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ElementRef,
} from '@angular/core';
import {AuthInfo, MenuInfo} from '../../core/auth-info/auth-info.model';

@Component({
    selector: 'fz-sub-page',
    templateUrl: './sub-page.component.html',
    styleUrls: ['./sub-page.component.css']
})
export class FzSubPageComponent implements OnInit {

    @Input() subPageComponent: SubPage;

    /*http服务*/
    service: any;

    @ViewChild('globalFilter') globalFilter: ElementRef;

    ngOnInit(): void {
        this.service = this.subPageComponent.service;
    }

    handleView() {
        this.subPageComponent.handleView();
    }

    handleAdd() {
        this.subPageComponent.handleAdd();
    };

    handleEdit() {
        this.subPageComponent.handleEdit();
    };

    handleDelete() {
        this.subPageComponent.handleDelete();
    };

    handleRefresh() {
        this.subPageComponent.handleRefresh();
    };

    handleImport() {
        this.subPageComponent.handleImport();
    };

    handleExport() {
        this.subPageComponent.handleExport();
    };
}

export interface SubPage {
    selectedRecord: any;
    service: any;
    handleView: Function;
    handleAdd: Function;
    handleEdit: Function;
    handleDelete: Function;
    handleRefresh: Function;
    handleImport: Function;
    handleExport: Function;

    currentMenuId: number;
    currentMenuInfo: MenuInfo;
    currentAuthInfo: AuthInfo;
}
