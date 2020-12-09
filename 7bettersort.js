// js sort lev+
// 최대 O(N) ~ O(N logN)의 시간 복잡도로 줄인 정렬 알고리즘들 (이해하기 복잡하지만 효율적인 알고리즘)

/*
머지 소트: 정렬로직과 합병로직의 조합! ~ 작은 단위 정렬 → 정렬된 작은 단위, 합치면서 정렬 (맨 앞만 비교하면 됨)
time: O (n + m)  /  space: O (n + m)

합병로직
1, 빈배열을 생성
2, 두 인자 배열 비교
    a. 두 배열의 1인자 중 가장 작은 값 빈배열에 넣고, 포인터 다음으로 이동 ( 이미 정렬되어서 온 배열 인자이기 때문 )
    b. 다시 두 배열의 선두 값을 비교해서 작은 값을 넣고, 빠진 배열의 포인터를 다음으로 이동
    c. 한 배열이 모두 소진되면, 남은 배열 전부 밀어 넣음

정렬로직
1, 비어 있거나 하나의 요소를 가질 때까지 배열을 반으로 나눕니다.
2, 더 작은 정렬 된 배열이 있으면 배열의 전체 길이로 돌아올 때까지 해당 배열을 다른 정렬 된 배열과 병합합니다.
3, 배열이 다시 병합되면 병합 된 (및 정렬 된) 배열을 반환합니다.
*/

let i = 0;
function mergeArr(arr1, arr2) {
    console.log(arr1, arr2, i++)
    // 2 인자는 정렬된 배열이라는 가정
    const newArr = [];
    let ind1 = 0, ind2 = 0;
    while(1) {
        if ( arr1[ind1] <= arr2[ind2] ) {
            newArr.push( arr1[ind1] );
            ind1++;
            // 비어있으면 나머지 부문 그대로 푸시
            if ( arr1[ind1] === undefined ) {
                newArr.push(...arr2.slice(ind2));
                break;
            }
        } else {
            newArr.push( arr2[ind2] );
            ind2++;
            // 다음 인자가 없으면
            if ( arr2[ind2] === undefined ) {
                newArr.push(...arr1.slice(ind1));
                break;
            }
        }
    }
    return newArr;
}
function mergeSort(arr) {
    if ( arr.length <= 1) {
        return arr;
    }
    const divide = Math.floor( arr.length / 2 ); // 쪼개는 과정 O(lob N) ~ /2 만큼 쪼개가니까.
    // 2개로 쪼갠 배열을 length 1부터 다시 합쳐감
    return mergeArr( mergeSort( arr.slice(0, divide)), mergeSort( arr.slice(divide)) ); // 합치는 과정 O(N) ~ 원소 돌아가면서 비교&병합

    // O(N logN)
}
console.log(
    // mergeArr([ 1, 3, 5, 10 ], [ 0, 8, 9, 100 ]),
    mergeSort([ 3,5,1,10,0,8,11 ]),
    // mergeSort([ 8,1,2,3,4,5,6,7 ]),
);

/*
퀵 sort: 하나 원소 (= 피벗)를 선택하고, 정렬된 배열에서 피벗이 궁극적으로 존재해야 할 인덱스를 찾는 방식으로 작동
    배열이 0, 1 길이 가질 때까지 쪼개서 정렬한다는 사실 활용 (병합정렬과 비슷)
    피벗이 적절하게 배치되면 피벗 양쪽 끝에서 다시 퀵소트 적용

피벗 헬퍼 함수:
    1, 배열 양끝 요소중 하나를 피벗으로 지정
    2, 피벗보다 작은 값은 피벗 기준 왼쪽 / 큰 값은 피벗 기준 오른쪽으로 이동 (배열 재정렬)
    3, 인자로 받은 배열을 그대로 사용하고 / 피벗 양쪽 순서는 중요X / 완료 후 피벗 인덱스 반환

피벗 선택: 최적의 효율을 위해서는 데이터의 중앙값에 근접한 피벗을 선택해야 함. ( 단순화를 위해선 1번 원소 )

pseudo
<피벗 로직>
    0, 배열, 시작, 종료 인덱스 (3인자)를 받는 함수
    1, 배열 시작 부분으로 피벗 잡기
    2, 현재 피벗 인덱스 저장
    3, 배열 순회하면서, 작은 수는 피벗 왼쪽 / 큰 수는 오른쪽으로 정렬
    4, 시작 요소를 피벗 인덱스로 바꿈 ( 왼쪽으로 옮겨진 새로운 수 )

<정렬 로직>
    1, 인자 배열에 대한 피벗 함수 호출
    2, 업데이트된 부분 피벗 배열에 대해, 배열의 왼쪽과 오른쪽에서 피벗함수 재귀적으로 호출
    3, 2개 미만 부분 배열이 존재할 때, 재귀함수 종료 (base case)

*/
function pivot(arr, start = 0, end = arr.length - 1) { // 인자끼리 바로 세팅
    let pivot = arr[start];
    let pivotInd = start;
    for (let i = start + 1; i <= end; i++) {
        // 피벗 값보다 작은 값 옮겨줌
        // console.log(arr,'ss')
        if ( pivot > arr[i] ) {
            pivotInd++; // 작은값 확인될 때마다, 자리 옮기는 기준 변경 (왼쪽부터 하나씩 쌓아감)
            // console.log( pivot, 'i', i, 'arr[i]', arr[i], 'pivotInd', pivotInd)
            // 작은 값 옮겨줌
            let temp = arr[i];
            arr[i] = arr[pivotInd];
            arr[pivotInd] = temp;
            // console.log( arr, 'ee')
        }
    }
    // 피벗값 제자리 찾기
    arr[start] = arr[pivotInd];
    arr[pivotInd] = pivot;
    return pivotInd;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
    if ( left < right ) {
        let pivotInd = pivot( arr, left, right );
        quickSort(arr, left, pivotInd - 1);
        quickSort(arr, pivotInd + 1, right);
    }
    return arr;
}

