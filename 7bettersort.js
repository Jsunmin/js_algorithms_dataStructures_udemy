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