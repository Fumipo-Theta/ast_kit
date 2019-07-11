import Operand from "../token/operand_token.js"
import { Num } from "../token/literal_tokens.js"
import Variable from "../token/variable_token.js"

/**
 *
 * @param {Token} e
 * @return {Token | Num | Variable}
 */
export default function postInterpretNumberAndVariable(e) {
    if (e instanceof Operand) {
        if (e.value.match(/^-?[\d\.]+$/)) {
            return new Num(e.value)
        } else {
            return new Variable(e.value)
        }
    } else {
        return e
    }
}
