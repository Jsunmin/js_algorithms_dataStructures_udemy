/* 
tree: 부모와 자식 관계의 노트로 구성된 자료 구조

    삽입 - O(log N)
    서칭 - O(log N)
      - not guaranteed! ~ 트리가 링크드리스트처럼 한줄로 늘어선다면.. O(N)..

    HTML DOM, network routing, AI, file system, folders, JSON.. 에 쓰임

    깊이 & 넓이 우선 탐색
    넓이우선: 추적할 노드가 많다. ~ 경로가 길어질수록 더 많은 복잡 공간도가 필요.. / 답에 대한 최단경로 찾기 좋음
    깊이우선: 추적할 노드수가 적다. ~ 깊이는 낮고 넓게 퍼진 경우 비효율.. / 복잡 공간도 적음(적은 메모리) 스택에서 pop push
    - 트리가 어떻게 
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
    bfs() {
        const queue = [this.root];
        const answer = [];
        while(queue.length) {
            const node = queue.shift();
            answer.push(node.value);
            if ( node.left ) {
                queue.push(node.left);
            }
            if ( node.right ) {
                queue.push(node.right);
            }
        }
        console.log(answer);
    }
    dfsTopDown() {
        // top to bottom & left to right
        const answer = [];
        recur(this.root);
        function recur(node) {
            answer.push(node.value);
            if ( node.left ) {
                recur(node.left);
            }
            if ( node.right ) {
                recur(node.right);
            }
        }
        console.log(answer);
    }
    dfsBottomUp() {
        // bottom to top  & left to right
        const answer = [];
        recur(this.root);
        function recur(node) {
            if ( node.left ) {
                recur(node.left);
            }
            if ( node.right ) {
                recur(node.right);
            }
            answer.push(node.value); // 전부 다 돌고, callstack 올라올때 값을 지정한다.
        }
        console.log(answer);
    }
    dfsLeftToright() {
        // left to right & bottom to top
        const answer = [];
        recur(this.root);
        function recur(node) {
            if ( node.left ) {
                recur(node.left);
            }
            answer.push(node.value); // 왼쪽 끝까지 돌면서 노드 1세트(삼각형구조)당 리턴
            if ( node.right ) {
                recur(node.right);
            }
        }
        console.log(answer);
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
console.log(tree);
console.log("search tree bfs & dfs...")
tree.bfs();
tree.dfsTopDown();
tree.dfsBottomUp();
tree.dfsLeftToright();
