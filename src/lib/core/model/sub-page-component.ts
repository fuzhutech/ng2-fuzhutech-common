import {Component, Inject, TemplateRef, ViewChild, Input, OnInit, OnDestroy} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {TreeNode} from 'primeng/primeng';
import {Http, Headers, URLSearchParams, Request, Response} from '@angular/http';
import {Observable, Subscription} from 'rxjs/Rx';

import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA, ComponentType} from '@angular/material';
import {ConfirmDialogComponent, UploadDialogComponent} from '../../index';
import {isUndefined} from 'util';

import {BaseService, DialogResult, ConfirmProcess, ResponseResult} from '../../index';
import {AuthInfo, AuthInfoService, MenuInfo} from '../auth-info';
import {ServiceUtil} from '../../utils';

export const enum ActionType {
    viewAction = 0,
    newAction = 1,
    editAction = 2,
    deleteAction = 3,
    refreshAction = 4,
    lookupAction = 5,
    exportAction = 6,
    importAction = 7
}

export interface BaseObject {
    id?: any;
}

/**
 * 仅具有“刷新”展示功能，不具备“增删改”功能
 */
export class SubPageComponent<R extends BaseObject, S extends BaseService> implements OnInit, OnDestroy {

    /*普通表格展示相关变量*/
    record: R;             //临时变量
    selectedRecord: R;    //选中记录
    selectedRecord$: Observable<R>;    //选中记录
    records: R[];          //数据列表
    records$: Observable<R[]>; //数据列表可观察对象, 所有可观察对象变量均以$结尾表示

    /*http服务*/
    service: S;

    //树形表格所需属性
    useTreeTable = false;
    treeTableService: TreeTableService = new TreeTableService();

    /*编辑框相关变量*/
    action: ActionType;    //操作类型
    mainHeader: string;

    /*权限控制相关变量*/
    currentMenuId: number;
    currentMenuInfo: MenuInfo;
    menuInfoSubscription: Subscription;
    currentAuthInfo: AuthInfo;
    authInfoSubscription: Subscription;
    authInfoService: AuthInfoService;

    /**
     * 构造方法
     * @param service
     * @param mainHeader
     */
    constructor(service: S, mainHeader: string) {
        this.service = service;
        this.mainHeader = mainHeader;
        this.authInfoService = ServiceUtil.getAuthInfoService();
    }

    /**
     * 注意继承覆盖时需要调用父类方法
     */
    ngOnInit(): void {
        //获取菜单信息
        this.menuInfoSubscription = this.authInfoService.menuInfoSubject
            .subscribe(
                data => this.setMenuInfo(data),
                error => console.error(error)
            );

        //获取权限--考虑开始未登录-->登录动作-->已登录
        this.authInfoSubscription = this.authInfoService.authInfoSubject
        //.merge(this.userRegisterService.currentUser)
            .subscribe(
                data => this.setAuthInfo(data),
                error => console.error(error)
            );
    }

    /**
     * 注意继承覆盖时需要调用父类方法
     */
    ngOnDestroy(): void {
        if (this.authInfoSubscription !== undefined) {
            this.authInfoSubscription.unsubscribe();
        }

        if (this.menuInfoSubscription !== undefined) {
            this.menuInfoSubscription.unsubscribe();
        }
    }

    /**
     * “刷新”按钮响应处理
     * @param event
     */
    handleRefresh() {
        this.action = ActionType.refreshAction;
        if (this.canDoRefresh()) {
            this.doRefresh(null);
        }
    }

    /**
     * 是否具备执行刷新动作的条件
     * @returns {boolean}
     */
    protected canDoRefresh(): boolean {
        return true;
    }

    /**
     * 执行刷新动作
     * @param id
     */
    doRefresh(id: number) {
        this.service.getList().subscribe(
            data => {
                this.records = data;

                for (const record of this.records) {
                    if (record.id == id) {
                        this.selectedRecord = record;
                        break;
                    }
                }

                //若为树表展示
                if (this.useTreeTable) {
                    this.treeTableService.records = this.records;
                    //this.treeTableService.records = Object.assign([], this.records);
                    //Object.assign(this.treeTableService.records, this.records);
                    //this.treeTableService.records = [...this.records];
                    this.treeTableService.refreshTreeNode(id);
                }
            }
        );
    }

    /**
     * 设置选中记录
     * @param {number} id
     */
    protected setSelectedRecord(id: number) {
        for (const record of this.records) {
            if (record.id === id) {
                this.selectedRecord = record;
                break;
            }
        }

        //若为树表展示
        if (this.useTreeTable) {
            for (const node of this.treeTableService.nodes) {
                if (node.id === id) {
                    this.treeTableService.selectedNode = node;
                    break;
                }
            }
        }
    }

