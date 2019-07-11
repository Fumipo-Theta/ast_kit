import VariableTable from "./variable_table.js"

export default class AST {
    constructor(parser) {
        this._parser = parser
        this._tree
        this._variableTable = new VariableTable()
        this._variableUpdator = this._variableTable.getUpdator()
        return this
    }

    parse(expression) {
        this._tree = this._parser(this._variableTable)(expression)
        return this
    }

    evaluate(variableTable) {
        if (variableTable != undefined) this._variableUpdator(variableTable)
        return this.tree.evaluate()
    }

    get tree() {
        return this._tree
    }
}
