/** Interface Token {
 *    type: "operator" | "number" | "variable" | "brace_start" | "brace_end";
 *    priority : 0 | 1 | 2;
 *    value: string;
 * }
 */

/**
 *
 * @param {Token} _TokenCls
 * @return {Array<any> => new Token}
 */
export default function tokenFactory(_TokenCls) {
    return (...arg) => new _TokenCls(...arg)
}
