/* 
tree: 부모와 자식 관계의 노트로 구성된 자료 구조

    삽입 - O(log N)
    서칭 - O(log N)
      - not guaranteed! ~ 트리가 링크드리스트처럼 한줄로 늘어선다면.. O(N)..

    HTML DOM, network routing, AI, file system, folders, JSON.. 에 쓰임
*/
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    // using recur
    insert(value, node = this.root) {
        if ( !node ) {
            this.root = new Node(value);
            return this;
        }
        if (node.value === value) {
            return undefined;
        } else if (node.value > value) {
            if ( !node.left ) {
                node.left = new Node(value);
                return this;
            }
            this.insert(value, node.left);
        } else {
            if ( !node.right ) {
                node.right = new Node(value);
                return this;
            }
            this.insert(value, node.right);
        }
    }
    // using loop
    search(value) {
        if ( !this.root ) {
            return false;
        } else if ( this.root.value === value ) {
            return this.root;
        }
        let node = this.root;
        while(1) {
            if ( node.value > value ) {
                if ( !node.left ) {
                    return false;
                }
                node = node.left;
            } else if ( node.value < value ) {
                if ( !node.right ) {
                    return false;
                }
                node = node.right;
            } else {
                return node;
            }
        }
    }
}
const tree = new BinarySearchTree();
tree.insert(10);
tree.insert(5);
tree.insert(13);
tree.insert(7);
tree.insert(2);
tree.insert(11);
tree.insert(16);
tree.insert(10);
console.log(
    tree.search(11),
    tree.search(12),
    tree.search(13),
    tree.search(2),
    
);
console.log(tree);