    /**
     * 复制当前选中数据记录
     * @returns {{}&U}
     */
    protected getCloneRecord(): R {
        let data;
        if (this.useTreeTable && this.treeTableService.selectedNode) {
            data = this.treeTableService.selectedNode.data;
        } else {
            data = this.selectedRecord;
        }

        return Object.assign({}, data);
    }

    protected setAuthInfo(authInfo: AuthInfo) {
        this.currentAuthInfo = authInfo;
    }

    protected setMenuInfo(menuInfo: MenuInfo) {
        this.currentMenuInfo = menuInfo;
    }

}

export interface BaseTreeObject {
    id?: any;
    parentId?: any;
}

export class BaseTreeNode implements TreeNode {
    label?: string;
    data?: any;
    icon?: any;
    expandedIcon?: any;
    collapsedIcon?: any;
    children?: TreeNode[];
    leaf?: boolean;
    expanded?: boolean;
    type?: string;
    parent?: TreeNode;
    partialSelected?: boolean;

    id: number;
}

export class TreeTableService {

    selectedNode: BaseTreeNode;       //选中记录--树
    nodes: BaseTreeNode[];        //数据列表-树
    records: BaseTreeObject[];

    public refreshTreeNode(id: number) {
        //this.records = data.rows;
        this.nodes = [];
        //第一遍，只处理pid==null
        for (let record of this.records) {
            if (record.parentId == null) {
                const treeNode: BaseTreeNode = new BaseTreeNode();
                treeNode.data = record;
                treeNode.id = record.id;
                this.nodes.push(treeNode);
                //处理过则去除
                record = null;
            }
        }

        this.doSet(this.nodes);

        for (const node of this.nodes) {
            if (node.id == id) {
                this.selectedNode = node;
                break;
            }
        }
    }

    //第三遍
    //TreeNodes1 = TreeNodes3;  //上一遍的筛选记录
    private doSet(TreeNodes1: BaseTreeNode[]) {

        const TreeNodes3: BaseTreeNode[] = []; //这一遍筛选记录

        for (const treeNode1 of TreeNodes1) {
            //从records中查找该级别子节点
            for (let record of this.records) {
                if (record == null) {
                    continue;
                }

                if (record.parentId == treeNode1.id) {
                    if (treeNode1.children == null) {
                        treeNode1.children = [];
                    }

                    const treeNode: BaseTreeNode = new BaseTreeNode();
                    treeNode.data = record;
                    treeNode.id = record.id;
                    treeNode1.children.push(treeNode);
                    TreeNodes3.push(treeNode);

                    //处理过则去除
                    record = null;
                }
            }
        }

        if (TreeNodes3.length > 0) {
            this.doSet(TreeNodes3);
        }
    };
}

/**
 * 具有“增删改”功能
 */
