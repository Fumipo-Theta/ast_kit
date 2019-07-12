export default class BinaryTree {
    constructor(value, left, right) {
        this._value = value
        this._left = left
        this._right = right
    }

    get value() {
        return this._value
    }

    get left() {
        return this._left
    }

    get right() {
        return this._right
    }

}
