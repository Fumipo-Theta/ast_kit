import MonadicAST from "../src/arithmetic/maybe/ast"
import { Just, Nothing, Raise } from "../src/monad/maybe"

describe("new AST().parse((1-4) * (3-7) / x)", () => {
    const ast = new MonadicAST().parse("(1-4) * (3-7) / x")

    describe(".evaluate({})", () => {
        it("should raise Error because of undefined and be Raise.return()", () => {
            expect(ast.evaluate({})).toBeInstanceOf(Raise)
        })
    })

    describe(".evaluate({x:0})", () => {
        it("should be (1 - 4) * (3 - 7) / 0 = Nothing.return()", () => {
            expect(ast.evaluate({ x: 0 })).toEqual(Nothing.return())
        })
    })

    describe(".evaluate({x:1})", () => {
        it("should be (1 - 4) * (3 - 7) / 1 = Just.return(12)", () => {
            expect(ast.evaluate({ x: 1 })).toEqual(Just.return((1 - 4) * (3 - 7) / 1))
        })
    })

    describe(".evaluate({x:2})", () => {
        it("should be (1 - 4) * (3 - 7) / 2 = Just.return(6)", () => {
            expect(ast.evaluate({ x: 2 })).toEqual(Just.return((1 - 4) * (3 - 7) / 2))
        })
    })

    describe(".evaluate({x:'a'})", () => {
        it("should raise TypeError and be Raise.return()", () => {
            expect(ast.evaluate({ x: "a" })).toBeInstanceOf(Raise)
        })
    })


})

describe("new AST('({x/y} + 1) * 5')", () => {
    const ast = new MonadicAST().parse('({x/y} + 1) * 5')

    describe("ast.evaluate({'x/y' : 2})", () => {
        it("should be (2 + 1) * 5 = Just.return(15)", () => {
            expect(ast.evaluate({ 'x/y': 2 })).toEqual(Just.return(15))
        })
    })
})
