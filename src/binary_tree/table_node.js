import BinaryTree from "./binary_tree.js"
import EmptyNode from "./empty_node.js"

export default class TableNode extends BinaryTree {
    constructor(collection, left, right) {
        super(collection, new EmptyNode(), new EmptyNode())
    }

    evaluate() {
        return this.value
    }
}
