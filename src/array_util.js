/**
 * @parameter {Array<T>} array
 * @return {Array<T>}
 */
export function withoutLastOf(array) {
    return array.slice(0, array.length - 1)
}

/**
 * @parameter {Array<T>} array
 * @return T
 */
export function lastOf(array) {
    return array[array.length - 1]
}
