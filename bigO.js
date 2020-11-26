/*
좋은 코드의 기준
    - 빠르다.
    - 덜 메모리 인텐시브 하다.
    - 읽기 쉽다.
*/

function addUpTo1(n) { // slow
    let total = 0; // 할당
    for (let i = 1; i <= n; i++) { // 할당 덧셈
        total += i; // (+, =) = 2 * n개
    } // operation n 이상 개..
    return total;
}
var t1 = Date.now();
addUpTo1(1000000000);
var t2 = Date.now();
console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds.`)

function addUpTo2(n) { // fast
    return n * (n + 1) / 2; // operation 3개
}
var time1 = Date.now();
addUpTo2(1000000000);
var time2 = Date.now();
console.log(`Time Elapsed: ${(time2 - time1) / 1000} seconds.`)

/*
1, 빠른 코드 만들기 -> 시간 복잡도
    판단: 시간 측정?! ( console.time || Date.now() - Date.now() )
        시간 측정의 문제: 기계(스펙) || 상황마다 다른 시간 책정 / 애초에 빠른 알고리즘에선 시간 측정이 정확하지 않다.
        → 컴퓨터가 작동하는 simple operation을 세보자! ~ + - * / = ... 계산 및 할당 .. 복잡..

    → bigO: formalize fuzzy counting
        입력이 증가함에 따라 알고리즘의 실행 시간이 어떻게 증가하는지 선언 가능.
        세부 사항에는 신경 쓰지 않고 추세에 집중.
        인풋(n)에 따른 단순 operation 수를 측정
            ~ n = Infinity, an + b 에서 a, b는 전부 무시.. 미비함!
            f(n) -> n ~ addUpTo1
            f(n) -> n^2 
            f(n) -> 1 (상수) ~ addUpTo2
        
    bigO 계산:
        산술 연산은 일정합니다.
        변수 할당은 일정합니다.
        배열 (인덱스 기준) 또는 객체 (키 기준)의 요소에 액세스하는 것은 일정합니다.
        루프에서 복잡성은 루프의 길이에 루프 내부에서 일어나는 모든 일의 복잡성을 곱한 것입니다.
    
    bigO는 simplify ( n == Infinity ) -> O(1) / O(n) / O(n^x) 로 나눌 수 있음.
*/

/*
2, 메모리 인텐시브 낮추기 -> 공간복잡도
    판단 메모리 체크?!

    변수 할당  체크
        1, 모든 primitive 값은 상수 공간 활용
        2, 문자열은 길이만큼 O(n) 공간 활용
        3, 참조 타입은 보통 O(n) 공간 활용 ( n = 배열 길이나, 오브젝트 키 개수 )

        함수 내 배열이나 오브젝트가 인풋 수 대로 할당한다면 보통 O(n)이다.
*/

/*
logarithms ~ O(log n) 및 O(nlog n)
    지수의 역 = 로그
    로그 계산: 보통 2로 나눠서 1 미만의 값을 구할때까지 반복한 값으로 계산
        성능상 :  O(log n) > O(n) > O(nlog n)
        검색 알고리즘 / 정렬 알고리즘 / 재귀 / etc.. 의 경우 로그 복잡도가 포함되기도 한다.

요약
→ 알고리즘 성능 분석을 위해 Big O Notation 활용!
    시공간 복잡도에 대해 어느정도 파악 가능 
    n이 무한대를 기준으로, 단순화해서 활용 (추세)
    이는 하드웨어가 아닌 알고리즘 자체로만 효율성 계산하는 것!
*/