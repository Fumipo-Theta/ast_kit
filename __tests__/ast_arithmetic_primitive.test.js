import AST from "../src/ast"
import parser from "../src/arithmetic/primitive/parser"
import evaluator from "../src/arithmetic/evaluator"

describe("new AST().parse((1-4) * (3-7) / x)", () => {
    const ast = new AST(parser, evaluator).parse("(1-4) * (3-7) / x")

    describe(".evaluate({})", () => {
        it("should raise Error because of undefined key", () => {
            expect(() => { ast.evaluate({}) }).toThrowError(Error)
        })
    })

    describe(".evaluate({x:0})", () => {
        it("should be (1 - 4) * (3 - 7) / 0 = Infinity", () => {
            expect(ast.evaluate({ x: 0 })).toBe(Infinity)
        })
    })

    describe(".evaluate({x:1})", () => {
        it("should be (1 - 4) * (3 - 7) / 1 = 2", () => {
            expect(ast.evaluate({ x: 1 })).toBe((1 - 4) * (3 - 7) / 1)
        })
    })

    describe(".evaluate({x:2})", () => {
        it("should be (1 - 4) * (3 - 7) / 2 = 6", () => {
            expect(ast.evaluate({ x: 2 })).toEqual((1 - 4) * (3 - 7) / 2)
        })
    })

    describe(".evaluate({x:'a'})", () => {
        it("should raise TypeError", () => {
            expect(() => { ast.evaluate({ x: 'a' }) }).toThrowError(TypeError)
        })
    })
})
