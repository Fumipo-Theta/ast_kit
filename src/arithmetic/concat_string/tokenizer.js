import syntax_rule from "./syntax_rule"
import interpreter from "./interpreter"
import generateTokenizer from "../generate_tokenizer"
import checkSyntaxError from "../syntax_checker"

const tokenizer = generateTokenizer(syntax_rule, interpreter, checkSyntaxError)

export default tokenizer
