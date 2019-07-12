# Abstruct syntax tree generator

## Toolkit of constructing AST

AST インスタンスを作成する際には, 文字列で表された式から抽象構文木を構築するparserと, 抽象構文木を評価するevaluatorを指定する.

例えばMaybeモナドを用いた算術演算式の抽象構文木においては,

```javascript
import MaybeAST from "./src/arithmetic/maybe/ast"

const ast = new MaybeAST(parser, evaluator)
ast.parse("(x-3)*(x-4)")
ast.evaluate({x:3}) // Just.return(0)
ast.evaluate({}) // Nothing.return()
```
