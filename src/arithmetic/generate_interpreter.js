import Operand from "../token/operand_token"
import { BraceStart } from "../token/brace_tokens"
import { ISubtractor } from "./i_tokens"
import len from "../len"
import { lastOf, withoutLastOf } from "../array_util"

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

        if (len(acc) === 0) {
            return (e instanceof ISubtractor)
                ? [new Operand(-1), new tokenRule.Multiplier()]
                : [e]
        }

        const last = lastOf(acc)

        if (last instanceof BraceStart & e instanceof ISubtractor) {
            return [...acc, new Operand(-1), new tokenRule.Multiplier()]
        }

        if (last instanceof Operand & e instanceof Operand) {
            const proc = withoutLastOf(acc)
            return [...proc, new Operand(last.value + e.value)]
        } else {
            return [...acc, e]
        }
    }
}
