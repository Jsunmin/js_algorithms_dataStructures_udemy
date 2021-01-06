/* 
priorityQueue: 우선순위 큐
    힙을 활용해서 만듦. 우선순위를 고려해 트리 root를 뺴는 식으로 데이터를 뺴온다!

    삽입 - O(log N)
    제거 - O(log N) ~ 부모로 넘어가면서 검색수가 절반이상씩 줄어듦
    서칭 - O(N)
      완전이진트리로 ~ 링크드리스트되는 최악의 경우도 없다!!

*/
class Node {
    constructor(val, priority) {
        this.val = val;
        this.priority = priority;
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }
    bubbleUp() {
        let index = this.values.length - 1;
        const element = this.values[index];
        while(1) {
            const parentIndex =  Math.floor( (index - 1) / 2);
            const parentElement = this.values[parentIndex];
            // 인덱스 체크는 0까지 & 신규 노드가 커야 버블링 처리!
            if ( parentIndex < 0 || this.values[parentIndex].priority <= element.priority ) {
                break;
            }
            this.values[parentIndex] = element;
            this.values[index] = parentElement;
            // 인덱스 갱신
            index = parentIndex;
        }
    }
    bubbleDown() {
        let index = 0;
        const element = this.values[index];
        while(1) {
            let swap = false;
            const lChildIndex = 2 * index + 1;
            const rChildIndex = 2 * index + 2;
            // valid check
            if ( lChildIndex >= this.values.length || rChildIndex >= this.values.length ) break;
            const lValue = this.values[lChildIndex];
            const rValue = this.values[rChildIndex];
            // swap
            if ( lValue.priority <= rValue.priority ) {
                this.values[index] = lValue;
                this.values[lChildIndex] = element;
                index = lChildIndex;
                swap = true;
            } else {
                this.values[index] = rValue;
                this.values[rChildIndex] = element;
                index = rChildIndex;
                swap = true;
            }
            if ( !swap ) break;
        }
    }
    enqueue(val, priority) {
        const newNode = new Node(val, priority)
        this.values.push(newNode);
        this.bubbleUp();
    }
    dequeue() {
        const max = this.values[0];
        const end = this.values.pop();
        if ( max === end ) {
            return end;
        }
        this.values[0]= end;
        // 마지막꺼 스왑한 결과 조정
        this.bubbleDown();
        return max;
    }
}


// const ER = new PriorityQueue();
// ER.enqueue("common cold", 5);
// ER.enqueue("gunshot wound", 1);
// ER.enqueue("high fever", 4);
// ER.enqueue("broken arm", 2);
// ER.enqueue("glass in foot", 3);
// ER.enqueue("glass in foot", 3.5);

// console.log('check1', ER.values)


// console.log('check2', ER.values)

module.exports = PriorityQueue;