import Operand from "./operand_token.js"
import { Just, Nothing } from "../monad/maybe"

export class Num extends Operand {
    constructor(value) {
        super(value)
    }

    expr(_, __) {
        const number = parseFloat(this.value)
        if (number === NaN) return Nothing.return()
        if (number === undefined) return Nothing.return()
        return Just.return(number)
    }

}
