/* 
heap: 최대 최소 값을 쉽게 찾기 위해 고안된 자료형 
  부모 노드 값이 자식 노드들의 값보다 작지 않거나( 최대 힙 ) / 크지 않은 ( 최소 힙 ) 완전 이진 트리 (자식은 최대 2개 / 왼오 구분X)
    max binary heap: 최대 2개의 하위 노드 가짐 / 상위 노드는 항상 하위 노드보다 큼 (형제간 보장X) / 뎁스는 꽉 채운 후 다음 뎁스 생성
    min binary heap: “ / 상위 노드는 항상 하위 노드보다 작음 / “

    - 바이너리 힙은 우선순위 큐를 만드는데 활용  /  그래프 순회 알고리즘에도 활용
    - 힙 저장: 배열 | 링크드 리스트로 쉽게 가능!
        배열의 인덱스 n → Lchild: 2n+1 / Rchild: 2n+2
        반대로 자식노드( n ) → 부모노드( floor( (n-1)/2 ) )

    삽입 - O(log N)
    서칭 - O(log N)

*/
class MaxBinaryHeap {
    constructor() {
        this.values = [41, 39, 33, 18, 27, 12];
    }
    bubbleUp() {
        let index = this.values.length - 1;
        const element = this.values[index];
        while(1) {
            const parentIndex =  Math.floor( (index - 1) / 2);
            const parentElement = this.values[parentIndex];
            // 인덱스 체크는 0까지 & 신규 노드가 커야 버블링 처리!
            if ( parentIndex < 0 || this.values[parentIndex] >= element ) {
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
            if ( lValue >= rValue ) {
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
    insert(element) {
        this.values.push(element);
        this.bubbleUp();
    }
    extractMax() {
        const max = this.values[0];
        const end = this.values.pop();
        this.values[0]= end;
        // 마지막꺼 스왑한 결과 조정
        this.bubbleDown();
        return max;
    }
}

const heap = new MaxBinaryHeap();
heap.insert(55);
heap.insert(45);
console.log('check1', heap.values)
heap.extractMax();
heap.extractMax();
console.log('check2', heap.values)