import M from "./m"

export default class Monad {
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
