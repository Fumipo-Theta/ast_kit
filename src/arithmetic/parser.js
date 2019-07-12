import { Adder, Subtractor, Multiplier, Divider } from "./arithmetic_tokens"
import { BraceStart, BraceEnd } from "../token/brace_tokens"
import Operator from "../token/operator_token"
import Variable from "../token/variable_token"
import Operand from "../token/operand_token"
import tokenFactory from "../token/token_factory"
import generateTokenizer from "../token/generate_tokenizer"
import interpreter from "./interpreter"
import postInterpretNumberAndVariable from "./post_interpret_number_and_variable"
import checkSyntaxError from "./syntax_checker"
import OperatorNode from "../binary_tree/operator_node"
import VariableNode from "../binary_tree/variable_node"
import TableNode from "../binary_tree/table_node"
import LiteralNode from "../binary_tree/literal_node"
import rearrangeTokens from "./rearrange_tokens_to_RPN"
import len from "../len"

function generateParser(tokenizer) {
    return (table = {}) => function (expression) {

        const tokenArray = tokenizer(expression)
        const tokens = [...rearrangeTokens(tokenArray).reverse()]
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
