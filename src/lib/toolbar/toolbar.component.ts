import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ToolbarOption} from './toolbar.option';
import {AuthInfo, MenuInfo} from '../auth-info/auth-info.model';
import {AuthInfoService} from '../auth-info/auth-info.service';

@Component({
    selector: 'fz-toolbar',
    templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit, AfterViewInit {

    private enableViewRight = false;  //按钮是否启用权限控制
    private enableAddRight = false;
    private enableDeleteRight = false;
    private enableEditRight = false;
    private enableRefreshRight = false;
    private enableCloseRight = false;

    private hasViewRight = false;   //是否拥有操作按钮的权限
    private hasAddRight = false;
    private hasDeleteRight = false;
    private hasEditRight = false;
    private hasRefreshRight = false;
    private hasCloseRight = false;

    @Input() visibleView = true;    //界面是否显示按钮
    @Input() visibleAdd = true;
    @Input() visibleDelete = true;
    @Input() visibleEdit = true;
    @Input() visibleRefresh = true;
    @Input() visibleClose = true;

    @Input() disabledView = false;    //控制按钮不可用状态
    @Input() disabledAdd = false;
    @Input() disabledDelete = false;
    @Input() disabledEdit = false;
    @Input() disabledRefresh = false;
    @Input() disabledClose = false;

    //@Input() option: ToolbarOption = new ToolbarOption();    //查看按钮是否可用

    @Input() menuId: number;

    /**
     * 权限信息，变化时，会更新界面是否拥有按钮权限
     * @param authInfo
     */
    @Input() set authInfo(authInfo: AuthInfo) {
        console.log('检测到authInfo输入变化', this.menuId, authInfo);

        if (!this.menuId) {
            return;
        }

        if (authInfo && authInfo.resources) {
            const arrayFilter = authInfo.resources.filter(item => {
                return item.parentId == this.menuId;
            });

            arrayFilter.forEach((item, index, array) => {
                if (item.name == '查看') {
                    this.hasViewRight = true;
                } else if (item.name == '添加') {
                    this.hasAddRight = true;
                } else if (item.name == '删除') {
                    this.hasDeleteRight = true;
                } else if (item.name == '编辑') {
                    this.hasEditRight = true;
                }
            });

        }
    }

    /**
     * 菜单信息，展示界面按钮是否需要权限控制
     * @param menuInfo
     */
    @Input() set menuInfo(menuInfo: MenuInfo) {
        console.log('检测到menuInfo输入变化', this.menuId, menuInfo);

        if (!this.menuId) {
            return;
        }

        if (menuInfo && menuInfo.menus) {
            const arrayFilter = menuInfo.menus.filter(item => {
                return item.parentId == this.menuId;
            });

            arrayFilter.forEach(item => {
                switch (item.name) {
                    case '查看':
                        this.enableViewRight = true;
                        break;
                    case '新增':
                        this.enableAddRight = true;
                        break;
                    case '删除':
                        this.enableDeleteRight = true;
                        break;
                    case '编辑':
                        this.enableEditRight = true;
                        break;
                    case '刷新':
                        this.enableRefreshRight = true;
                        break;
                    case '关闭':
                        this.enableCloseRight = true;
                        break;
                    default:
                        break;
                }
            });

        }

    }

    @Output() onViewClick: EventEmitter<any> = new EventEmitter();    //查看
    @Output() onAddClick: EventEmitter<any> = new EventEmitter();     //新增
    @Output() onDeleteClick: EventEmitter<any> = new EventEmitter();  //删除
    @Output() onEditClick: EventEmitter<any> = new EventEmitter();    //编辑
    @Output() onRefreshClick: EventEmitter<any> = new EventEmitter(); //刷新
    @Output() onLookupClick: EventEmitter<any> = new EventEmitter();  //查找
    @Output() onImportClick: EventEmitter<any> = new EventEmitter();  //导入
    @Output() onExportClick: EventEmitter<any> = new EventEmitter();  //导出
    @Output() onPrintClick: EventEmitter<any> = new EventEmitter();   //打印
    @Output() onCloseClick: EventEmitter<any> = new EventEmitter();   //关闭

    ngAfterViewInit(): void {
        //throw new Error('Method not implemented.');
        console.log('ToolbarComponent on afterViewInit');
    }

    ngOnInit(): void {
        //throw new Error('Method not implemented.');
        console.log('ToolbarComponent on init');
    }

    viewClick(event: Event) {
        /*if (this.option && this.option.viewButtonOption && this.option.viewButtonOption.disabled) {
         this.onViewClick.next({originalEvent: event});
         }*/
        this.onViewClick.next({originalEvent: event});
    }

    addClick(event: Event) {
        this.onAddClick.next({originalEvent: event});
    }

    deleteClick(event: Event) {
        this.onDeleteClick.next({originalEvent: event});
    }

    editClick(event: Event) {
        this.onEditClick.next({originalEvent: event});
    }

    refreshClick(event: Event) {
        this.onRefreshClick.next({originalEvent: event});
    }

    lookupClick(event: Event) {
        this.onEditClick.next({originalEvent: event});
    }

    importClick(event: Event) {
        this.onEditClick.next({originalEvent: event});
    }

    exportClick(event: Event) {
        this.onEditClick.next({originalEvent: event});
    }

    printClick(event: Event) {
        this.onEditClick.next({originalEvent: event});
    }

    closeClick(event: Event) {
        this.onEditClick.next({originalEvent: event});
    }


}
