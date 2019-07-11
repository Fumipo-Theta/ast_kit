import { Adder, Subtractor, Multiplier, Divider } from "../token/arithmetic_tokens.js"
import { BraceStart, BraceEnd } from "../token/brace_tokens.js"
import Operator from "../token/operator_token.js"
import Variable from "../token/variable_token.js"
import Operand from "../token/operand_token.js"
import tokenFactory from "../token/token_factory.js"
import generateTokenizer from "../token/generate_tokenizer.js"
import interpreter from "./interpreter.js"
import postInterpretNumberAndVariable from "./post_interpret_number_and_variable.js"
import checkSyntaxError from "./syntax_checker.js"
import OperatorNode from "../binary_tree/operator_node.js"
import VariableNode from "../binary_tree/variable_node.js"
import TableNode from "../binary_tree/table_node.js"
import LiteralNode from "../binary_tree/literal_node.js"
import rearrangeTokensToRPN from "../token/rearrange_tokens.js"
import len from "../len"

function generateParser(tokenizer) {
    return (table = {}) => function (expression) {

        const tokenArray = tokenizer(expression)
        const tokens = [...rearrangeTokensToRPN(tokenArray).reverse()]
        const stack = []

        while (len(tokens) > 0) {
            let token = tokens.pop()
            if (token instanceof Operator) {
                let rightNode = stack.pop()
                let leftNode = stack.pop()
                stack.push(new OperatorNode(token, leftNode, rightNode))

            } else if (token instanceof Variable) {
                stack.push(new VariableNode(token, new TableNode(table)))

            } else {
                stack.push(new LiteralNode(token))
            }
        }

        return stack.pop()
    }
}

const syntax_rule = {
    "+": tokenFactory(Adder),
    "-": tokenFactory(Subtractor),
    "*": tokenFactory(Multiplier),
    "/": tokenFactory(Divider),
    "(": tokenFactory(BraceStart),
    "{": tokenFactory(BraceStart),
    "[": tokenFactory(BraceStart),
    ")": tokenFactory(BraceEnd),
    "}": tokenFactory(BraceEnd),
    "]": tokenFactory(BraceEnd),
    "default": tokenFactory(Operand)
}



const tokenizer = generateTokenizer(syntax_rule, interpreter, postInterpretNumberAndVariable, checkSyntaxError)


export default generateParser(tokenizer)
