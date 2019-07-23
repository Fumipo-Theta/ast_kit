import { GroupStartToken, GroupEndToken } from "./grouper_tokens"

export class BraceStart extends GroupStartToken {
    constructor(symbol) {
        super(symbol)
    }
}

export class BraceEnd extends GroupEndToken {
    constructor(symbol) {
        super(symbol)
    }
}
