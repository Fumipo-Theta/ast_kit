import { Adder, Subtractor, Multiplier, Divider } from "../src/arithmetic/maybe/tokens"
import { Just, Nothing } from "../src/monad/maybe"

const two = Just.return(2)
const three = Just.return(3)
const zero = Just.return(0)

describe("Arithmetic token test", () => {
    describe("Adder token expr test", () => {
        describe("adder.expr(2,3)", () => {
            it("should be 2 + 3 = Just.return(5)", () => {
                const adder = new Adder("+")
                expect(adder.expr()(two, three)).toEqual(Just.return(5))
            })
        })
    })

    describe("Subtractor token expr test", () => {
        describe("subtractor.expr(2,3)", () => {
            it("should be 2 - 3 = Just.return(-1)", () => {
                const subtractor = new Subtractor("-")
                expect(subtractor.expr()(two, three)).toEqual(Just.return(-1))
            })
        })
    })

    describe("Multiplier token expr test", () => {
        describe("multiplier.expr(2,3)", () => {
            it("should be 2 * 3 = Just.return(6)", () => {
                const multiplier = new Multiplier("*")
                expect(multiplier.expr()(two, three)).toEqual(Just.return(6))
            })
        })
    })

    describe("Divider token expr test", () => {
        describe("divider.expr(2,3)", () => {
            it("should be 2 / 3 = Just.return(0.66666...)", () => {
                const divider = new Divider("/")
                expect(divider.expr()(two, three)).toEqual(Just.return(2 / 3))
            })
        })

        describe("divider.expr(2,0)", () => {
            it("should be 2 / 0 = Nothing.return()", () => {
                const divider = new Divider("/")
                expect(divider.expr()(two, zero)).toEqual(Nothing.return())
            })
        })
    })
})
