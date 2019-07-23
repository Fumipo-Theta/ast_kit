import Operand from "../token/operand_token"
import { BraceStart } from "../token/brace_tokens"
import { VariableStartParenthis, VariableEndParenthis } from "../token/variable_parenthis"
import { ISubtractor } from "./i_tokens"
import len from "../len"
import { lastOf, withoutLastOf } from "../array_util"


function concatOperands(prev, next) {
    return new Operand(prev.value + next.value)
}

/**
 * 1. 単項演算子の - を -1 * と解釈する.
 *      * 式の最初に - が来る場合
 *      * ( の直後に - が来る場合
 *
 * 2. 連続するOperandを一つのOperandと解釈する.
 *
 * @param {Object<string, Token>} tokenRule
 * @return {(acc:Array<Token>, e: Token) => Array<Token>}
 */
export default function generateInterpreter(tokenRule) {
    return function interpreter(acc, e) {

        if (e.value === " ") return acc
        if (e instanceof VariableStartParenthis) return { mode: "variable", tokens: [...acc.tokens] }
        if (e instanceof VariableEndParenthis) return { mode: "", tokens: [...acc.tokens] }

        if (len(acc.tokens) === 0) {
            if (acc.mode === "variable") {
                return { mode: acc.mode, tokens: [new Operand(e.value)] }
            } else {
                return (e instanceof ISubtractor)
                    ? { mode: acc.mode, tokens: [new Operand(-1), new tokenRule.Multiplier()] }
                    : { mode: acc.mode, tokens: [e] }
            }
        }

        const last = lastOf(acc.tokens)

        if (acc.mode === "variable") {
            if (last instanceof Operand) {
                const proc = withoutLastOf(acc.tokens)
                return { mode: acc.mode, tokens: [...proc, concatOperands(last, e)] }
            } else {
                return { mode: acc.mode, tokens: [...acc.tokens, new Operand(e.value)] }
            }
        }


        if (last instanceof BraceStart & e instanceof ISubtractor) {
            return { mode: acc.mode, tokens: [...acc.tokens, new Operand(-1), new tokenRule.Multiplier()] }
        }

        if (last instanceof Operand & e instanceof Operand) {
            const proc = withoutLastOf(acc.tokens)
            return { mode: acc.mode, tokens: [...proc, concatOperands(last, e)] }
        } else {
            return { mode: acc.mode, tokens: [...acc.tokens, e] }
        }
    }
}
