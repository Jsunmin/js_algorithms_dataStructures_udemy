/*
문제 패턴
*/

// 1, 빈도수 카운팅: 객체 or Set을 활용해 값의 빈도 수집 ( timeO(n^2) 회피! )
function same1(arr1, arr2){
    if(arr1.length !== arr2.length){
        return false;
    }
    for(let i = 0; i < arr1.length; i++){
        let correctIndex = arr2.indexOf(arr1[i] ** 2)
        if(correctIndex === -1) {
            return false;
        }
        arr2.splice(correctIndex,1) // O(n^2)
    }
    return true
}

function same2(arr1, arr2){
    if(arr1.length !== arr2.length){
        return false;
    }
    let frequencyCounter1 = {}
    let frequencyCounter2 = {}
    for(let val of arr1){
        frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1
    }
    for(let val of arr2){
        frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1        
    }
    for(let key in frequencyCounter1){
        // 제곱한 키값이 존재해야 하고
        if(!(key ** 2 in frequencyCounter2)){
            return false
        }
        // 그 쌍의 값들이 같아야 한다
        if(frequencyCounter2[key ** 2] !== frequencyCounter1[key]){
            return false
        }
    } // 3O(n) -> time O(n)
    return true
}

console.log(
    same1([1,2,3,2], [9,1,4,4]),
    same2([1,2,3,2], [9,1,4,4]),
);

function validAnagram(str1, str2){
    if (str1.length !== str2.length) {
        return false;
    }
    const str1Checker = {};
    const str2Checker = {};
    for (let i = 0; i < str1.length; i++) {
        str1Checker[str1[i]] = ( str1Checker[str1[i]] || 0 ) + 1;
        str2Checker[str2[i]] = ( str2Checker[str2[i]] || 0 ) + 1;
    }
    for ( let str1Key in str1Checker) {
        if ( !str2Checker[str1Key] || ( str2Checker[str1Key] !== str1Checker[str1Key]) ) {
            return false;
        }
    }
    return true;
}

console.log(
    validAnagram('', ''), // true
    validAnagram('aaz', 'zza'), // false
    validAnagram('anagram', 'nagaram'), // true
    validAnagram("rat","car"), // false
    validAnagram('awesome', 'awesom'), // false
    validAnagram('qwerty', 'qeywrt'), // true
    validAnagram('texttwisttime', 'timetwisttext'), // true
)


// 2, 여러 포인터: 특정 조건에 따라 인덱스(위치)를 변경시키는 포인터 만들기 → 공간 복잡도 회피!
function sumZero1(arr){
    for(let i = 0; i < arr.length; i++){
        for(let j = i+1; j < arr.length; j++){ // time O(n^2) | space O(1)
            if(arr[i] + arr[j] === 0){
                return [arr[i], arr[j]];
            }
        }
    }
}

function sumZero2(arr){
    let left = 0;
    let right = arr.length - 1;
    // 정렬된 배열이므로!
    while(left < right){ // time O(n) | space O(1)
        let sum = arr[left] + arr[right];
        if(sum === 0){
            return [arr[left], arr[right]];
        } else if(sum > 0){
            right--;
        } else {
            left++;
        }
    }
}
console.log(
    sumZero1([-3,-2,-1,0,1,2,3]), // [-3,3] 
    sumZero1([-2,0,1,3]), // undefined
    sumZero1([1,2,3]), // undefined
);

console.log(
    sumZero2([-3,-2,-1,0,1,2,3]), // [-3,3] 
    sumZero2([-2,0,1,3]), // undefined
    sumZero2([1,2,3]), // undefined
);

function countUniqueValues(arr){
    let answer = 0;
    for (let i = 0; i < arr.length; i++) { // time O(n) | space O(1)
        if ( arr[i] !== arr[i+1]) {
            answer++;
        }
    }
    return answer;
}

console.log(
    countUniqueValues([1,1,1,1,1,2]), // 2
    countUniqueValues([1,2,3,4,4,4,7,7,12,12,13]), // 7
    countUniqueValues([]), // 0
    countUniqueValues([-2,-1,-1,0,1]), // 4
);


