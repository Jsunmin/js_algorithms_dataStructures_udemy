// brute force sort search
function search(numbers, target) {
    for (let i = 0; i < numbers.length; i++) { // time O(n)
        if (numbers[i] === target) {
            return i;
        }
    }
}
console.log(search([1,3,6,13,17], 13));

// binary sort search
function bSearch(numbers, target) {
    let start = 0;
    let end = numbers.length - 1;
    while( start <= end) { // time O(log n)
        const mid = Math.floor( ( end + start ) / 2 );
        if ( numbers[mid] > target ) {
            end = mid - 1;
        } else if ( numbers[mid] < target ) {
            start = mid + 1;
        } else {
            return mid;
        }
    }
    return -1;
}
console.log(bSearch([1,3,6,13,17], 17));

// 괄호 체킹 함수
function isBalanced(str) {
    const open = '([{';
    const close = ')]}';
    const openstack = [];
    const set = {
        ')': '(',
        ']': '[',
        '}': '{',
    };
    for (let i = 0; i < str.length; i++) { // time O(n) | space O(n)
        const char = str[i];
        if ( open.includes(char) ) {
            openstack.push(char);
        } else if ( close.includes(char) ) {
            // 최근 것부터 뺴자!
            const lastOne = openstack.pop();
            if ( lastOne !== set[char] ) {
                return false;
            }
        }
    }
    return true;
}

console.log( 
    isBalanced('{[]}'),
    isBalanced('{[}]'),
)