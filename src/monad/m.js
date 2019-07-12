// join: M[M[a]] -> M[a]
const join = mma => !(mma.value() instanceof Monad) ?
    mma :
    join(mma.value())



export default M = {
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
