import Operator from "../../token/operator_token"
import Operand from "../../token/operand_token"
import VariableTable from "../../variable_table"
import { ISubtractor, IMultiplier, IVariable } from "../i_tokens"

const add = (mx, my) => mx + my
const subtract = (mx, my) => mx - my
const multiple = (mx, my) => mx * my
const divide = (mx, my) => mx / my
export class Adder extends Operator {
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

export class Divider extends Operator {
    constructor() {
        super(divide, 2, "/")
    }
}


export class Literal extends Operand {
    constructor(value) {
        super(value)
    }

    /**
     * @return {() => number}
     */
    expr() {
        return () => parseFloat(this.value)
    }

    static match(expression) {
        return expression.match(/^-?[\d]+\.?[\d]{0,}$/)
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
        if (value === undefined) throw new Error(`Undefined key ${key}.`)
        if (typeof value === "string") {
            if (isNaN(value)) throw new TypeError(`Variable ${key} is not number.`)
            try {
                return parseFloat(value)
            } catch (e) {
                throw new TypeError(`Variable ${key} is not number.`)
            }
        }
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
        return token.value.match(/\s+/)
    }
}
