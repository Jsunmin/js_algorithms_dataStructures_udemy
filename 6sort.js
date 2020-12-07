// js sort
console.log(['가나다', '나다라', '1마바', '마바1', '사하', 'ㅁㅁㅁ', 'ㅃㅂ', 'AAA', 'aaa', 'a11', 'a10', 'a12'].sort());
// built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values
// 앞자리, 10 1 이 우선시됨 -> 이 경우 compareFunction 을 써야함.
console.log([10, 15, 4, 6, 1].sort((a, b) => a - b));

function bubleSort(arr) {
    let iter = arr.length;
    while (iter > 1) { // time O( n^2 )
        let noSwap = true;
        for (let i = 1; i < iter; i++) { // 마지막에 가장 큰수를 둘때까지 swap
            if ( arr[i-1] > arr[i]  ) {
                let temp = arr[i-1];
                arr[i-1] = arr[i];
                arr[i] = temp;
                noSwap = false;
            }
        }
        iter--;
        if ( noSwap ) { // 이미 정렬된 배열도 무조건 돌게 됨.. 이런 비효율성 차단 장치
            console.log('cut!')
            break;
        }
    }
    return arr;
}
console.log(
    bubleSort([ 3,5,1,10,0,8 ]),
    bubleSort([ 8,1,2,3,4,5,6,7 ]),
);

function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) { // time O( n^2 )
        let smallest = i;
        for (let j = i + 1; j < arr.length; j++) {
            console.log(i,j)
            if ( arr[smallest] > arr[j]  ) {
                smallest = j;
            }
        }
        if ( i !== smallest) { // i가 최솟값 인덱스가 아니면 swap
            console.log('swap')
            let temp = arr[i];
            arr[i] = arr[smallest];
            arr[smallest] = temp;
        }
    }
    return arr;
}
console.log(
    selectionSort([ 3,5,1,10,0,8 ]),
    selectionSort([ 8,1,2,3,4,5,6,7 ]),
);

function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) { // time O( n^2 )
        let currentVal = arr[i];
        // index -> 0 으로 돌면서 비교 ( cV가 더 클 때까지 )
        let stopIndex = i;
        for (let j = i - 1; j >= 0 && arr[j] > currentVal; j-- ) {
            stopIndex = j;
            arr[j+1] = arr[j]; // 해당 원소를 뒤로 미루고.
        }
        arr[stopIndex] = currentVal; // 미룬 원소의 위치에 삽입
    }
    return arr;
}
console.log(
    insertionSort([ 3,5,1,10,0,8 ]),
    insertionSort([ 8,1,2,3,4,5,6,7 ]),
);