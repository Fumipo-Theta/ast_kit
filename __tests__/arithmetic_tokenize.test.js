import tokenizer from "../src/arithmetic/primitive/tokenizer"
import { BraceStart, BraceEnd } from "../src/token/brace_tokens"
import { Adder, Subtractor, Multiplier, Divider, Num, Variable } from "../src/arithmetic/primitive/tokens"

import concatTokens from "../src/token/concat_tokens"
import rearrangeTokens from "../src/arithmetic/rearrange_tokens_to_RPN"


describe('tokenizer("(-4+3) * (x - y) - z / 5")', () => {
    const expression = "(-4+3) * (x - y) - z / 5"
    const expectedTokens = [
        new BraceStart("("),
        new Num("-1"),
        new Multiplier("*"),
        new Num("4"),
        new Adder("+"),
        new Num("3"),
        new BraceEnd(")"),

        new Multiplier("*"),

        new BraceStart("("),
        new Variable("x"),
        new Subtractor("-"),
        new Variable("y"),
        new BraceEnd(")"),

        new Subtractor("-"),
        new Variable("z"),
        new Divider("/"),
        new Num("5")
    ]

    const expectedRPNizedTokens = [
        new Num("-1"),
        new Num("4"),
        new Multiplier("*"),
        new Num("3"),
        new Adder("+"),
        new Variable("x"),
        new Variable("y"),
        new Subtractor("-"),
        new Multiplier("*"),
        new Variable("z"),
        new Num("5"),
        new Divider("/"),
        new Subtractor("-"),
    ]

    const tokens = tokenizer(expression)
    describe("when tokenized", () => {

        it("should be tokenized", () => {
            expect(tokens).toEqual(expectedTokens)
        })

        it("shoud be serialized as (-1*4+3)*(x-y)-z/5", () => {
            expect(concatTokens(tokens)).toBe("(-1*4+3)*(x-y)-z/5")
        })
    })

    describe("Convert tokens to RPN order", () => {
        const rpnizedTokens = rearrangeTokens(tokens)
        it("should be reorder by RPN order", () => {
            expect(rpnizedTokens).toEqual(expectedRPNizedTokens)
        })

        it("should be seriarized as -1 4 * 3 + x y - * z 5 / -", () => {
            expect(concatTokens(rpnizedTokens, " ")).toBe("-1 4 * 3 + x y - * z 5 / -")
        })
    })

})

describe("tokenizer('({x/y}+1)*5')", () => {
    it("should be", () => {
        expect(tokenizer('({x/y}+1) * 5')).toEqual([
            new BraceStart("("),
            new Variable("x/y"),
            new Adder("+"),
            new Num("1"),
            new BraceEnd(")"),
            new Multiplier("*"),
            new Num("5"),
        ])
    })
})

describe("tokenizer('({-x/y}+1)*5')", () => {
    it("should be", () => {
        expect(tokenizer('({-x/y}+1) * 5')).toEqual([
            new BraceStart("("),
            new Variable("-x/y"),
            new Adder("+"),
            new Num("1"),
            new BraceEnd(")"),
            new Multiplier("*"),
            new Num("5"),
        ])
    })
})

describe("tokenizer('4+-3')", () => {
    it("should throw SyntaxError", () => {
        expect(() => { tokenizer('4+-3') }).toThrowError(SyntaxError)
    })
})

describe("tokenizer('(4-3')", () => {
    it("should throw SyntaxError", () => {
        expect(() => { tokenizer('(4-3') }).toThrowError(SyntaxError)
    })
})

describe("tokenizer('(4-3))')", () => {
    it("should throw SyntaxError", () => {
        expect(() => { tokenizer('(4-3))') }).toThrowError(SyntaxError)
    })
})
