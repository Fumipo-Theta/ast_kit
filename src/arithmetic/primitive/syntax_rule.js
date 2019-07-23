import { Adder, Subtractor, Multiplier, Divider } from "./tokens"
import { BraceStart, BraceEnd } from "../../token/brace_tokens"
import { VariableStartParenthis, VariableEndParenthis } from "../../token/variable_parenthis"
import Operand from "../../token/operand_token"
import tokenFactory from "../../token/token_factory"

const syntax_rule = {
    "+": tokenFactory(Adder),
    "-": tokenFactory(Subtractor),
    "*": tokenFactory(Multiplier),
    "/": tokenFactory(Divider),
    "(": tokenFactory(BraceStart),
    "{": tokenFactory(VariableStartParenthis),
    ")": tokenFactory(BraceEnd),
    "}": tokenFactory(VariableEndParenthis),
    "default": tokenFactory(Operand)
}

export default syntax_rule
