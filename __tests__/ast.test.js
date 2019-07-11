import AST from "../src/ast"
import parser from "../src/arithmetic/parser"

describe("new AST().parse((1-4) * (3-7) / x)", () => {
    const ast = new AST(parser).parse("(1-4) * (3-7) / x")

    describe(".evaluate({x:1})", () => {
        it("should be (1 - 4) * (3 - 7) / 1 = 12", () => {
            expect(ast.evaluate({ x: 1 })).toBe((1 - 4) * (3 - 7) / 1)
        })
    })

    describe(".evaluate({x:2})", () => {
        it("should be (1 - 4) * (3 - 7) / 2 = 6", () => {
            expect(ast.evaluate({ x: 2 })).toBe((1 - 4) * (3 - 7) / 2)
        })
    })
})
