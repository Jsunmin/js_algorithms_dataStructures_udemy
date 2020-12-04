// 넓이우선탐색(BFS)에 queue

/*
1, 하나의 큐를 만듦
2, 위치(0,0)는 이미 방문한 위치임을 표시, 큐에 위치(0,0)을 넣는다.
3, 큐가 빌 때까지 다음을 반복
    a) 큐에서 하나의 위치 p를 꺼낸다.
    b) p에서 한 칸 떨어진 위치들 중, 이동 가능하면서 아직 방문하지 않은 모든 위치들을 방문된 위치임을 표시하고 큐에 넣는다..
    c) 만약 그 위치가 출구라면 종료한다.

*/
const DIRECTION = {
    0: {
        key: 'N',
        point: [ -1, 0 ],
    },
    1: {
        key: 'E',
        point: [ 0, 1 ],
    },
    2: {
        key: 'S',
        point: [ 1, 0 ],
    },
    3: {
        key: 'W',
        point: [ 0, -1 ],
    },
};

const roadType = {
    PATH: 0,
    WALL: 1,
    // 다녀간 곳은 -1 부터 -n까지
}

function stackMaze(maze) {
    const mazeEnd = [ maze.length - 1, maze[0].length - 1 ];
    const pathQueue = [ [0,0] ]; // 입구 시작
    maze[0][0] = -1; // 온 곳 체크

    while(1) {
        let noWay = true;
        if ( current[0] === mazeEnd[0] && current[1] === mazeEnd[1] ) { // 도착 했으면 리턴
            console.log('found destination');
            break;
        }
        // 현재 위치
        let current = pathQueue.shift();
        // 길 찾기 작업
        for(let i = 0; i < 4; i++) {
            if(goPossible(current, i)) { // 갈 수 있으면
                const newCurrent = move(current, i); // 이동하고 (cur 변화) 기존 길 표시
                pathQueue.push(newCurrent); // 갈 수 있는 길 enqueue
                noWay = false;
                console.log('go', newCurrent)
                console.log(pathQueue)
                console.log(JSON.stringify(maze));
                // break; ~ 갈 수 있는 곳은 전부 queue에 넣고 종료한다.
            }
        }
        if ( noWay ) {
            console.log('no destination');
            break;
        }
    }
    console.log('finish')
    function goPossible(currentPoint, dir) {
        const movedX = currentPoint[0] + DIRECTION[dir].point[0];
        const movedY = currentPoint[1] + DIRECTION[dir].point[1];
        if ( movedX < 0 || movedX >= maze.length - 1 || movedY < 0 || movedY >= maze[0].length - 1 ) { // 미로 밖
            return false;
        }
        if (maze[ movedX ][ movedY ] === 0) { // path
            return true;
        }
        return false; // 그 외
    }
    function move(currentPoint, dir) {
        const movedX = currentPoint[0] + DIRECTION[dir].point[0];
        const movedY = currentPoint[1] + DIRECTION[dir].point[1];
        // 미로 표시
        maze[ movedX ][ movedY ] = maze[ currentPoint[0] ][ currentPoint[1] ] - 1; // 기존보다 + 1된 바운더리임을 표시
        // 새로운 current 리턴
        return [ movedX, movedY ];
    }
}

console.log(
    stackMaze([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0],
        [0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0],
        [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0],
        [0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    ]),
)
