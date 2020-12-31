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
}

const g = new Graph();
g.addVertex('test1');
g.addVertex('test2');
g.addVertex('test3');
g.addEdge('test1', 'test2');
g.addEdge('test1', 'test3');
g.addEdge('test2', 'test3');
console.log('add', g);
g.removeVertex('test1');
console.log('remove', g);
