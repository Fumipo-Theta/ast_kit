import Operand from "./operand_token.js"
import VariableTable from "../variable_table.js"
import { Just, Nothing, Raise } from "../monad/maybe"

function getFromCollection(table, key) {
    if (table instanceof Map) return table.get(key)
    if (table instanceof VariableTable) return table.get(key)
    if (table instanceof Object) return table[key]
}

function safeGet(table) {
    return function (key) {
        const value = getFromCollection(table, key)
        if (value === undefined) return Raise.return(new Error(`Undefined key ${key}.`))
        if (typeof value === "string") return Raise.return(new TypeError(`Variable ${key} is not number.`))
        return Just.return(value)
    }
}

export default class Variable extends Operand {
    constructor(value) {
        super(value)
    }

    expr(table, _) {
        return safeGet(table)(this.value)
    }

}
