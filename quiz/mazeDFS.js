// 깊이우선탐색(DFS)에 재귀문과 stack

/*
1, 현재 위치에 방문했다 표시
2, 현재 위치가 출구라면 종료
3, 현위치에서 북동남서 순으로,
    a) 그 방향 이동 가능한지(벽x, 미로밖x, 이미방문x)
    b) 갈 수 있으면 그 방향으로 이동 ~ 현 위치를 스택에 push
4, 3에서 아무방향으로도 못가면, 왔던 곳으로 돌아감 ~ stack에서 pop한 위치로 돌아감
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
    WAY_BEFORE: 2,
    WAY_FAILED: 3,
}

function stackMaze(maze) {
    const cpMaze = maze.slice();
    const mazeEnd = [ maze.length - 1, maze[0].length - 1 ];
    const pathStack = [];
    let current = [0,0];
    cpMaze[0][0] = 2; // 온 곳 체크

    while(1) {
        let noWay = true; // 길 여부
        if ( current[0] === mazeEnd[0] && current[1] === mazeEnd[1] ) { // 도착 했으면 리턴
            console.log('done');
            console.log(JSON.stringify(cpMaze));
            break;
        }
        // 길 찾기 작업
        for(let i = 0; i < 4; i++) {
            if(goPossible(current, i)) { // 갈 수 있으면
                pathStack.push(current.slice()); // 옮기기 전, pathStack에 넣음
                console.log('go', current)
                move(current, i);
                noWay = false;
                console.log(JSON.stringify(cpMaze));
                break;
            }
        }
        if ( noWay ) { // 아무 갈 곳이 없으면 롤백
            console.log('rollback!!')
            cpMaze[current[0]][current[1]] = roadType.WAY_FAILED;
            current = pathStack.pop();
        }
    }
    console.log('finish')
    function goPossible(currentPoint, dir) {
        const movedX = currentPoint[0] + DIRECTION[dir].point[0];
        const movedY = currentPoint[1] + DIRECTION[dir].point[1];
        if ( movedX < 0 || movedX >= maze.length || movedY < 0 || movedY >= maze[0].length ) { // 미로 밖
            return false;
        }
        if (cpMaze[ movedX ][ movedY ] === 0) { // path
            return true;
        }
        return false; // 그 외
    }
    function move(currentPoint, dir) {
        const movedX = currentPoint[0] + DIRECTION[dir].point[0];
        const movedY = currentPoint[1] + DIRECTION[dir].point[1];
        // 미로 표시
        cpMaze[ movedX ][ movedY ] = roadType.WAY_BEFORE;
        // current 바꿔줌
        currentPoint[0] = movedX;
        currentPoint[1] = movedY;
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
