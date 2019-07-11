import Operand from "./operand_token.js"

export class Num extends Operand {
    constructor(value) {
        super(value)
    }

    expr(_, __) {
        return parseFloat(this.value)
    }

}
