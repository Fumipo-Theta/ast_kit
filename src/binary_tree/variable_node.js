import BinaryTree from "./binary_tree.js"
import EmptyNode from "./empty_node.js"

export default class VariableNode extends BinaryTree {
    constructor(value, table, _) {
        super(value, table, new EmptyNode())
    }

    evaluate() {
        return this.value.expr(this.left.evaluate())
    }
}
