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

  constructor(opts) {
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
    while( ) {
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
    if(this.isRoot(node.p)) {
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
  }

  inOrderWalk(node) {
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
