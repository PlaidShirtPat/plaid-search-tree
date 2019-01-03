const {PlaidNode, PlaidSearchTree} = require('./PlaidSearchTree')


let myTree = new PlaidSearchTree()

myTree.root = new PlaidNode("ddd", "d")
myTree.root.left = new PlaidNode("bbb", "b")
myTree.root.left.p = myTree.root
myTree.root.left.left = new PlaidNode("aaa", "a")
myTree.root.left.left.p = myTree.root.left
myTree.root.left.right = new PlaidNode("ccc", "b")
myTree.root.left.right.p = myTree.root.left
myTree.root.right = new PlaidNode("fff", "f")
myTree.root.right.p = myTree.root
myTree.root.right.left = new PlaidNode("eee", "e")
myTree.root.right.left.p = myTree.root.right
myTree.root.right.right = new PlaidNode("ggg", "g")
myTree.root.right.right.p = myTree.root.right

console.log(myTree.prettyPrint())
