import Operator from "../token/operator_token"

/**
 * rule: [
 *  {priority: number, pattern: RegExp}
 * ]
 */
export default function generateSyntaxRule(rule) {
    /**
     * @param {string} expression
     * @return {Array<Token>}
     */
    return function applier(expression) {
        const chars = expression.split("")
        const buffer = []
        let
    }
}
