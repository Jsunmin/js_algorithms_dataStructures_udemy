// search
function search() {
    // time O( n )
}

function binarySearch(arr, t){
    let start = 0;
    let end = arr.length - 1;
    while (start <= end) { // time O( log n )
        const mid = Math.floor( (start + end) / 2 );
        console.log(mid, start, end)
        const stan = arr[mid];
        if (stan < t) {
            start = mid + 1;
        } else if (stan > t) {
            end = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
}
binarySearch([1,2,3,4,5], 2);

function naiveStringSearch(lStr, sStr) {
    let count = 0;
    let sStrCount = 0;
    for (let i = 0; i < lStr.length; i++) { // time O( nm )
        if ( lStr[i] === sStr[0] ) {
            sStrCount++;
            for (let j = 1; j < sStr.length; j++) {
                if ( lStr[++i] === sStr[j] ) {
                    sStrCount++;
                } else {
                    break;
                }
            }
            if (sStrCount === sStr.length) {
                count++;
            }
            sStrCount = 0;
        }
    }
    console.log('ans', count);
}
naiveStringSearch('lorie loloed', 'lol')
naiveStringSearch('wowomgzomg', 'omg')

// KMP: 문자열 검색 함수의 시간 복잡도를 줄이는 알고리즘