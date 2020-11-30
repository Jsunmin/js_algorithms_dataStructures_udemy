// 중복된 원소 판별 함수
function isUnique(str) {
    /* 시간 복잡도 부하
    // time: O(n^2)
    // space: O(1)
    for (let i = 0; i < str.length; i++) { 
        if( str.lastIndexOf(str[i]) !== i ) {
            return false;
        }
        // for (let j = i + 1; j < str.length; j++) {
        //     if ( str[i] === str[j]) {
        //         return false;
        //     }
        // }
    }
    */

    /* 시간 / 공간 복잡도 분산
    // time: O(n * log(n))
    // space: O(n)
    // sorting 알고리즘마다 다르지만, 보통 log(n) 의 복잡도를 지님.
    const chars = str.split('').sort(); // time: O(n * log(n)) / space: O(n)
    for (let i = 1; i < str.length; i++) { // O(n)
        // 직전 원소와 비교해서 판단
        if (chars[i] === chars[i-1]) {
            return false;
        }
    }
    */

    /* 시간 / 공간 복잡도 분산
    // time: O(n)
    // space: O(n)
    char = {}; // space: O(n)
    for (let i = 0; i < str.length; i++) { // time: O(n)
        if( char[str[i]] ) {
            return false;
        } 
        char[str[i]] = 1;
    }
    */

    /* 시간 / 공간 복잡도 분산 ~ Set 자료구조로 구현
    // time: O(n)
    // space: O(n)
    console.log( new Set(str) ); // cf) 문자열 자동 split & uniq
    char = new Set(); // space: O(n)
    for (let i = 0; i < str.length; i++) { // time: O(n)
        if( char.has(str[i]) ) {
            return false;
        } 
        char.add(str[i]);
    }
    */
    
    // return true;
    
    // final
    // time: O(n)
    // space: O(n)
    return new Set(str).size === str.length;
    
}
console.log(
    isUnique('abcdef'), // true
    isUnique('789^%$#qdx&a'), // true
    isUnique('aAdebCc'), // true
    isUnique('aAbdca'), // false
)

// 배열 펼치는 함수 ( nested -> new flatten arr)
function flatten(nestedArr) {
    const answer = [];
    // my solution 재귀
    for( let i = 0; i < nestedArr.length; i++ ) {
        makeFlat(nestedArr[i], answer);
    }
    function makeFlat(target, result) {
        if ( !Array.isArray( target ) ) {
            result.push(target);
            return;
        }
        for( let i = 0; i < target.length; i++ ) {
            if ( !Array.isArray( target[i] ) ) {
                if ( target[i] ) {
                    result.push(target[i]);
                }
            } else {
                console.log(target[i])
                makeFlat(target[i], result);
            }
        }   
    }
    // time: O(n)
    // space: O(n)
    return answer;
}
console.log(flatten([ [ [ [1], 2], 3], [4], [], [[5]]])); // -> [1,2,3,4,5]
console.log(flatten([ 'abc', ['def', ['ghi', ['jkl']]]])); // -> [abc, def, ghi, jkl]

// 중복 제거 함수
function removeDupes(str) {
    // obj 에 넣어서 체크 -> time: O(n) / space: O(n)
    // 배열 2번 돌면서 체크 -> time: O(n^2) / space: O(n)
    
    /*
    // my sol
    let answer = '';
    for ( const val of new Set(str).values() ) {
        answer += val;
    };
    return answer;
    */

    // 더 깔끔 -> time: O(n) / space: O(n)
    const chars = new Set(str);
    return Array.from(chars).join('');
}
console.log(
    removeDupes('abcd'), // -> abcd
    removeDupes('abbbbcccddd'), // -> abcd
    removeDupes('abcdabadadabc'), // -> abcd
);

// 가장 많이 언급한 원소 리턴 함수
function highestFrequency(strings) {
    const checker = {}; // O(n)

    let answer = strings[0];
    let answerCount = 1;
    for (let i = 0; i < strings.length; i++) { // O(n)
        if ( checker[strings[i]] ) {
            checker[strings[i]]++;
        } else {
            checker[strings[i]] = 1;
        }

        // 바로 작업
        if ( checker[strings[i]] > answerCount ) {
            answerCount = checker[strings[i]];
            answer = strings[i];
        }
    }
    // -> time: O(n) / space: O(n)

    // 굳이 또 돌 필요 없다. -> time: O(n * log(n)) / space: O(n)
    // for ( const [k, v] of Object.entries(checker)) {
    //     if ( i < v ) {
    //         answer = k;
    //         i = v;
    //     }
    // }
    return answer;
}
console.log(
    highestFrequency(['a', 'b', 'c', 'c', 'd', 'e']), // -> c
    highestFrequency(['abc', 'def', 'abc', 'def', 'abc']), // -> abc
    highestFrequency(['abc', 'def']), // -> abc
    highestFrequency(['abc', 'abc', 'def', 'def', 'def', 'ghi', 'ghi', 'ghi', 'ghi']), // -> ghi
);

// 순서만 바뀐 쌍 리턴 함수
function stringRotation(str1, str2) {
    /* 
    if (str1.length !== str2.length) {
        return false;
    }
    let changedStr1 = str1;
    for (let i = 0; i < str1.length; i++) { // time: O(n)
        changedStr1 = changedStr1.substring(1) + changedStr1[0]; // time: O(1)?
        if ( changedStr1 === str2 ) {
            return true;
        }
    }
    return false;
    */

    // 이런 ㅅㅂ... -> time: O(n) / space: O(n)
    return (str1.length === str2.length) && (str1 + str1).includes(str2);
}
console.log(
    stringRotation('rotation', 'tationro'), // -> true
    stringRotation('javascript', 'scriptjava'), // -> true
    stringRotation('javascript', 'java'), // -> false
    stringRotation('hello', 'there'), // -> false
);