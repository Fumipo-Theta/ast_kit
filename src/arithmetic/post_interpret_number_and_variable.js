import Operand from "../token/operand_token"

const numberPattern = new RegExp(/^-?[\d\.]+$/)

/**
 *
 * @param {Token} e
 * @return {Token | Num | Variable}
 */
export default function postInterpretNumberAndVariable(tokenRule) {
    return function (e) {
        if (e instanceof Operand) {
            if (e.value.match(numberPattern)) {
                return new tokenRule.Num(e.value)
            } else {
                return new tokenRule.Variable(e.value)
            }
        } else {
            return e
        }
    }
}
