import BinaryTree from "./binary_tree.js"

export default class OperatorNode extends BinaryTree {
    constructor(operator, left, right) {
        super(operator, left, right)
    }

    evaluate() {
        return this.value.expr(this.left.evaluate(), this.right.evaluate())
    }
}
