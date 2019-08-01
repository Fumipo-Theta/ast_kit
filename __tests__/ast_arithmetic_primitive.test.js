import AST from "../src/arithmetic/primitive/ast"

describe("new AST().parse((1-4) * (3-7) / x)", () => {
    const ast = new AST().parse("(1-4) * (3-7) / x")

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

describe("new AST.parse('({x/y} + 1) * 5')", () => {
    const ast = new AST().parse('({x/y} + 1) * 5')

    describe("ast.evaluate({'x/y' : 2})", () => {
        it("should be (2 + 1) * 5 = 15", () => {
            expect(ast.evaluate({ 'x/y': 2 })).toBe(15)
        })
    })
})

describe("new AST.parse('2/3*2/4')", () => {
    const ast = new AST().parse('2/3*2/4')

    describe("ast.evaluate()", () => {
        it("should be 1/3", () => {
            expect(ast.evaluate({})).toBe(1 / 3)
        })
    })
})
