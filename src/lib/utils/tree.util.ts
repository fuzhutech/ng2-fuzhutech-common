import {TreeNode} from 'primeng/primeng';

export class TreeUtil {

    static findIndexInSelection(selection: TreeNode[], node: TreeNode) {
        let index: number = -1;

        if (selection) {
            for (let i = 0; i < selection.length; i++) {
                if (selection[i] == node) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

}
