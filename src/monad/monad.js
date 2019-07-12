

// join: M[M[a]] -> M[a]
const join = mma => !(mma.value() instanceof Monad) ?
    mma :
    join(mma.value())



export const M = {
    // fmap: (a -> b) -> M[a] -> M[b]
    fmap: f => ma => {
        return !(ma instanceof Monad) ?
            f(ma) :
            ma.constructor.return(f(ma.value()))
    },

    // apply: M[a -> b] -> M[a] -> M[b]
    apply: mf => ma => {
        return !(ma instanceof Monad) ?
            mf(ma) :
            (ma instanceof mf.constructor) ?
                ma.constructor.return(mf._value(ma.value())) :
                undefined
    },

    // bind: M[a] -> (a -> M[b]) -> M[b]
    bind: ma => F => {
        return !(ma instanceof Monad) ?
            F(ma) :
            join(
                ma.constructor.return(F(ma.value()))
            )
    },

    //liftA2: f => ma => mb => M.apply(M.fmap(f)(ma))(mb),

    liftA2: f => ma => mb => mb.apply(ma.fmap(f))

}



export class Monad {
    constructor(value) {
        if (typeof modifier === 'function') {
            this._modifier = value;
        } else {
            this._value = value;
        }
    }

    /** return:: a -> M[a]
     *
     * @param {*} func
     */
    static return(a) {
        return new this(a);
    }


    /** fmap:: (a -> b) -> M[a] -> M[b]
     *
     */
    fmap(f) {
        return M.fmap(f)(this)
    }

    /**applicative: M[a] -> M[a -> b] -> M[b]
     *
     */
    apply(mf) {
        return M.apply(mf)(this)
    }

    /** value:: M[a] -> a
     *
     */
    value() {
        return (this._value === undefined) ?
            undefined :
            this._value
    }

    /** bind:: M[a] -> (a -> M[b]) -> M[b]
     *
     * @param {*} func
     * @param {*} args
     */
    bind(F) {
        return M.bind(this)(F)
    }
}