export abstract class SubPageComponentWithDialog<R extends BaseObject, S extends BaseService>
    extends SubPageComponent<R, S> implements ConfirmProcess {

    dialog: MdDialog;
    dialogHeader: string;  //编辑页面标题

    //编辑对话框设置信息
    dialogConfig: MdDialogConfig = {
        disableClose: false,
        width: '',
        height: '',
        position: {
            top: '',
            bottom: '',
            left: '',
            right: ''
        },
        data: {
            message: 'Jazzy jazz jazz'
        }
    };

    //dialogRef: MdDialogRef<D>;
    componentOrTemplateRef: ComponentType<any> | TemplateRef<any>;

    constructor(service: S, mainHeader: string, dialog: MdDialog) {
        super(service, mainHeader);
        this.dialog = dialog;
    }

    /**
     * 抽象方法，获取操作实例.
     */
    abstract newInstance(): R;

    abstract oPenDialog(actionName: string): MdDialogRef<any>;

    /**
     * 是否具备执行“新增”动作的条件
     * @returns {boolean}
     */
    protected canDoAdd(): boolean {
        return true;
    }

    //删除
    protected canDoDelete(): boolean {
        if (this.useTreeTable) {
            return !isUndefined(this.treeTableService) && !isUndefined(this.treeTableService.selectedNode);
        } else {
            return !isUndefined(this.selectedRecord);
        }
    }

    /**
     * 是否具备执行“编辑”动作的条件
     * @returns {boolean}
     */
    protected canDoEdit(): boolean {
        if (this.useTreeTable) {
            return !isUndefined(this.treeTableService) && !isUndefined(this.treeTableService.selectedNode);
        } else {
            return !isUndefined(this.selectedRecord);
        }
    }

    /**
     * 是否具备执行“导出”动作的条件
     * @returns {boolean}
     */
    protected canDoExport(): boolean {
        return true;
    }

    /**
     * 是否具备执行“导入”动作的条件
     * @returns {boolean}
     */
    protected canDoImport(): boolean {
        return true;
    }

    /**
     * 是否具备执行“查看”动作的条件
     * @returns {boolean}
     */
    protected canDoView(): boolean {
        if (this.useTreeTable) {
            return !isUndefined(this.treeTableService) && !isUndefined(this.treeTableService.selectedNode);
        } else {
            return !isUndefined(this.selectedRecord);
        }
    }

    /**
     * 执行“新增”动作
     * @returns {Observable<R>}
     */
    protected doAdd(): Observable<ResponseResult> {
        return this.service.addItem(this.record);
    }

    protected doDelete(): Observable<any> {
        let data;
        if (this.useTreeTable) {
            data = this.treeTableService.selectedNode.data;
        } else {
            data = this.selectedRecord;
        }

        return this.service.deleteItem(data);
    }

    /**
     * 执行“新增”动作
     * @returns {Observable<R>}
     */
    protected doEdit(): Observable<ResponseResult> {
        return this.service.editItem(this.record);
    }

    doConfirm(record: any): Observable<ResponseResult> {
        let observable: Observable<ResponseResult>;

        if (this.action == ActionType.newAction) {
            observable = this.doAdd();
        } else if (this.action == ActionType.editAction) {
            observable = this.doEdit();
        } else if (this.action == ActionType.deleteAction) {
            observable = this.doEdit();
        } else {
            /*const dialogResult: DialogResult = {'success': false, 'cancel': false};
             this.dialogRef.close(dialogResult);*/
            return;
        }

        return observable;
    }

    /**
     * 执行“新增”动作
     * @returns {Observable<R>}
     */
    doProgress(): Observable<ResponseResult> {

        let observable: Observable<ResponseResult>;

        if (this.action == ActionType.newAction) {
            observable = this.doAdd();
        } else if (this.action == ActionType.editAction) {
            observable = this.doEdit();
        } else if (this.action == ActionType.deleteAction) {
            observable = this.doDelete();
        } else {
            /*const dialogResult: DialogResult = {'success': false, 'cancel': false};
             this.dialogRef.close(dialogResult);*/
            return;
        }

        return observable;
    }

    protected getActionName(action): string {
        if (action == ActionType.viewAction) {
            return '查看';
        } else if (action == ActionType.newAction) {
            return '新增';
        } else if (action == ActionType.editAction) {
            return '编辑';
        } else {
            return;
        }
    }

    protected getDeleteMessage(): string[] {
        const message = [];
        message.push(this.mainHeader + '记录');
        if (this.useTreeTable) {
            message.push('ID:[' + this.treeTableService.selectedNode.id + ']');
        } else {
            message.push('ID:[' + this.selectedRecord.id + ']');
        }

        return message;
    };

    /**
     * “删除”按钮处理响应
     */
    handleAdd() {
        if (this.canDoAdd() && this.initAddParams()) {
            let dialogRef = this.oPenDialog('--新增');

            //关闭对话框后进行,刷新
            dialogRef.afterClosed().subscribe((result: DialogResult) => {
                dialogRef = null;

                if (result.success) {
                    //this.doRefresh(result.recordId);
                    this.setSelectedRecord(result.recordId);
                }
            });
        }
    }

    /**
     * “删除”按钮处理响应
     */
    handleDelete(event) {
        if (!this.canDoDelete()) {
            return;
        }

        this.action = ActionType.deleteAction;

        //弹出对话框，确认是否删除
        let dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, this.dialogConfig);
        dialogRef.componentInstance.messages = this.getDeleteMessage();
        dialogRef.componentInstance.confirmProcess = this;

        //关闭对话框后执行动作
        dialogRef.afterClosed().subscribe((result: DialogResult) => {
            dialogRef = null;
            /*if (result.success) {
                this.doRefresh(null);
            }*/
        });
    }

    handleEdit() {
        if (this.canDoEdit() && this.initEditParams()) {
            let dialogRef = this.oPenDialog('--编辑');

            //关闭对话框后进行,刷新
            dialogRef.afterClosed().subscribe((result: DialogResult) => {
                dialogRef = null;
                if (result.success) {
                    //this.doRefresh(result.recordId);
                    this.setSelectedRecord(result.recordId);
                }
            });
        }
    }

    handleExport(event) {
        if (!this.canDoExport()) {
            return;
        }

        this.action = ActionType.exportAction;

        return this.service.export();
    }

    handleImport(event) {
        if (!this.canDoImport()) {
            return;
        }

        this.action = ActionType.importAction;

        //弹出对话框，确认是否删除
        let dialogRef: MdDialogRef<UploadDialogComponent> = this.dialog.open(UploadDialogComponent, this.dialogConfig);
        dialogRef.componentInstance.url = this.service.importUrl;
        //dialogRef.componentInstance.confirmProcess = this;

        //关闭对话框后执行动作
        dialogRef.afterClosed().subscribe((result: DialogResult) => {
            dialogRef = null;
            /*if (result.success) {
                this.doRefresh(null);
            }*/
        });
    }

    /**
     * “查看”按钮处理响应
     */
    handleView() {
        if (this.canDoView() && this.initViewParams()) {
            this.oPenDialog('--查看');
        }
    }

    protected initViewParams(): boolean {

        this.action = ActionType.viewAction;
        this.record = this.getCloneRecord();

        return true;
    }

    protected initAddParams(): boolean {
        this.action = ActionType.newAction;
        this.record = this.newInstance();

        return true;
    }

    protected initEditParams(): boolean {
        this.action = ActionType.editAction;
        this.record = this.getCloneRecord();

        return true;
    }

    protected oPenBaseDialog<T extends BaseDialog>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, record, actionName) {
        const dialogRef: MdDialogRef<T> = this.dialog.open(componentOrTemplateRef, this.dialogConfig);
        dialogRef.componentInstance.record = record;
        dialogRef.componentInstance.dialogHeader = this.mainHeader + '--' + actionName;
        dialogRef.componentInstance.action = this.action;
        dialogRef.componentInstance.service = this.service;
        dialogRef.componentInstance.confirmProcess = this;

        return dialogRef;
    }


}

