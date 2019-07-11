import Token from "./token.js"

export default class Operator extends Token {
    constructor(priority, symbol) {
        super(symbol)
        this._priority = priority
    }

    get priority() {
        return this._priority
    }
}
