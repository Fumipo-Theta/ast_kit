import Operator from "../token/operator_token.js"
import { BraceStart, BraceEnd } from "../token/brace_tokens.js"
import len from "../len.js"
import { lastOf } from "../array_util.js"
import concatTokens from "../token/concat_tokens.js"

export default function checkSyntaxError(tokens) {
    if (tokens.filter(e => e instanceof BraceStart).length !== tokens.filter(e => e instanceof BraceEnd).length) {
        throw new SyntaxError("Brace must be closed.")
    }
    return tokens.reduce((acc, e) => {
        if (len(acc) === 0) return [e]

        const last = lastOf(acc)

        if ((last instanceof Operator) & (e instanceof Operator)) {
            throw new SyntaxError(`${concatTokens([...acc, e])}: ${e.value} cannot be after  ${last.value}`)
        }

        return [...acc, e]
    }, [])
}
