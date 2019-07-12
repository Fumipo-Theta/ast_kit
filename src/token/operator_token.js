import Token from "./token.js"

export default class Operator extends Token {
    constructor(evalFunc, priority, symbol) {
        super(symbol)
        this.evalFunc = evalFunc
        this._priority = priority
    }

    expr() {
        return this.evalFunc
    }

    get priority() {
        return this._priority
    }
}
