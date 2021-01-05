class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex) {
        if ( !this.adjacencyList[vertex] ) {
            this.adjacencyList[vertex] = [];
        }
    }
    addEdge(vertex1, vertex2) {
        if ( !this.adjacencyList[vertex1] || !this.adjacencyList[vertex2] ) {
            throw new Error('Invalid Vertex');
        }
        if ( this.adjacencyList[vertex1].indexOf(vertex2) < 0 ) {
            this.adjacencyList[vertex1].push( vertex2 );
            this.adjacencyList[vertex2].push( vertex1 );
        }
    }
    removeEdge(vertex1, vertex2) {
        if ( !this.adjacencyList[vertex1] || !this.adjacencyList[vertex2] ) {
            throw new Error('Invalid Vertex');
        }
        // 또는 .filter로 한방에 처리할 수도 있다!
        const v2IndexInV1 = this.adjacencyList[vertex1].indexOf(vertex2);
        const v1IndexInV2 = this.adjacencyList[vertex2].indexOf(vertex1);
        if ( v2IndexInV1 < 0 || v1IndexInV2 < 0 ) {
            throw new Error('Invalid Edge');
        }
        this.adjacencyList[vertex1].splice( v2IndexInV1, 1 );
        this.adjacencyList[vertex2].splice( v1IndexInV2, 1 );
    }
    removeVertex(vertex) {
        if ( !this.adjacencyList[vertex] ) {
            throw new Error('Invalid Vertex');
        }
        this.adjacencyList[vertex].forEach(ele => {
            if ( !this.adjacencyList[ele] ) {
                throw new Error('Invalid Vertex');
            }
            this.adjacencyList[ele] = this.adjacencyList[ele].filter( ele2 => ele2 !== vertex );
        });
        delete this.adjacencyList[vertex];
    }
    // DFS 순회
    depthFirstRecursive(start) {
        const result = [];
        const visited = {};
        // this 함수내 컨텍스트 오류로 변수로 선언
        const adjacencyList = this.adjacencyList;
        (function recur(vertex) {
            if ( !vertex ) {
                return null;
            }
            // 방문된 곳은 건너뜀
            if ( !visited[vertex] ) {
                result.push(vertex);
                visited[vertex] = true;
                // 결과값에 넣고 바로 다음것 탐색후 집어 체크 & 집어넣음 -> DFS
                adjacencyList[vertex].forEach( neighbor => {
                    return recur( neighbor );
                })
            }
        })(start);
        console.log(result);
        return result;
    }
    depthFirstStack(start) {
        const result = [];
        const visited = {[start]: true};
        const stack = [ start ];
        let target;
        while( stack.length ) {
            target = stack.pop();
            result.push( target );
            this.adjacencyList[target].forEach( ele => {
                if ( !visited[ele] ) {
                    visited[ele] = true;
                    stack.push(ele);
                }
            });
        }
        console.log(result);
        return result;
    }
    breadthFirstQueue(start) {
        const result = [];
        const visited = {[start]: true};
        const queue = [ start ];

        let target;
        while(queue.length) {
            console.log(queue, '@')
            target = queue.shift();
            result.push(target);
            this.adjacencyList[target].forEach( ele => {
                if ( !visited[ele] ) {
                    visited[ele] = true;
                    queue.push(ele);
                }
            })
        }
        console.log(result);
        return result;
    }
}

const g = new Graph();
// 기본 기능
// g.addVertex('test1');
// g.addVertex('test2');
// g.addVertex('test3');
// g.addEdge('test1', 'test2');
// g.addEdge('test1', 'test3');
// g.addEdge('test2', 'test3');
// console.log('add', g);
// g.removeVertex('test1');
// console.log('remove', g);

// DFS
g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');
g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('B', 'D');
g.addEdge('C', 'E');
g.addEdge('D', 'E');
g.addEdge('D', 'F');
g.addEdge('E', 'F');
console.log(g);
// g.depthFirstRecursive('A');
// g.depthFirstStack('A');
g.breadthFirstQueue('A');