import BinaryTree from "./binary_tree.js"
import EmptyNode from "./empty_node.js"

export default class VariableNode extends BinaryTree {
    constructor(value, _, __) {
        super(value, new EmptyNode(), new EmptyNode())
    }
}
