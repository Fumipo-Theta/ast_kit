import Operator from "../../token/operator_token"
import Operand from "../../token/operand_token"
import { Maybe, Just, Nothing, Raise } from "../../monad/maybe"
import VariableTable from "../../variable_table"

const add = (mx, my) => mx.bind(x => my.bind(y => Maybe.return(x + y)))
const subtract = (mx, my) => mx.bind(x => my.bind(y => Maybe.return(x - y)))
const multiple = (mx, my) => mx.bind(x => my.bind(y => Maybe.return(x * y)))
const divide = (mx, my) => mx.bind(x => my.bind(y => y === 0 ? Nothing.return() : Just.return(x / y)))

export class Adder extends Operator {
    constructor() {
        super(1, "+")
    }

    /**
     *
     * @param {Maybe} left
     * @param {Maybe} right
     * @return {Maybe}
     */
    expr(left, right) {
        return add(left, right)
    }
}

export class Subtractor extends Operator {
    constructor() {
        super(1, "-")
    }

    /**
     *
     * @param {Maybe} left
     * @param {Maybe} right
     * @return {Maybe}
     */
    expr(left, right) {
        return subtract(left, right)
    }
}

export class Multiplier extends Operator {
    constructor() {
        super(2, "*")
    }

    /**
     *
     * @param {Maybe} left
     * @param {Maybe} right
     * @return {Maybe}
     */
    expr(left, right) {
        return multiple(left, right)
    }
}

export class Divider extends Operator {
    constructor() {
        super(2, "/")
    }

    /**
     *
     * @param {Maybe} left
     * @param {Maybe} right
     * @return {Maybe}
     */
    expr(left, right) {
        return divide(left, right)
    }
}


export class Num extends Operand {
    constructor(value) {
        super(value)
    }

    /**
     *
     * @param {any} _
     * @param {any} __
     * @return {Maybe}
     */
    expr(_, __) {
        const number = parseFloat(this.value)
        if (number === NaN) return Nothing.return()
        if (number === undefined) return Nothing.return()
        return Just.return(number)
    }

}


function getFromCollection(table, key) {
    if (table instanceof Map) return table.get(key)
    if (table instanceof VariableTable) return table.get(key)
    if (table instanceof Object) return table[key]
}

/**
 *
 * @param {VariableTable} table
 * @param {string=>Maybe}
 */
function safeGet(table) {
    return function (key) {
        const value = getFromCollection(table, key)
        if (value === undefined) return Raise.return(new Error(`Undefined key ${key}.`))
        if (typeof value === "string") return Raise.return(new TypeError(`Variable ${key} is not number.`))
        return Just.return(value)
    }
}

export class Variable extends Operand {
    constructor(value) {
        super(value)
    }

    /**
     *
     * @param {VariableTable} table
     * @param {any} _
     * @return {Maybe}
     */
    expr(table, _) {
        return safeGet(table)(this.value)
    }

}
