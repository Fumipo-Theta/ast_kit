function generateToken(syntax) {
    return (acc, token) => {
        if (!syntax[token]) return [...acc, syntax.default(token)]
        return [...acc, syntax[token](token)]
    }
}


/**
 * @parameter {string} expression
 * @return {Array<Token>}
 */
export default function generateTokenizer(syntax_rule, interpriter, postprocessor = e => e, syntax_error_check = e => e) {
    return function tokenize(expression) {
        return syntax_error_check(
            expression.split("")
                .reduce(generateToken(syntax_rule), [])
                .reduce(interpriter, [])
                .map(postprocessor)
        )
    }
}
