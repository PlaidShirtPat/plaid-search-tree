/**
 * Code in this module is based on the red-black tree implementation outlined 
 * in Introduction to Algorithms 3rd Edition, chapter 13
 * 
 * most comments are my rephrasing of the book's definitions in order to aid 
 * my understanding
 */

const RED_NODE    = 0,
      BLACK_NODE  = 1

class PlaidNode {
  constructor(key, value) {
    this.key    = key
    this.value  = value
    this.left   = null
    this.right  = null
    this.p      = null
    this.color  = null
  }
}

class PlaidSearchTree {

  constructor(opts = {}) {
    this.root = null
  }

  insert(node) {
    // the tree starts without a root node, the first node inserted becomes the 
    // original root node of the tree
    if(this.root === null) {
      node.color  = BLACK_NODE
      node.left   = null
      node.right  = null
      node.p      = null
      this.root   = node
    }
  }

  /* trivial function defined for sake of readability */
  isRoot(node) {
    return node.p === null
  }

  static isBlack(node) {
    return node.color === BLACK_NODE
  }

  static isRed(node) {
    return node.color === RED_NODE
  }

  /* based on logic on pg 313 */
  leftRotate(node) {
    if(node.right === null)
      throw new Error('leftRotate attempted on node without right child')

    // grab node that will become the new parent of node
    let newP = node.right   
    
    // node will become the left child of newP, node adopts newP's old left child
    node.right = newP.left  
    // complete the adoption of newP.left (if newP.left is non-null)
    // in the book, it references node.right as newP.left, I wonder why
    if(node.right !== null)
      node.right.p = node

    // newP 'adopts' node's parent as it's own parent
    newP.p = node.p

    // if node was the root of the tree, newP becomes the new root
    if(this.isRoot(node)) {
      this.root = newP
    }
    // if node was not the root, we must have node's parent adopt newP
    // handle node being node.p's left child
    else if(node.p.left === node) {
      node.p.left = newP
    } 
    // handle node being node.p's right child
    else {
      node.p.right = newP
    }
  
    // newP finally adopts node as it's left child
    newP.left = node
    node.p = newP
  }

  rightRotate(node) {
    if(node.left === null)
      throw new Error('rightRotate attempted on node without left child')

    // grab node that will become the new parent of node
    let newP = node.left   
    
    // node will become the right child of newP, node adopts newP's old right child
    node.left = newP.right  
    // complete the adoption of newP.right (if newP.right is non-null)
    // in the book, it references node.left as newP.right, I wonder why
    if(node.left !== null)
      node.left.p = node

    // newP 'adopts' node's parent as it's own parent
    newP.p = node.p

    // if node was the root of the tree, newP becomes the new root
    if(this.isRoot(node)) {
      this.root = newP
    }
    // if node was not the root, we must have node's parent adopt newP
    // handle node being node.p's right child
    else if(node.p.right === node) {
      node.p.right = newP
    } 
    // handle node being node.p's left child
    else {
      node.p.left = newP
    }
  
    // newP finally adopts node as it's right child
    newP.right = node
    node.p = newP
  }

  inOrderWalk(node) {
  }

  /* helper function to convert tree into an array of rows */
  static _toRows(rootNode) {
    let level     = 0
    let rows      = []
    let currQueue = [] // holds current row's nodes
    let nextQueue = [] // hold's current row's children

    // push first node
    currQueue.push(rootNode)

    // collect rows - Breadth First Traversal non-recursive
    while(currQueue.length > 0 && !currQueue.every(e => e === null)) {
       
      rows[level] = []

      // queue children unless every child is null
      while(currQueue.length > 0 ) {
        let node = currQueue.shift()
        rows[level].push(node)
        // fill gaps with nulls
        if(node === null) {
          nextQueue.push(null)
          nextQueue.push(null)
        } else {
          nextQueue.push(node.left)
          nextQueue.push(node.right)
        }
      }
      // swap empty currQueue with nextQueue
      let tmp = currQueue
      currQueue = nextQueue
      nextQueue = tmp
      // increment level
      level++
    }

    return rows
  }

  toRows() {
    return PlaidSearchTree._toRows(this.root)
  }

  /*
  truncates keys to 3 chars

  indent          graph
   V                V
  14|              hhh
   6|      ddd             lll
   2|  bbb     fff     jjj     nnn
   0|aaa ccc eee ggg iii kkk mmm ooo
  */
  prettyPrint() {
    let rows    = this.toRows()
    let levels  = rows.length
    let keyLen  = 3
    let str = ""
    let space = " "

    for(let i=0; i < levels; i++) {
      let row = rows[i]
      let height = levels-i
      // the indent is equal to the 2^X where X = row's height
      let rowIndent   = Math.pow(2, height) - Math.ceil(keyLen/2)
      // the offset is equal to the last row's indent - 1
      let nodeOffset  = Math.pow(2, height+1) - Math.ceil(keyLen/2) - 1
      let nodeSeperator = space.repeat(nodeOffset)
      
      // write row
      str += space.repeat(rowIndent)
      for(let j=0; j < row.length; j++) {
        let node = row[j]

        let prettyKey 
        if(node !== null) {
          prettyKey = node.key
            .padEnd(keyLen)       // ensure key length is at least keyLen chars
            .substring(0, keyLen) // truncate key to keyLen
        } else {
          prettyKey = space.repeat(keyLen)
        }

        str += prettyKey
        str += nodeSeperator
      }
      str += '\n'
    }

    return str
  }

  remove(value) {
  }

  max() {
  }

  min() {
  }

  predecessor(value) {
  }

  search(value) {
  }

  successor(value) {
  }

}

module.exports = {PlaidNode, PlaidSearchTree}
