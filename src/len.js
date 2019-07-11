/**
 * @parameter {Array | Map | Object} collection
 * @return {number}
 */
export default function len(collection) {
    if (collection.hasOwnProperty("length")) {
        return collection.length
    }
    if (collection.hasOwnProperty("size")) {
        return collection.size
    }
    if (collection instanceof Object) {
        return Object.keys(collection).length
    }
}
