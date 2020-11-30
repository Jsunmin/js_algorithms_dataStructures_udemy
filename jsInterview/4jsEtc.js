// deep equal check
function deepEquals(a, b) {
    if ( Number.isNaN( a ) && Number.isNaN( b )) {
        return true;
    } else if ( typeof a !== typeof b ) {
        return false;
    } else if ( !Array.isArray( a ) && Array.isArray( b ) || Array.isArray( a ) && !Array.isArray( b ) ) {
        return false;
    } else if (typeof a !== 'object' || a === null || b === null) {
        return a === b;
    } else if ( Object.keys(a).length !== Object.keys(b).length ) {
        return false;
    }
    
    // recur
    for (const key in a) {
        if (!deepEquals(a[key], b[key])) {
            return false;
        }
    }
    return true;
}
console.log(
    deepEquals(NaN,NaN),
    deepEquals(null,null),
    deepEquals([1,2,3],[1,2,3]),
    deepEquals([1,2,3],[1,2,4]),
    deepEquals({},{}),
    deepEquals({},[]),
    deepEquals({a: {}},{a:{}}),
);


// memoized fib
function memoizedFib(num) {
    const memo = {}; // bottom up이라 쓸모가 없는...
    function recur(n) {
        if ( n <= 2 ) {
            return 1;
        }
    
        let result;
        if ( memo[n] ) {
            result = memo[n];
        } else {
            result = memoizedFib(n-1) + memoizedFib(n-2);
            memo[n] = result;
        }
        return result;
    }
    return recur(num);
}

const memoizedFib2 = (function() {
    const memo = [1,1];
    return function(n) {
        if ( memo.length > n ) {
            return memo.slice(0, n);
        }

        while(memo.length < n) {
            const lastItem = memo[memo.length - 1];
            const secondLastItem = memo[memo.length - 2];
            console.log(n, lastItem + secondLastItem)
            memo.push(lastItem + secondLastItem);
        }
        // memo는 지속적으로 업뎃. 당시 스냅샷을 잘라서 리턴하자!
        return memo.slice(0, n);;
    }
})(); // 즉시실행 함수로 클로저 생성
console.log(
    memoizedFib2(4), // [1,1,2,3,5,8,13,21,34]
    memoizedFib2(6),
    memoizedFib2(8),
    memoizedFib2(4),
);

//time Count off
// 1
for (let i = 0; i <= 5; i++) { // var를 쓰면 전역변수로, 다 수정되고 나서인 6을 5초간 리턴!
    const time = i * 1000;
    setTimeout(function() {
        console.log(i)
    }, time);
}
// 2
function timePrint(j) {
    // func block 내 변수로 stack 청소 후에도 받아온다!
    var time = j * 1000;
    setTimeout( function () {
        console.log(j);
    }, time);
}
for (var i = 0; i <= 5; i++) { // var를 쓰면 전역변수로, 다 수정되고 나서인 6을 5초간 리턴!
    timePrint(i);
}

// versatile add
function add(a, b) {
    if ( a === undefined ) {
        return add;
    }
    if ( b === undefined ) { // !b 는 0을 씹는다..
        return function innerAdd(c) {
            if ( c === undefined ) {
                return innerAdd;
            }
            return a + c;
        }
    }
    return a + b;
}
console.log(
    add()()(3)(4),
    add(3,4),
    add(3)(4),
    add(3)()(4),
    add(3)()()()(4),
)