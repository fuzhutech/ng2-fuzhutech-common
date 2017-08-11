/**
 * Created by fuzhutech on 2017/8/11.
 *
 * @license
 * Copyright www.fuzhutech.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.fuzhutech.com/license
 */

import {TreeNode} from 'primeng/primeng';

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