/** @deprecated */
export abstract class SubPageComponentWithTemplateDialog<T extends BaseObject, S extends BaseService>
    extends SubPageComponentWithDialog<T, S> {

    @ViewChild('TemplateRef') template: TemplateRef<any>;
    progress = false;
    actionsAlignment = 'end';
    dialogRef;

    //abstract
    oPenDialog(actionName: string): MdDialogRef<any> {
        this.dialogHeader = this.mainHeader + actionName;
        this.dialogRef = this.dialog.open(this.template, this.dialogConfig);
        return this.dialogRef;
    }

    //按钮-确认
    handleConfirm() {
        this.progress = true;
        let observable: Observable<any> = null;


        if (this.action == ActionType.newAction) {//新增
            observable = this.doAdd();
        } else if (this.action = ActionType.editAction) {//编辑
            observable = this.doEdit();
        }

        observable.subscribe(
            responseResult => {
                const dialogResult: DialogResult = {'success': true, 'recordId': responseResult.data.id};
                this.dialogRef.close(dialogResult);
                this.progress = false;
            },
            err => {
                console.log(err);
                this.progress = false;
            },
            () => console.log('confirm Complete')
        );
        //this.record = null;
    }

    //按钮-取消
    handleCancel() {
        const dialogResult: DialogResult = {'success': false, 'cancel': false};
        this.dialogRef.close(dialogResult);
    }

}

export abstract class SubPageComponentWithComponentDialog<O extends BaseObject, S extends BaseService, D extends BaseDialog>
    extends SubPageComponentWithDialog<O, S> {

    //编辑对话框类型
    componentOrTemplateRef: ComponentType<D> | TemplateRef<D>;

    constructor(service: S, mainHeader: string, dialog: MdDialog,
                _componentOrTemplateRef: ComponentType<D> | TemplateRef<D>) {
        super(service, mainHeader, dialog);
        this.componentOrTemplateRef = _componentOrTemplateRef;
    }

    /* @override */
    oPenDialog(actionName: string) {
        return this.oPenBaseDialog(this.componentOrTemplateRef, this.record, actionName);
    }

}

export interface BaseDialog {
    record: any;
    dialogHeader: string;
    action: any;
    service: any;
    confirmProcess: ConfirmProcess;
}

export interface DialogResult {
    success: boolean;
    cancel?: boolean;
    recordId?: number;
}

export class ComponentDialog<D, R, S extends BaseService> implements BaseDialog {
    actionsAlignment = 'end';
    progress = false;
    dialogHeader: string;  //编辑页面标题

    action: ActionType;
    service: S;

    dialogRef: MdDialogRef<D>;
    record: R;        //临时变量

    confirmProcess: ConfirmProcess;

    //refreshAction:(event:Event)=>void;

    constructor(_dialogRef: MdDialogRef<D>) {
        this.dialogRef = _dialogRef;
    }

    doAdd(): Observable<ResponseResult> {
        return this.service.addItem(this.record);
    }

    //编辑
    doEdit() {
        return this.service.editItem(this.record);
    }

    //按钮-确认
    handleConfirm() {
        this.progress = true;
        const observable: Observable<any> = this.confirmProcess.doConfirm(this.record);
        if (observable == null) {
            return;
        }

        observable.subscribe(
            responseResult => {

                if (responseResult.status == -1) {
                    return;
                }

                const dialogResult: DialogResult = {'success': true, 'recordId': responseResult.data.id};
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

    //按钮-取消
    handleCancel() {
        const dialogResult: DialogResult = {'success': false, 'cancel': false};
        this.dialogRef.close(dialogResult);
    }

}
