class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
/* 
stack: 배열 or 연결리스트로 만들 수 있음
    링크드리스트 활용한 경우, 앞에서 넣고 뺴는게 훨씬 효율적이다.
    tail은 끝까지 돌아서 찾아야 하므로...

    삽입 - O(1)
    제거 - O(1)
    서칭 - O(N)
    접근 - O(N)

    함수 호출스택 / 실행, 실행취소, 다시실행 / 라우팅(페이지 뒤로, 앞으로) ..에 쓰임
*/
class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    push(value) {
        const newNode = new Node( value );
        if ( !this.first ) {
            this.first = newNode;
            this.last = newNode;
        } else {
            newNode.next = this.first;
            this.first = newNode;
        }
        this.size++;
        return this;
    }
    pop() {
        if ( !this.first ) {
            return null;
        }
        let popedNode = this.first;
        this.first = this.first.next;
        this.size--;
        if ( !this.size ) {
            this.last = null;
        }
        console.log(popedNode)
        return popedNode;
    }
}

// const stack = new Stack();
// stack.push(1).push(2).push(3);
// console.log(stack)
// stack.pop();
// stack.pop();
// stack.pop();
// stack.pop();
// console.log(stack)

/* 
queue: 배열 or 연결리스트로 만들 수 있음
    링크드리스트 활용한 경우, 앞에서부터 지우고, 넣을때 뒤로 넣는게 조금 더 효율적이다.
    tail은 끝까지 돌아서 찾아야 하므로...

    삽입 - O(1)
    제거 - O(1)
    서칭 - O(N)
    접근 - O(N)

    대기열 (백그라운드 작업, 리소스 업로드, 인쇄/작업 처리) ~ 순서대로 처리되는 흐름의 작업에 쓰임
*/

class Queue {
    constructor(){
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    enqueue(value) {
        // add to last
        const newNode = new Node(value);
        if ( !this.last ) {
            this.first = newNode;
        } else {
            this.last.next = newNode;
        }
        this.last = newNode;
        this.size++;
        return this;

    }
    dequeue() {
        // remove from first
        if ( !this.first ) {
            return null;
        }
        const dequeuedNode = this.first;
        this.first = this.first.next;
        this.size--;
        if ( !this.size ) {
            this.last = null;
        }
        console.log(dequeuedNode);
        return dequeuedNode;
    }
}

// const queue = new Queue();
// queue.enqueue(1).enqueue(2).enqueue(3);
// console.log(queue)
// queue.dequeue();
// queue.dequeue();
// queue.dequeue();
// queue.dequeue();
// console.log(queue)