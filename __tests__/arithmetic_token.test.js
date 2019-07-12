import { Adder, Subtractor, Multiplier, Divider } from "../src/arithmetic/arithmetic_tokens"

describe("Arithmetic token test", () => {
    describe("Adder token expr test", () => {
        describe("adder.expr(2,3)", () => {
            it("should be 2 + 3 = 5", () => {
                const adder = new Adder("+")
                expect(adder.expr(2, 3)).toBe(5)
            })
        })
    })

    describe("Subtractor token expr test", () => {
        describe("subtractor.expr(2,3)", () => {
            it("should be 2 - 3 = -1", () => {
                const subtractor = new Subtractor("-")
                expect(subtractor.expr(2, 3)).toBe(-1)
            })
        })
    })

    describe("Multiplier token expr test", () => {
        describe("multiplier.expr(2,3)", () => {
            it("should be 2 * 3 = 6", () => {
                const multiplier = new Multiplier("*")
                expect(multiplier.expr(2, 3)).toBe(6)
            })
        })
    })

    describe("Divider token expr test", () => {
        describe("divider.expr(2,3)", () => {
            it("should be 2 / 3 = 0.66666...", () => {
                const divider = new Divider("/")
                expect(divider.expr(2, 3)).toBe(2 / 3)
            })
        })

        describe("divider.expr(2,0)", () => {
            it("should be 2 / 0 = Infinity", () => {
                const divider = new Divider("/")
                expect(divider.expr(2, 0)).toBe(Infinity)
            })
        })
    })
})
