import Operand from "../token/operand_token"
import { BraceStart, BraceEnd } from "../token/brace_tokens"
import len from "../len"
import { lastOf } from "../array_util"

/**
 *
 * @param {Array<Token>} _tokens
 * @param {bool?} verbose
 * @return {Array<Token>}
 */
export default function rearrangeTokens(_tokens, verbose = false) {
    const stack = []
    const buffer = []
    const tokens = [..._tokens]

    while (len(tokens) > 0) {
        let token = tokens.shift()
        if (verbose) {
            console.log("token", token)
            console.log("stack", stack.map(e => e.value))
            console.log("buffer", buffer.map(e => e.value))
        }

        if (token instanceof Operand) {
            buffer.push(token)

        } else if (token instanceof BraceEnd) {
            while (!(lastOf(stack) instanceof BraceStart)) {
                let poped = stack.pop()
                buffer.push(poped)
                if (len(stack) === 0) throw SyntaxError("Brace start is lacked.")
            }
            stack.pop()

        } else if (token instanceof BraceStart) {
            stack.push(token)

        } else {
            while (len(stack) > 0) {
                if (lastOf(stack).priority > token.priority) {
                    let poped = stack.pop()
                    buffer.push(poped)
                } else {
                    break
                }
            }
            stack.push(token)
        }
    }

    while (len(stack) > 0) {
        let poped = stack.pop()
        if (poped instanceof BraceStart) throw SyntaxError("Brace must be closed.")
        buffer.push(poped)
    }
    return buffer
}
