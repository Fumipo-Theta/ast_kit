/**
 *
 * @param {Object<string, (...any) => Token} syntax
 * @return {(acc:Array<Token>, e: Token) => Array<Token>}
 */
function generateToken(syntax) {
    return (acc, token) => {
        if (!syntax[token]) return [...acc, syntax.default(token)]
        return [...acc, syntax[token](token)]
    }
}


/**
 * @param {Object<string, (...any) => Token}
 * @param {(acc:Array<Token>, e: Token) => Array<Token>} interpreter
 * @param {Token => Token} postprocessor
 * @param {Array<Token> => Array<Token>} syntax_error_check
 * @return {string => Array<Token>}
 */
export default function generateTokenizer(syntax_rule, interpriter, postprocessor = e => e, syntax_error_check = e => e) {
    return function tokenize(expression) {
        return syntax_error_check(
            expression.split("")
                .reduce(generateToken(syntax_rule), [])
                .reduce(interpriter, { mode: "", tokens: [] })["tokens"]
                .map(postprocessor)
        )
    }
}
