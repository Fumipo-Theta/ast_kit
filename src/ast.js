import VariableTable from "./variable_table.js"

export default class AST {
    constructor(parser, evaluator, preprocessor = a => a) {
        this._preprocessor = preprocessor
        this._parser = parser
        this._evaluator = evaluator
        this._tree
        this._variableTable = new VariableTable()
        this._variableUpdator = this._variableTable.getUpdator()
        return this
    }

    parse(expression) {
        this._tree = this._parser(this._variableTable)(this._preprocessor(expression))
        return this
    }

    evaluate(variableTable) {
        if (variableTable != undefined) this._variableUpdator(variableTable)
        return this._evaluator(this.tree)
    }

    get tree() {
        return this._tree
    }
}
