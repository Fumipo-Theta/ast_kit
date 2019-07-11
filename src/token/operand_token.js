import Token from "./token.js"

export default class Operand extends Token {
    constructor(value) {
        super(value)
    }

    expr(table, _) {
        if (table instanceof Map) return table.get(this.value)
        if (table instanceof Object) return table[this.value]
        return this.value
    }

    static isInstance(token) {
        return (token instanceof Operand)
    }
}
