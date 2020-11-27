/*
- 알고리즘: 특정 작업을 수행하기위한 프로세스 또는 일련의 단계
- 문제 이해
    1, 문제를 내 언어로 재정의
    2, Input이 무엇인지 파악
    3, Output이 무엇인지 파악
    4, Input → Output이 바로 도출되는가? (추가로 필요한 정보는 무엇인가?)
    5, 문제의 중요한 데이터부분을 어떻게 라벨링할 수 있는가? (용어 정의)

- 문제에 대한 구체적 예시 파악
    1, 문제 이해를 돕는 예시 파악 / 놓친 부분을 도와주기도 함  ~ end user story & unit test
    2, 단순한 예시 → 복잡한 예시 → empty input → invalid input 으로 점진적 테스트 ( 문제를 깊히 이해하는데도 도움! )

- 분해 (케이스)
    처리해야할 흐름을 단순하게 정리함 (수도코드로 한번 정리하는 식으로?)
        ~ 코드 문법이나, 작은 함정에 빠지지 않도록 도와줌! → 단순하고 선명하게 보도록! (복잡할수록 효과!!)

- 풀이/ 단순화
    문제를 어렵게 만드는 경우를 제외하고, 가장 단순한 input에 대한 문제 풀이를 작성함.

- 돌아가서 리팩토링
        이전 솔루션을 리팩토링 한 후 새로운 솔루션 적용 ( To 성능, 가시성, 문제 풀이 (예상 못한 input, case) 다른 접근 .. )

문제 정의 & Input & Output 체크

function chartCount(str) {
    // make object to return at the end
    // loop over the string
    // look at each character if exist already in our object
    // if the character is a letter and is a key in the object, add one to count
    // if the character is a letter and not in the object, add it to the object and set value to 1
    // if character is something else (space, period, etc.) don't do anything
    // return object at the end
}

function chartCount(str) {
    // make object to return at the end
    const obj = {}

    // loop over the string
    for (let letter of str) {
        // look at each character if exist already in our object
        if (letter in count) {
            // if the character is a letter and is a key in the object, add one to count
            obj[letter]++
        } else {
            // if the character is a letter and not in the object, add it to the object and set value to 1
            obj[letter] = 1
        }
    }
    // return object at the end
    return obj
}

function chartCount(str) {
    const obj = {}

    for (let char of str) {
        char = char.toLowerCase();
        if ( /[a-z|0-9|가-힣]/.test(char) ) {
            if (obj[char] > 0) {
                obj[char++];
            } else {
                obj[char] = 1;
            }
        }
    }
    return obj
}
*/

function chartCount(str) {
    const obj = {}

    for (let letter of str) {
        letter = letter.toLowerCase()
        const code = letter.charCodeAt(0)
        if ( 
            (code > 47 && code < 58) ||  // ASCII ~ 0-9
            (code > 64 && code < 91) || // ASCII ~ A-Z
            (code > 96 && code < 123) // ASCII ~ a-z
        ) { 
            obj[letter] = ++obj[letter] || 1
        }
    }
    return obj
}
console.log( chartCount('qwdhn 가 ㅁ오ㅓ g 12'))

// 늘 생각하기
// 다른 사람은 어떻게 풀었지? 나는 어떻게 더 발전시키지? ( 스타일 성능 ...)