// 그래프 최단거리 계산
const util = require('util')
const PriorityQueue = require("./priorityQueue");

class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex) {
        if ( !this.adjacencyList[vertex] ) {
            this.adjacencyList[vertex] = [];
        }
    }
    addEdge(vertex1, vertex2, weight) {
        if ( !this.adjacencyList[vertex1] || !this.adjacencyList[vertex2] ) {
            throw new Error('Invalid Vertex');
        }
        if ( this.adjacencyList[vertex1].indexOf(vertex2) < 0 ) {
            this.adjacencyList[vertex1].push({node: vertex2, weight });
            this.adjacencyList[vertex2].push({node: vertex1, weight });
        } 
    }
    dijkstra(start, end) {
        if ( !this.adjacencyList[start] || !this.adjacencyList[end] ) {
            throw new Error('Invalid Vertex');
        }
        const answer = [];
        // 우선순위 큐 생성
        const priorityQueue = new PriorityQueue();
        const distance = {};
        const previous = {};
        // 객체 세팅
        for ( const [ key ] of Object.entries( this.adjacencyList ) ) {
            previous[key] = '';
            if ( key === start ) {
                distance[key] = 0;
                priorityQueue.enqueue( key, 0 );
            } else {
                distance[key] = Infinity;
                priorityQueue.enqueue( key, Infinity );
            }
        }
        // PQ에 대기열이 있는한 작동
        while( priorityQueue.values.length ) {
            // 한번 체크한 점은 다시 체크하지 않는다. (Q에서 제거)
            let smallest = priorityQueue.dequeue().val;
            if (smallest === end) {
                // 끝
                console.log(distance);
                console.log(previous);
                // 직전 노드를 탐색하면서, 경로 역추적
                while(previous[smallest]) {
                    answer.push(smallest);
                    smallest = previous[smallest];
                }
                answer.push(start);
                return answer;
            }
            if (smallest || distance[smallest] !== Infinity) {
                for (let neighborIndex in this.adjacencyList[smallest]) {
                    // 인접 노드 검사
                    const nextNode = this.adjacencyList[smallest][neighborIndex];
                    const candidate = distance[smallest] + nextNode.weight;
                    const nextNeighbor = nextNode.node;
                    // 기존 거리 vs 현재 노드에서 측정된 거리 를 계산해, 현재거리가 짧으면 정보 갱신! (최단거리 계산)
                    if ( candidate < distance[nextNode.node]) {
                        // updating new smallest distance to neighbor
                        distance[nextNeighbor] = candidate;
                        // updating previous ~ how we got to neighbor
                        previous[nextNeighbor] = smallest;
                        // enqueue in PQ with new priority
                        priorityQueue.enqueue(nextNeighbor, candidate);
                    }
                }
            }
            // 결과
            console.log('@@', smallest, distance, '\n', previous, '\n', '@@')
        }
    }
}

const wg = new WeightedGraph();
// 기본 기능
wg.addVertex('A');
wg.addVertex('B');
wg.addVertex('C');
wg.addVertex('D');
wg.addVertex('E');
wg.addVertex('F');
wg.addEdge('A', 'B', 4);
wg.addEdge('A', 'C', 2);
wg.addEdge('B', 'E', 3);
wg.addEdge('C', 'D', 2);
wg.addEdge('C', 'F', 4);
wg.addEdge('D', 'E', 3);
wg.addEdge('D', 'F', 1);
wg.addEdge('E', 'F', 1);
console.log(util.inspect(wg, {showHidden: false, depth: null}))
console.log(
    wg.dijkstra('A', 'E')
)
