import AST from "../../ast"
import parser from "./parser"
import evaluator from "../evaluator"

export default class PrimitiveAST extends AST {
    constructor(preprocessor) {
        super(parser, evaluator, preprocessor)
        return this
    }

    evaluate(...arg) {
        return super.evaluate(...arg)

    }
}
