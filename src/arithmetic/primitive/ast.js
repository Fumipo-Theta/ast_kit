import AST from "../../ast"
import parser from "./parser"
import evaluator from "../evaluator"

export default class PrimitiveAST extends AST {
    constructor() {
        super(parser, evaluator)
        return this
    }

    evaluate(...arg) {
        try {
            return super.evaluate(...arg)
        } catch (e) {
            if (e instanceof TypeError) return NaN
        }
    }
}
