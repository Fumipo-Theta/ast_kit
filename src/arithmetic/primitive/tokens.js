import Operator from "../../token/operator_token"
import Operand from "../../token/operand_token"
import { Maybe, Just, Nothing, Raise } from "../../monad/maybe"
import VariableTable from "../../variable_table"


export class Adder extends Operator {
    constructor() {
        super(1, "+")
    }

    /**
     *
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    expr(left, right) {
        return left + right
    }
}

export class Subtractor extends Operator {
    constructor() {
        super(1, "-")
    }

    /**
     *
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    expr(left, right) {
        return left - right
    }
}

export class Multiplier extends Operator {
    constructor() {
        super(2, "*")
    }

    /**
     *
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    expr(left, right) {
        return left * right
    }
}

export class Divider extends Operator {
    constructor() {
        super(2, "/")
    }

    /**
     *
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    expr(left, right) {
        return left / right
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
     * @return {number}
     */
    expr(_, __) {
        return parseFloat(this.value)
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
        if (value === undefined) throw new Error(`Undefined key ${key}.`)
        if (typeof value === "string") throw new TypeError(`Variable ${key} is not number.`)
        return value
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
     * @return {number}
     */
    expr(table, _) {
        return safeGet(table)(this.value)
    }

}
