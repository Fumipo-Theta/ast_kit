import { M, Monad } from "./monad"

export class Maybe extends Monad {
    constructor(a) {
        super(a)
    }

    static return(a) {
        return (a == undefined || a == null) ?
            Nothing.return() :
            Just.return(a);
    }

    apply(mf) {
        return !(mf instanceof Just) ?
            Nothing.return() :
            M.apply(mf)(this);
    }


}

// Just
export class Just extends Maybe {
    constructor(a) {
        super(a)
    }


    static return(a) {
        return new Just(a);
    }
}

// Nothing
export class Nothing extends Maybe {
    constructor(a) {
        super(a)
    }

    static return(_) {
        return new Nothing(_);
    }


    // apply: Maybe[a -> b] -> Maybe[a] -> Nothing
    apply(_) {
        return this;
    }

    bind(_) {
        return this;
    }

    fmap(_) {
        return this;
    }
}

// Raise exception
export class Raise extends Maybe {
    constructor(e) {
        super(e)
    }

    static return(e) {
        return new Raise(e)
    }

    apply(_) {
        return this
    }

    bind(_) {
        return this
    }

    fmap(_) {
        return this
    }
}
