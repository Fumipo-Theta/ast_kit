import Operand from "./operand_token.js"
import VariableTable from "../variable_table.js"

export default class Variable extends Operand {
    constructor(value) {
        super(value)
    }

    expr(table, _) {
        if (table instanceof Map) return table.get(this.value)
        if (table instanceof VariableTable) return table.get(this.value)
        if (table instanceof Object) return table[this.value]
    }

}
