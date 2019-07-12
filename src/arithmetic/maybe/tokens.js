import Operand from "../../token/operand_token"
import { IAdder, ISubtractor, IMultiplier, IDivider, IVariable } from "../i_tokens"
import { Maybe, Just, Nothing, Raise } from "../../monad/maybe"
import VariableTable from "../../variable_table"

const add = (mx, my) => mx.bind(x => my.bind(y => Maybe.return(x + y)))
const subtract = (mx, my) => mx.bind(x => my.bind(y => Maybe.return(x - y)))
const multiple = (mx, my) => mx.bind(x => my.bind(y => Maybe.return(x * y)))
const divide = (mx, my) => mx.bind(x => my.bind(y => y === 0 ? Nothing.return() : Just.return(x / y)))

export class Adder extends IAdder {
    constructor() {
        super(add, 1, "+")
    }
}

export class Subtractor extends ISubtractor {
    constructor() {
        super(subtract, 1, "-")
    }
}

export class Multiplier extends IMultiplier {
    constructor() {
        super(multiple, 2, "*")
    }
}

export class Divider extends IDivider {
    constructor() {
        super(divide, 2, "/")
    }
}


export class Num extends Operand {
    constructor(value) {
        super(value)
    }

    /**
     *
     * @return {() => Maybe}
     */
    expr() {
        const number = parseFloat(this.value)
        if (number === NaN) return Nothing.return()
        if (number === undefined) return Nothing.return()
        return () => Just.return(number)
    }

}


/**
 *
 * @param {VariableTable} table
 * @param {string=>Maybe}
 */
function safeGet(table) {
    return function (key) {
        const value = table.get(key)
        if (value === undefined) return Raise.return(new Error(`Undefined key ${key}.`))
        if (typeof value === "string") return Raise.return(new TypeError(`Variable ${key} is not number.`))
        return Just.return(value)
    }
}

export class Variable extends IVariable {
    constructor(value) {
        super(value)
    }

    /**
     *
     * @param {VariableTable} table
     * @return {() => Maybe}
     */
    expr(table) {
        return () => safeGet(table)(this.value)
    }

}
