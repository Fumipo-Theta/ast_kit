import { Adder, Subtractor, Multiplier, Divider } from "./tokens"
import { BraceStart, BraceEnd } from "../../token/brace_tokens"
import Operand from "../../token/operand_token"
import tokenFactory from "../../token/token_factory"

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

export default syntax_rule
