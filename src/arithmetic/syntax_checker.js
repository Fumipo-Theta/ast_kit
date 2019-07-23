import Operator from "../token/operator_token.js"
import { BraceStart, BraceEnd } from "../token/brace_tokens.js"
import len from "../len.js"
import { lastOf } from "../array_util.js"
import concatTokens from "../token/concat_tokens.js"

function confirmParenthesesCorrespondency(tokens) {
    if (tokens.filter(e => e instanceof BraceStart).length !== tokens.filter(e => e instanceof BraceEnd).length) {
        //console.log(tokens.filter(e => e instanceof BraceStart).length, tokens.filter(e => e instanceof BraceEnd).length)
        throw new SyntaxError(`Parentheses must be closed. ${concatTokens(tokens)}`)
    }
}

function checkAdjacentOperators(checked, token) {
    if (len(checked) === 0) return [token]

    const last = lastOf(checked)

    if ((last instanceof Operator) & (token instanceof Operator)) {
        throw new SyntaxError(`${concatTokens([...checked, token])}: ${token.value} cannot be after  ${last.value}`)
    }
    return [...checked, token]
}

/**
 * 1. Confirm the correspondence of parentheses
 * 2. Check if the operators are not adjacent
 *
 * @param {Array<Token>} tokens
 * @return {Array<Token>}
 */
export default function checkSyntaxError(tokens) {
    confirmParenthesesCorrespondency(tokens)
    return tokens.reduce(checkAdjacentOperators, [])
}
