/*
양방향 연결리스트
  기본적으로 O(N/2 -> N) 양방향 접근으로, 좀 더 효율을 높임.. 결국은 O(N)이지만..
    삽입 O(1) ~ O(N) 가운데..
    제거 O(1) ~ O(N) 가운데..
    검색 O(N)
    접근 O(N)
  - 삽입 삭제가 빈번한 배열에 적합
  - 랜덤 액세스 불가능
  - 직전노드에 대한 정보가 있어서, 데이터 수정이 용이함 (시간도 절반) / 그러나 추가 메모리는..
*/
class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    traverse(path = 'h') {
        if ( path === 'h' ) {
            let current = this.head;
            while ( current ) {
                console.log( current.val );
                current = current.next;
            }
        } else {
            let current = this.tail;
            while ( current ) {
                console.log( current.val );
                current = current.prev;
            }
        }
    }
    push(val) {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            newNode.prev = null; // 이전 노드 처리
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
        }
        this.length++;
        this.tail = newNode;
        return this;
    }
    pop() {
        if (!this.tail) {
            return null;
        }
        const popedNode = this.tail;
        this.tail = popedNode.prev; // tail 수정 후
        popedNode.prev = null; // pop data link 제거
        if ( this.tail ) {
            this.tail.next = null;
        }
        this.length--;
        if (!this.length) {
            this.head = null;
        }
        return popedNode;
    }
    shift() {
        if ( !this.head ) {
            return null;
        }
        const shiftedNode = this.head;
        this.head = shiftedNode.next;
        if ( this.head ) {
            this.head.prev = null; // 예전 head 기록 날림
        }
        this.length--;
        if (!this.length) {
            this.tail = null;
        }
        return shiftedNode;
    }
    unshift(val) {
        const newNode = new Node(val);
        if ( !this.head ) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }
    get(ind) {
        if ( ind < 0 || ind >= this.length ) {
            return null;
        }
        let curNode;
        if ( ind >= this.length / 2 ) {
            // from tail
            curNode = this.tail;
            let targetInd = this.length - 1;
            while ( curNode.prev ) {
                if ( targetInd === ind ) {
                    break;
                }
                curNode = curNode.prev
                targetInd--;
            }
        } else {
            // from head
            curNode = this.head;
            let targetInd = 0;
            while ( curNode.next ) {
                if ( targetInd === ind ) {
                    break;
                }
                curNode = curNode.next
                targetInd++;
            }
        }
        return curNode
    }
    set(ind, val) {
        const foundNode = this.get(ind);
        if ( foundNode ) {
            foundNode.val = val;
            return true;
        }
        return false;
    }
    insert(ind, val) {
        if ( ind === 0 ) {
            // head 작업
            this.unshift(val);
            return true;
        } else if ( ind === this.length - 1 ) {
            // tail 작업
            this.push(val);
            return true;
        } else {
            // mid 작업
            const foundNode = this.get(ind);
            if ( foundNode ) {
                const newNode = new Node(val);
                // 전노드 링크 작업 (next)
                foundNode.prev.next = newNode;
                // 새 노드 링크 작업 (prev, next)
                newNode.prev = foundNode.prev;
                newNode.next = foundNode;
                // 후노드 링크 작업 (기존 index 대상)
                foundNode.prev = newNode;
                this.length++;
                return true;
            }
        }
        return false;
    }
    remove(ind) {
        if ( ind === 0 ) {
            // head 작업
            this.shift();
            return true;
        } else if ( ind === this.length - 1 ) {
            // tail 작업
            this.pop();
            return true;
        } else {
            // mid 작업
            const foundNode = this.get(ind);
            if ( foundNode ) {
                // 전노드 링크 작업 (next)
                foundNode.prev.next = foundNode.next;
                // 후노드 링크 작업 (기존 index 대상)
                foundNode.next.prev = foundNode.prev;
                this.length--;
                return true;
            }
        }
        return false;
    }
    reverse() {
        let curNode = this.tail;
        // head tail 세팅
        this.tail = this.head;
        this.head = curNode;
        
        for (let i = 0; i < this.length; i++) {
            // 지금 노드 작업 ( prev <-> next )
            const temp = curNode.prev;
            curNode.prev = curNode.next;
            curNode.next = temp;
            // 다음 노드 준비
            curNode = temp;
        }
        return this;
    }
}

let list = new DoublyLinkedList();
list.push(5).push(10).push(15).push(20);
list.reverse();
console.log(list.head.next.next.val, list.head.next.next.next.val)
// console.log(list)
// console.log( 'push', list.push(1) );
// console.log( 'push', list.push(2) );
// console.log( 'push', list.push(3) );
// console.log( 'unshift', list.unshift(1) );
// console.log( 'unshift', list.unshift(2) );
// console.log( 'unshift', list.unshift(3) );
// console.log( 'unshift', list.unshift(4) );
// console.log( 'unshift', list.unshift(5) );
// list.traverse();
// console.log( 'shift', list.shift(), list.length );
// console.log( 'shift', list.shift(), list.length );
// console.log( 'shift', list.shift(), list.length );
// console.log( 'shift', list.shift(), list.length );
// console.log( 'pop', list.pop(), list.length );
// console.log( 'pop', list.pop(), list.length );
// console.log( 'pop', list.pop(), list.length );
// console.log( 'pop', list.pop(), list.length );

// console.log( 'get', list.get(2) );
// console.log( 'set', list.set(1, 10), list.set(4, 10) );

// console.log( 'insert', list.insert(1, 10) );
// console.log( 'insert', list.insert(0, 20) );
// console.log( 'insert', list.insert(4, 30) );
// list.traverse();
// console.log( 'remove', list.remove(0) );
// console.log( 'remove', list.remove(4) );
// console.log( 'remove', list.remove(1) );
// list.traverse();
// list.traverse('t');

// console.log( 'get', list.get(1) );
console.log(list)