import { GroupStartToken, GroupEndToken } from "./grouper_tokens"

export class VariableStartParenthis extends GroupStartToken {
    constructor(symbol) {
        super(symbol)
    }
}

export class VariableEndParenthis extends GroupEndToken {
    constructor(symbol) {
        super(symbol)
    }
}
