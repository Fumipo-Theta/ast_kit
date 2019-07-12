function updateDict(dict, diff) {

}

function updateCollection(table, tableDiff) {

}

export default class VariableTable {
    constructor(variable_dict) {
        this._table = variable_dict
        this._length
    }

    get length() {
        return Object.keys(this._table).length
    }

    get(name) {
        return this._table[name]
    }

    getUpdator() {
        return variable_dict => {
            this._table = { ...this._table, ...variable_dict }
        }
    }
}
