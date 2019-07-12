import Operand from "../../token/operand_token"
import { Num, Variable } from "./tokens"

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
