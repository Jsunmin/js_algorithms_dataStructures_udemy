function infixCalculator(expressionStr) {
    const opertorStack = [];
    const operandStack = [];
    const operator = { // 연산자 우선순위
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '(': -1,
        ')': -1,
    };
    for (let i = 0; i < expressionStr.length; i++) {
        if ( expressionStr[i] === ' ' ) {
            continue;
        }
        const char = expressionStr[i];
        if ( !operator[char] ) {
            // 피연산자의 경우
            let number = char;
            let iter = i + 1;
            while ( expressionStr[iter] !== ' '
                && -Infinity < Number( expressionStr[iter] ) && Infinity > Number( expressionStr[iter] )  
            ) {
                number += expressionStr[iter];
                i++;
                iter++;
            }
            operandStack.push( +number );
            continue;
        }
        let topOper = opertorStack[opertorStack.length - 1];
        if ( !opertorStack.length || operator[topOper] < operator[char] || char === '(') {
            opertorStack.push( char ); // 비어있거나 | 우선순위 낮은게 스택에 있거나 | 여는 괄호면 그대로 넣음.
        } else {
            // 우선순위가 높거나 같은 사칙연산이 top이면, 낮은 사칙연산이 나올 때까지 꺼내고 계산한다.
            while( opertorStack.length && operator[topOper] >= operator[char] ) {
                opertorStack.pop();
                if (topOper === '(') { // 괄호는 빼기만 하고 끝낸다. (따로 연산 X)
                    break; // 괄호 내부 계산 끝
                }
                // console.log(topOper, char, 'ss', operandStack)
                const prev1Operand = operandStack.pop(); // top
                const prev2Operand = operandStack.pop(); // top - 1
                // console.log(prev1Operand, prev2Operand, topOper)
                const newOperand = calc(prev2Operand, topOper, prev1Operand); // 순서대로
                operandStack.push( newOperand ); // 새로운 operand 추가
                
                // console.log(opertorStack, operandStack, 'ee')
                topOper = opertorStack[opertorStack.length - 1];
            }
            // 닫는 괄호는 stack에 넣지 않음!
            if (char !== ')') {
                opertorStack.push( char ); // 새로운 operator 추가
            }
        }
    }
    // 결과 계산
    while (opertorStack.length) {
        const prev1Operand = operandStack.pop(); // top
        const prev2Operand = operandStack.pop(); // top - 1
        let oper = opertorStack.pop();
        // console.log(prev2Operand, oper, prev1Operand)
        const newOperand = calc(prev2Operand, oper, prev1Operand); // 순서대로
        operandStack.push( newOperand ); // 새로운 operand 추가
    }
    // console.log('\n', opertorStack, operandStack, expressionStr)
    return operandStack[0];
}

console.log(
    infixCalculator('3 + 2*8 /2 -2'), // 9
    infixCalculator('2 - 10 /5* 6 +4'), // -6
    infixCalculator('(2+10)/(9-6)'), // 4
    infixCalculator('3+ ((4*7) /2)'), // 17
)
function calc(a, oper, b) {
    if (oper === '*') {
        return a * b;
    } else if (oper === '/') {
        return a / b;
    } else if (oper === '+') {
        return a + b;
    } else if (oper === '-') {
        return a - b;
    }
}