console.log(
    // pivot([9,4,11,16,1,41,40,14,36,37,42,18]),
    quickSort([4,6,9,1,2,5,3]),
)


/*
라딕스 소트: 숫자 전체에 대한 비교가 아닌, 숫자의 인코딩된 자릿수로 비교 (자릿수가 많으면 더 큰 숫자!)
    0~9까지 queue 를 두고, 모든 데이터에 대해 가장 낮은 자릿수를 비교해 해당하는 queue에 넣음
    0부터 차례대로 다시 데이터를 가져옴 (from queue)
    자릿수 올려가며 해당 과정 반복.

pseudo
<라딕스 헬퍼 함수>
1, 숫자와 비교 자릿수(2인자)를 받는 함수 ~ 숫자의 해당 자릿수 숫자를 리턴
2, 숫자(1인자)를 받는 함수 ~ 특정 수의 자릿수를 리턴
3, 숫자 배열을 받는 함수 ~ 가장 큰 수의 자릿수 리턴

<정렬 로직>
0, 숫자중 가장 큰 자릿수 파악.
1, 0 ~ 큰 자릿수 루프 생성(i)
    a, 각 숫자(0-9)에 대한 큐  생성
    b, i번째 자리 기준으로 맞는 큐에 enqueue
2, 기존 배열을 0~9 큐에서 하나씩 뺀 값으로 재정렬
3, 배열 반환


*/
function getDigit(num, place) {
    // 음수 처리 & 1의자릿수를 타겟으로 남기고, 10으로 나눠 앞자리 걷어냄
    return Math.floor( Math.abs(num) / (10 ** place) ) % 10;
}
function digitCount(num) {
    // 음수 처리 & 10으로 지수 구하고 해당 소수 결과에 + 1
    return Math.floor( Math.log10( Math.abs(num) ) + 1 );
}
function mostDigits(arr) {
    let most = 0;
    // 숫자를 돌면서 가장 큰 자릿수 리턴
    for ( let i = 0; i < arr.length; i++ ) {
        most = Math.max( digitCount(arr[i]), most );
    }
    return most;
}
function readixSort(arr) {
    const maxDigit = mostDigits(arr);
    for(let digit = 0; digit < maxDigit; digit++) {
        // 0 - 9 까지 큐 생성
        // const digitQueues = Array.from({length: 10}, () => []); // 훨씬 보기 좋다..
        const digitQueues = new Array(10);
        // 숫자 정렬
        for(let i = 0; i < arr.length; i++) {
            const targetPlace = getDigit(arr[i], digit);
            if ( !digitQueues[targetPlace] ) {
                digitQueues[targetPlace] = [];
            }
            digitQueues[targetPlace].push(arr[i]);
        }
        // 큐 결과 반영
        // arr = [].concat(...digitQueues); // 훨씬 보기 좋다..
        arr = digitQueues.reduce( (result, v) => {
            // undefined 존재 가능
            if (v) {
                // 0 -> 9 까지 차례대로 반영 (enqueue)
                result.push(...v);
            }
            return result;
        }, []);
    }
    return arr;
}
console.log(
    readixSort([1234, 56, 7]),
    readixSort([1,1, 11111, 1]),
    readixSort([12, 34, 56, 78]),

)