import Operator from "./operator_token.js"

export class Adder extends Operator {
    constructor() {
        super(1, "+")
    }

    expr(left, right) {
        return left + right
    }
}

export class Subtractor extends Operator {
    constructor() {
        super(1, "-")
    }

    expr(left, right) {
        return left - right
    }
}

export class Multiplier extends Operator {
    constructor() {
        super(2, "*")
    }

    expr(left, right) {
        return left * right
    }
}

export class Divider extends Operator {
    constructor() {
        super(2, "/")
    }

    expr(left, right) {
        return left / right
    }
}
