import OperatorNode from "../binary_tree/operator_node"
import LiteralNode from "../binary_tree/literal_node"
import VariableNode from "../binary_tree/variable_node"

/**
 *
 * @param {OperatorNode | LiteralNode | VariableNode} node
 */
export default function evaluator(node) {
    if (node instanceof OperatorNode) {
        return node.value(evaluator(node.left), evaluator(node.right))
    } else if (node instanceof LiteralNode) {
        return node.value()
    } else if (node instanceof VariableNode) {
        return node.value()
    } else {
        throw new TypeError(`Unavailable type of Tree node.`)
    }
}
