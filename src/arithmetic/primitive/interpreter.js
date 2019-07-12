import Operand from "../../token/operand_token"
import { BraceStart } from "../../token/brace_tokens"
import { Subtractor, Multiplier } from "./tokens"
import len from "../../len"
import { lastOf, withoutLastOf } from "../../array_util"

/**
 * @parameter {Array<Token>} acc
 * @parameter {Token} e
 * @return {Array<Token>}
 */
export default function interpreter(acc, e) {
    if (e.value === " ") return acc

    if (len(acc) === 0) {
        return (e instanceof Subtractor)
            ? [new Operand(-1), new Multiplier()]
            : [e]
    }

    const last = lastOf(acc)

    if (last instanceof BraceStart & e instanceof Subtractor) {
        return [...acc, new Operand(-1), new Multiplier()]
    }

    if (last instanceof Operand & e instanceof Operand) {
        const proc = withoutLastOf(acc)
        return [...proc, new Operand(last.value + e.value)]
    } else {
        return [...acc, e]
    }
}
