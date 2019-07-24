import Operator from "../../token/operator_token"
import Operand from "../../token/operand_token"
import VariableTable from "../../variable_table"
import { IVariable } from "../i_tokens"

const add = (mx, my) => mx + my

export class Adder extends Operator {
    constructor() {
        super(add, 1, "+")
    }
}


export class Literal extends Operand {
    constructor(value) {
        super(value)
    }

    /**
     * @return {() => string}
     */
    expr() {
        return () => this.value
    }

    static match(str) {
        return true
    }

}


/**
 *
 * @param {VariableTable} table
 * @return {string=>string}
 */
function safeGet(table) {
    return function (key) {
        const value = table.get(key)
        if (value === undefined) throw new Error(`Undefined key ${key}.`)
        return value
    }
}

export class Variable extends IVariable {
    constructor(value) {
        super(value)
    }

    /**
     *
     * @return {() => number}
     */
    expr(table) {
        return () => safeGet(table)(this.value)
    }

}

export class IgnoreToken {
    static match(token) {
        return false
    }
}
