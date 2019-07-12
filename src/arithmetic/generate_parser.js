import { IVariable } from "./i_tokens"
import Operator from "../token/operator_token"
import OperatorNode from "../binary_tree/operator_node"
import VariableNode from "../binary_tree/variable_node"
import LiteralNode from "../binary_tree/literal_node"
import rearrangeTokens from "./rearrange_tokens_to_RPN"
import len from "../len"

export default function generateParser(tokenizer) {
    return (table) => function (expression) {

        const tokenArray = tokenizer(expression)
        const tokens = [...rearrangeTokens(tokenArray).reverse()]
        const stack = []

        while (len(tokens) > 0) {
            let token = tokens.pop()
            if (token instanceof Operator) {
                let rightNode = stack.pop()
                let leftNode = stack.pop()
                stack.push(new OperatorNode(token.expr(), leftNode, rightNode))

            } else if (token instanceof IVariable) {
                stack.push(new VariableNode(token.expr(table)))

            } else {
                stack.push(new LiteralNode(token.expr()))
            }
        }

        return stack.pop()
    }
}
