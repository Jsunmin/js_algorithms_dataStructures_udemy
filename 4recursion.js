// /*
// 4.재귀 : 자신을 호출하는 프로세스 (함수)
//  - json.parse & stringify  /  document DOM traverse algorithms  /  object traversal  / 복잡한 자료구조에 쓰임..  /  반복문 대안

//  - 콜스택: 함수가 실행될때마다 쌓이는 stack DS (실행할때 push, 리턴할때 pop)  ~ JS 함수 호출 매니징 툴

// 재귀가 터지는 이유 : stack overflow ( 콜스택 터짐.. )  /  마무리 로직(base case)을 잘 리턴해야 함!

// helper method recursion: outer, inner func으로 구성 (inner: 재귀 / outer: 변수 클로저, 정리 및 최종 리턴)
// pure recursion: 

// */

// // HELPER METHOD RECURSION
// // outer, inner func으로 구성 (inner: 재귀 / outer: 변수 클로저, 정리 및 최종 리턴)
// function outer(input){
//     var outerScopedVariable = []

//     function helper(helperInput){
//         if (helperInput.someCondition) {
//             return;
//         }
//         // modify the outerScopedVariable
//         helper(helperInput--)
//         outerScopedVariable.push('xx')
//     }
//     helper(input)

//     return outerScopedVariable;

// }

// // PURE RECURSION
// // inner outer 구분없이 자체적으로 재귀인 함수 ( 배열, 문자열 등의 인자를 복사해서 활용 - 원본 수정X )
// function collectOddValues(arr){
//     let newArr = [];
    
//     if(arr.length === 0) {
//         return newArr;
//     }
        
//     if(arr[0] % 2 !== 0){
//         newArr.push(arr[0]);
//     }
        
//     newArr = newArr.concat(collectOddValues(arr.slice(1)));
//     /* 지속해서 리턴 함수 callstack 쌓아간다.
//     [1].concat(collectOddValues([2,3,4,5]));
//         [].concat(collectOddValues([3,4,5]));
//             [3].concat(collectOddValues([4,5]));
//                 [].concat(collectOddValues([5]));
//                     ... 
//     */
//     return newArr;
// }

console.log(
    power(2,0), // 1
    power(2,2), // 4
    power(2,4), // 16
)

function power(base,expo){
    if ( expo === 0 ) {
        return 1;
    }
    return base * power(base, expo - 1);
}