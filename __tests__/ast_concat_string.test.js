import AST from "../src/arithmetic/concat_string/ast"

describe("new AST().parse('Hello +{name}+ !')", () => {
    const ast = new AST().parse("Hello +{name}+ !")

    describe(".evaluate({name:'world'})", () => {
        it("should be 'Hello world !'", () => {
            expect(ast.evaluate({ name: 'world' })).toBe('Hello world !')
        })
    })
})
