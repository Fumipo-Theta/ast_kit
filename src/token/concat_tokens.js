/**
 * @parameter {Array<Token>} tokens
 * @return {string}
 */
export default function concatTokens(tokens, sep = "") {
    return tokens.map(token => token.value).reduce((acc, e) => (acc !== "") ? acc + sep + e : acc + e, "")
}
