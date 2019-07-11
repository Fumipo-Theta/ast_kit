import { BinaryTree } from "./binary_tree.js"
import { EmptyNode } from "./empty_node.js"
import { TableNode } from "./table_node.js"

/**
 * @parameter {BinaryTree} treeRoot
 * @return {Array<Array<string>}
 */
export default function treeToString(treeRoot) {

    function collectLeafValue(nodes, acc = [], depth = 0) {
        if (nodes.every(node => len(node) === 0)) return acc
        //console.log(nodes)
        acc[depth] = nodes.map(nodePair => nodePair.map(node => node.value.value).filter(v => v != undefined))
        const nextNodes = nodes.map(
            nodePair => nodePair.map(
                node => (node instanceof BinaryTree)
                    ? [node.left, node.right]
                        .filter(node => !(node instanceof EmptyNode) | (node instanceof TableNode))
                    : [[]]
            )

        ).reduce((acc, e) => [...acc, ...e], [])
        //console.log(nextNodes)
        //console.log(acc)

        return collectLeafValue(nextNodes, acc, depth + 1)
    }

    return collectLeafValue([[treeRoot]])//.map(tokens=>tokens.reduce((acc,e)=>acc+" "+e,"")).reduce((acc,e)=>acc+"\n"+e)
}