// 연속된 인덱스로 만들어진 배열의 부분집합 활용
function maxSubarraySum1(arr, num) {
    if ( num > arr.length){
        return null;
    }
    var max = -Infinity;
    for (let i = 0; i < arr.length - num + 1; i ++){
        temp = 0;
        for (let j = 0; j < num; j++){ // time O(n^2)
            temp += arr[i + j];
        }
        if (temp > max) {
            max = temp;
        }
    }
    return max;
}

function maxSubarraySum2(arr, num){
    let maxSum = 0;
    let tempSum = 0;
    if (arr.length < num) return null;
    for (let i = 0; i < num; i++) {
        maxSum += arr[i];
    }
    tempSum = maxSum;
    for (let i = num; i < arr.length; i++) { // time O(n)
        // 0~n까지의 첫 합 구하고, - 맨앞원소 + 맨뒤원소 로 계산 & 비교
        tempSum = tempSum - arr[i - num] + arr[i];
        maxSum = Math.max(maxSum, tempSum);
    }
    return maxSum;
}

console.log( 
    maxSubarraySum1([1,2,5,2,8,1,5],2), // 10
    maxSubarraySum1([1,2,5,2,8,1,5],4), // 17
    maxSubarraySum1([4,2,1,6],1), // 6
    maxSubarraySum1([4,2,1,6,2],4), // 13
    maxSubarraySum1([],4), // null
)

console.log( 
    maxSubarraySum2([1,2,5,2,8,1,5],2), // 10
    maxSubarraySum2([1,2,5,2,8,1,5],4), // 17
    maxSubarraySum2([4,2,1,6],1), // 6
    maxSubarraySum2([4,2,1,6,2],4), // 13
    maxSubarraySum2([],4), // null
)

// 4, 분할 및 정복: 데이터 세트를 더 작은 청크로 분할, 데이터 하위 집합으로 프로세스를 반복 → 시간 복잡도를 크게 줄임!!
function search1(arr, val){
    for(let i = 0; i < arr.length; i++){ // time O(n)
        if(arr[i] === val){
            return i;
        }
    }
    return -1;
}

function search2(array, val) {
    let min = 0;
    let max = array.length - 1;
    // 바이너리 서치 ~ divide&conquer의 전형적 예시
    while (min <= max) { // 반복문 돌면서 서브셋으로 점차 좁혀짐 -> time O(logn)
        let middle = Math.floor((min + max) / 2);
        let currentElement = array[middle];
        if (currentElement < val) {
            min = middle + 1;
        }
        else if (currentElement > val) {
            max = middle - 1;
        }
        else {
            return middle;
        }
    }
    return -1;
}

console.log(
    search1([1,2,3,4,5,6],4), // 3
    search1([1,2,3,4,5,6],6), // 5
    search1([1,2,3,4,5,6],11), // -1
);
console.log(
    search2([1,2,3,4,5,6],4), // 3
    search2([1,2,3,4,5,6],6), // 5
    search2([1,2,3,4,5,6],11), // -1
);

// optional Challenge TODO solve!
function minSubArrayLen(nums, sum) {
    let total = 0;
    let start = 0;
    let end = 0;
    let minLen = Infinity;
   
    while (start < nums.length) {
      // if current window doesn't add up to the given sum then 
          // move the window to right
      if(total < sum && end < nums.length){
        total += nums[end];
              end++;
      }
      // if current window adds up to at least the sum given then
          // we can shrink the window 
      else if(total >= sum){
        minLen = Math.min(minLen, end-start);
              total -= nums[start];
              start++;
      } 
      // current total less than required total but we reach the end, need this or else we'll be in an infinite loop 
      else {
        break;
      }
    }
   
    return minLen === Infinity ? 0 : minLen;
}
// console.log( findLongestSubstring('bbbbbb') );
console.log( minSubArrayLen([2,3,1,2,4,3], 7) ); // 2
console.log( minSubArrayLen([2,1,6,5, 4], 9) ); // 2