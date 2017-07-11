export class ToolbarOption {
    //查看
    viewButtonOption: ButtonOption = {disabled: false, visible: true, value: '查看'};

    //新增
    addButtonOption: ButtonOption = {disabled: false, visible: true, value: '新增'};

    //删除
    deleteButtonOption: ButtonOption = {disabled: false, visible: true, value: '删除'};

    //编辑
    editButtonOption: ButtonOption = {disabled: false, visible: true, value: '编辑'};

    //刷新
    refreshButtonOption: ButtonOption = {disabled: false, visible: true, value: '刷新'};

    //关闭
    closeButtonOption: ButtonOption = {disabled: false, visible: true, value: '关闭'};
}

export class ButtonOption {
    disabled = false;    //是否可用
    visible = true;      //是否可见
    name?: string;
    value: string;       //标签名
    icon?: string;       //图标
}
