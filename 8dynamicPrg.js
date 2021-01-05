function fib_memo(n, memo = [0, 1, 1]) {
    if ( memo[n] ) {
        return memo[n];
    }
    // base case도 메모이제이션 처리
    // if ( n <= 2 ) {
    //     console.log('up')
    //     return 1;
    // }
    const ans = fib_memo(n-1, memo) + fib_memo(n-2, memo);
    console.log(ans)
    if ( !memo[n] ) {
        // 다음번 하위구조는 memo에서 바로 갖다 쓴다!
        console.log(memo, '~~')
        memo[n] = ans;
    }
    return ans;
} // 메모이제이션을 통해, O( 2^N ) -> O( N ) 으로 시간복잡도를 줄일 수 있음!


// Tabulated (테이블처리 하면서 생성) ~ 콜스택에 제한없는 공간복잡도까지 고려한 풀이!
// 바텀업에 유효한 처리이다!
function fib_table(n) {
    if(n <= 2) return 1;
    const fibNums = [0,1,1];
    for (let i = 3; i <= n; i++) {
        // 표를 하나씩
        fibNums[i] = fibNums[i-1] + fibNums[i-2];
    }
    return fibNums[n];
}


console.log(
    // fib_memo(10000), // 콜스택 에러
    fib_table(10000)
    // fib(20),
    // fib(30)
);