/**
 * Created by fuzhutech on 2017/8/11.
 *
 * @license
 * Copyright www.fuzhutech.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.fuzhutech.com/license
 */
import {BaseTreeNode, BaseTreeObject} from '../../core/model/sub-page';

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
