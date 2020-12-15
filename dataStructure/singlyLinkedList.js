/*
단방향 연결리스트
    삽입 O(1) ~ O(N) 가운데..
    제거 O(1) ~ O(N) 가운데..
    검색 O(N)
    접근 O(N)
  - 삽입 삭제가 빈번한 배열에 적합
  - 랜덤 액세스 불가능
  - 
*/
class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    traverse() {
        let current = this.head;
        while ( current ) {
            console.log( current.val );
            current = current.next;
        }
    }
    push(val) {
        const newNode = new Node(val);
        if ( !this.head ) {
            this.head = newNode;
        } else {
            this.tail.next = newNode;
        }
        this.tail = newNode;
        this.length++;
        return this;
    }
    pop() {
        if ( !this.tail ) {
            return undefined;
        }
        let prevNode = null;
        let curNode = this.head;
        while ( curNode.next ) {
            prevNode = curNode;
            curNode = curNode.next;
        }
        this.tail = prevNode;
        // length 0인 경우 고려
        if ( this.tail ) {
            this.tail.next = null;
        } else {
            // 다 비우면 head 초기화
            this.head = null;
        }
        this.length--;
        return curNode;
    }
    shift() {
        if ( !this.head ) {
            return undefined;
        }
        const answer = this.head;
        this.head = this.head.next;
        if ( !this.head ) {
            // 다 비우면 tail도 초기화
            this.tail = null;
        }
        this.length--;
        return answer;
    }
    unshift(val) {
        const newNode = new Node(val);
        if ( !this.head ) {
            this.tail = newNode;
        }
        // null or 기존 헤드 링크
        newNode.next = this.head;
        this.head = newNode;
        this.length++;
        return this;
    }
    // index로 접근
    get(ind) {
        if ( !this.length || ind < 0 || ind + 1 > this.length ) {
            return undefined;
        }
        let answer = 0;
        let target = this.head;
        while ( target ) {
            answer++;
            target = target.next;
            if ( answer === ind ) {
                return target;
            }
        }
    }
    // 특정 index 값을 바꿔줌
    set(ind, val) {
        const target = this.get(ind);
        if ( !target ) {
            return false;
        }
        target.val = val;
        return true;
    }
    insert(ind, val) {
        if ( ind < 0 || ind + 1 > this.length ) {
            return false;
        }
        if ( !this.head || ind === 0 ) {
            // 처음에 삽입
            this.unshift(val);
        } else if ( ind + 1 === this.length ) {
            // 꼬리에 삽입
            this.push(val);
        } else {
            // 그 외 일반적인 경우
            let targetInd = 0;
            let prevNode = null;
            let curNode = this.head;
            while ( curNode ) {
                prevNode = curNode;
                curNode = curNode.next;
                targetInd++;
                if ( ind === targetInd ) break;
            }
            const newNode = new Node(val);
            prevNode.next = newNode;
            newNode.next = curNode;
            this.length++;
        }
        return true;
    }
    remove(ind) {
        if ( ind < 0 || ind + 1 > this.length ) {
            return false;
        }
        if ( !this.head || ind === 0 ) {
            // 헤드 제거
            this.shift();
        } else if ( ind + 1 === this.length ) {
            // 꼬리 제거
            this.pop();
        } else {
            // 그 외 일반적인 경우
            let targetInd = 0;
            let prevNode = null;
            let curNode = this.head;
            while ( curNode ) {
                prevNode = curNode;
                curNode = curNode.next;
                targetInd++;
                if ( ind === targetInd ) break;
            }
            prevNode.next = curNode.next;
            this.length--;
        }
        return true;
    }
    reverse() {
        let node = this.head;
        // 헤드와 테일 노드 바꿈
        this.head = this.tail;
        this.tail = node;

        /*
          노드와 노드간 화살표 방향을 차례대로 거꾸로 돌리는 로직!
          헤드부터 차례로 돌면서, prev -> cur -> next 정보 확보
          next정보 미리 확보 / cur.next = prev로 바꿔 놓고 / 다음 노드로 진입해서 반복
         */
        let next;
        let prev = null;
        for (let i = 0; i < this.length; i++) {
            console.log('be', prev, node, next)
            next = node.next; // 원래 흐름에서 다음 노드 확보
            // 여기서 노드 체인을 그 전 것으로 바꿔주는 것! (처음에는 NULL)
            node.next = prev; // 원래 흐름서 직전노드를, 리버스 후 다음 노드 처리!
            prev = node; // 원래 흐름에서 이전노드 수정
            node = next; // 다음 노드로 바꿈
            console.log('af', prev, node, next)
        }
        return this;
    }
}

let list = new SinglyLinkedList();
// console.log( 'push', list.push(1), list.length );
// console.log( 'push', list.push(2), list.length );
// console.log( 'push', list.push(3), list.length );
console.log( 'unshift', list.unshift(1), list.length );
console.log( 'unshift', list.unshift(2), list.length );
console.log( 'unshift', list.unshift(3), list.length );
console.log( 'unshift', list.unshift(4), list.length );
list.traverse();
// console.log( 'shift', list.shift(), list.length );
// console.log( 'shift', list.shift(), list.length );
// console.log( 'shift', list.shift(), list.length );
// console.log( 'shift', list.shift(), list.length );
// console.log( 'pop', list.pop(), list.length );
// console.log( 'pop', list.pop(), list.length );
// console.log( 'pop', list.pop(), list.length );
// console.log( 'pop', list.pop(), list.length );

// console.log( 'get', list.get(1) );
// console.log( 'set', list.set(1, 10), list.set(4, 10) );
// console.log( 'insert', list.insert(1, 10) );
// console.log( 'insert', list.insert(0, 20) );
// console.log( 'insert', list.insert(4, 30) );

// console.log( 'remove', list.remove(0) );
// console.log( 'remove', list.remove(4) );
// console.log( 'remove', list.remove(1) );

list.reverse();
list.traverse();
console.log(list)