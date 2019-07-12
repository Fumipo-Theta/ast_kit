import Operator from "../token/operator_token"
import { Maybe, Just, Nothing } from "../monad/maybe"

const add = my => x => my.bind(y => Maybe.return(x + y))
const subtract = my => x => my.bind(y => Maybe.return(x - y))
const multiple = my => x => my.bind(y => Maybe.return(x * y))
const safeDivideBy = my => x => my.bind(y => y === 0 ? Nothing.return() : Just.return(x / y))
export class Adder extends Operator {
    constructor() {
        super(1, "+")
    }

    expr(left, right) {
        console.log(left, right)
        return left.bind(add(right))
    }
}

export class Subtractor extends Operator {
    constructor() {
        super(1, "-")
    }

    expr(left, right) {
        return left.bind(subtract(right))
    }
}

export class Multiplier extends Operator {
    constructor() {
        super(2, "*")
    }

    expr(left, right) {
        return left.bind(multiple(right))
    }
}

export class Divider extends Operator {
    constructor() {
        super(2, "/")
    }

    expr(left, right) {
        return left.bind(safeDivideBy(right))
    }
}
