import Token from "./token.js"

export default class Operand extends Token {
    constructor(value) {
        super(value)
    }

    expr(_, __) {
        return this.value
    }
}
