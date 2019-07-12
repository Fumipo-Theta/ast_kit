import * as tokens from "./tokens"
import syntax_rule from "./syntax_rule"
import interpreter from "./interpreter"
import generateTokenizer from "../generate_tokenizer"
import postInterpretNumberAndVariable from "../post_interpret_number_and_variable"
import checkSyntaxError from "../syntax_checker"

const tokenizer = generateTokenizer(syntax_rule, interpreter, postInterpretNumberAndVariable(tokens), checkSyntaxError)

export default tokenizer
