/* 맵
function arraySubset(superset, subset) {
    const supersetObj = {};
    for (let i = 0; i < superset.length; i++) {
        supersetObj[superset[i]] = ( supersetObj[superset[i]] || 0 ) + 1;
    }
    for (let i = 0; i < subset.length; i++) {
        if ( !supersetObj[subset[i]] ) {
            return false;
        }
        supersetObj[subset[i]]--;
    }
    return true;
}
*/
function arraySubset(superset, subset) {
    // 키에 다양한 자료형이 허용됨 (obj only string)  ~ 정수형 변형없이 바로 활용 가능!
    // cf. obj에 obj형키 넣으면, [object object]로 덮어버림..
    const supersetMap = new Map(); 
    for (let i = 0; i < superset.length; i++) {
        supersetMap.set(superset[i], ( supersetMap.get(superset[i]) || 0 ) + 1);
    }
    for (let i = 0; i < subset.length; i++) {
        if ( !supersetMap.get(subset[i]) ) {
            return false;
        }
        supersetMap.set(subset[i], supersetMap.get(subset[i]) - 1);
    }
    return true;
}
console.log(
    arraySubset([2,1,3], [1,2,3]),
    arraySubset([2,1,1,3], [1,2,3]),
    arraySubset([1,2], [1,2,3]),
    arraySubset([1,2,3], [1,2,2,3]),
    arraySubset([1,2,3], [1,1,1]),
)

// 멀티 포인터
function maximumProfits(prices) {
    let buyIndex = 0, sellIndex = 0;
    for (let i = 0; i < prices.length; i++) {
        if ( prices[sellIndex] < prices[i] ) {
            sellIndex = i;
        }
        if ( prices[buyIndex] > prices[i] ) {
            buyIndex = i;
            sellIndex = i; // 초기화
        }
    }
    console.log(prices[buyIndex], prices[sellIndex], buyIndex, sellIndex)
}
console.log( maximumProfits([10,7,5,8,11,9]) );

function singleMutation(str1, str2) {
    let count = 0;
    for (let i = 0, j = 0; i < Math.max(str1.length, str2.length); i++, j++) { // 2 포인터를 활용하면서 효율 극대화!
        if ( str1[i] !== str2[j] ) {
            count++;
            if (count > 1) {
                return false;
            }
            if ( str1.length > str2.length ) { // 하나가 추가되거나 제거되면, 짧은 애는 차이나느곳부터 다시 체크!
                j--;
            } else if ( str1.length < str2.length ) {
                i--;
            }
        }
    }
    return true;
}
console.log(
    singleMutation('abcd', 'acd'), // t
    singleMutation('abcd', 'abXcd'), // t
    singleMutation('abcd', 'aXcd'), // t
    singleMutation('abcd', 'abXde'), // f
);

// 규칙성 찾기 ret[c][N-1-r] = m[r][c]
function rotatingASquareMatrix(nestedArr) {
    const answer = []; // time -> O(n) space O(n)
    const footpath = nestedArr.length - 1;
    for ( let i = 0; i < nestedArr.length; i++ ) {
        answer.push([]);
    }
    for ( let i = 0; i < nestedArr.length; i++ ) {
        for ( let j = 0; j < nestedArr[0].length; j++ ) {
            answer[j][nestedArr.length -1 -i] = nestedArr[i][j]
        }
    }
    return answer;
}
console.log(
    rotatingASquareMatrix([[1,2], [3,4]]),
    rotatingASquareMatrix([[1,2,3], [4,5,6],[7,8,9]]),
    rotatingASquareMatrix([[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,16]]),
);

function rotatingASquareMatrixEfficientV(mat) {
    // 양파 껍질처럼 겹겹히 수정해간다.
    const totalLayer = Math.floor(mat.length / 2);

    for ( let layer = 0; layer < totalLayer; layer++ ) { // time O(n) | space O(1)
        const lastIndex = mat.length - 1 - layer;
        console.log(layer, lastIndex)
        for (
            let forwardIterator = layer + 1;
            forwardIterator < mat.length - layer;
            forwardIterator++
        ) {
            const reverseIterator = lastIndex - forwardIterator + layer;

            let temp1 = mat[forwardIterator][lastIndex];
            mat[forwardIterator][lastIndex] = mat[layer][forwardIterator];

            let temp2 = mat[lastIndex][reverseIterator];
            mat[reverseIterator][layer] = temp1;

            temp1 = mat[reverseIterator][layer];
            mat[reverseIterator][layer] = temp2;

            mat[layer][forwardIterator] = temp1;
        }
    }
    return mat;
}
console.log(
    rotatingASquareMatrixEfficientV([[1,2], [3,4]]),
    rotatingASquareMatrixEfficientV([[1,2,3], [4,5,6],[7,8,9]]),
    rotatingASquareMatrixEfficientV([[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,16]]),
);