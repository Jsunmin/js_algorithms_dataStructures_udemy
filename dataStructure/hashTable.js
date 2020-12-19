/* 
hashTable: key/value 쌍을 저장하는데 사용

    삽입 - O(log N)
    서칭 - O(log N)

    대부분의 언어에 이미 구현되어 있음 (dictionary, object, maps, hashes..)

    1, 해시함수: 특정 key를 value 저장된 배열의 인덱스로 변환하는 작업 수행하는 함수 ~ 구현을 배열로 함
      사용자key를 특정 key로 변환할때, 
        1.빠르고 
        2. 특정 key가 안나오도록 최대한 균등하게 분포 ( 주로 큰 소수를 활용 )
        3. 동일한 입력이 동일한 출력을 리턴해야 함!
    2, 충돌: 사실 넓은 저장공간(배열)과 좋은 해시함수로도 충돌은 불가피..
      이를 처리하기 위해, separate chaining / linear probing 방식을 활용함
        1, separate chaining: 해당 key(index)에 여러 자료를 둘 수 있도록, 배열 or 링크드 리스트로 세팅 (기존에는 그냥 value)
        2, linear probing: 충돌 발견시, 다음칸의 빈 슬롯을 찾음 → 해당 공간에 키 맵핑 ( 모든 칸이 그냥 value로 유지)
*/

class hashTable {
    // 사이즈 또한 큰 소수일수록 충돌이 적다!
    constructor(size = 53) {
        this.keyMap = new Array(size);
    }
    // 해시함수
    _hash(key) {
        let total = 0;
        // 충돌을 막기 위한 키분산을 위해서! (= 중복 최소화)
        const primeNumber = 31;
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            let value = key.charCodeAt(i) - 96;
            // a 97부터 시작 --> index 1부터 & prime써서 균일화 높임
            total = ( total * primeNumber + value ) % this.keyMap.length; // 할당된 데이터 공간만큼 인덱스 줄여줌
        }
        return total
    }
    set(key, value) {
        const hashedKey = this._hash(key);
        // seperate chaining 방식
        if ( !this.keyMap[hashedKey] ) {
            this.keyMap[hashedKey] = [];
        }
        this.keyMap[hashedKey].push([key, value]);
    }
    get(key) {
        const hashedKey = this._hash(key);
        if ( !this.keyMap[hashedKey] ) {
            return undefined;
        } else {
            let answer = undefined;
            // seperate chaining에 따라 생성된 value 배열 검사해야 함
            this.keyMap[hashedKey].find( data => {
                const [ k, v ] = data;
                if ( k === key ) {
                    answer = v;
                }
            });
            return answer;
        }
    }
}

const ht = new hashTable(17);
ht.set("hello world", "goodbye");
ht.set("hello a", "good a");
ht.set("hello b", "good b");
ht.set("hello c", "good c");
ht.set("hi world", "good aa");
console.log(ht.keyMap)
console.log(ht.get("hello world"));
console.log(ht.get("hello a"));
console.log(ht.get("hello b"));
console.log(ht.get("hello c"));
console.log(ht.get("hi world"));
