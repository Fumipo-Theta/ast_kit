import AST from "../../ast"
import parser from "./parser"
import evaluator from "../evaluator"

export default class MonadicAST extends AST {
    constructor(preprocessor) {
        super(parser, evaluator, preprocessor)
        return this
    }
}
