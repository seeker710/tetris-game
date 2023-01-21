export const ROW = 20;
export const COLUMN = 10;

export const createBoard = () => [...Array(ROW)].map(rowItem => Array(COLUMN).fill([0, 'clear']));

export const TETROMINOES = {
    0: {
        shape: [[0]],
        color: '0, 0, 0'
    },
    I: {
        shape: [
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0]
        ],
        color: '80, 227, 230'
    },
    J: {
        shape: [
            [0, 'J', 0],
            [0, 'J', 0],
            ['J', 'J', 0]
        ],
        color: '36, 95, 223'
    },
    L: {
        shape: [
            [0, 'L', 0],
            [0, 'L', 0],
            [0, 'L', 'L']
        ],
        color: '223, 173, 36'
    },
    O: {
        shape: [
            ['O', 'O'],
            ['O', 'O']
        ],
        color: '223, 217, 36'
    },
    S: {
        shape: [
            [0, 'S', 'S'],
            ['S', 'S', 0],
            [0, 0, 0]
        ],
        color: '48, 211, 56'
    },
    T: {
        shape: [
            [0, 'T', 0],
            ['T', 'T', 'T'],
            [0, 0, 0]
        ],
        color: '132, 61, 198'
    },
    Z: {
        shape: [
            ['Z', 'Z', 0],
            [0, 'Z', 'Z'],
            [0, 0, 0]
        ],
        color: '227, 78, 78'
    }
};

export const randomTetromino = () => {
    var s = "IJLOSTZ";
    return TETROMINOES[s[Math.floor(Math.random() * s.length)]];
}

export const checkCollision = (player, stage, {x: moveX, y: moveY}) => {
    for(var y=0; y<player.tetromino.length; ++y) {
        for(var x=0; x<player.tetromino[y].length; ++x) {
            if(player.tetromino[y][x] !== 0) {
                if(((y+player.pos.y+moveY)===20) || 
                ((x+player.pos.x+moveX)===-1) || 
                ((x+player.pos.x+moveX)===10) ||
                (stage[y+player.pos.y+moveY][x+player.pos.x+moveX][1] !== "clear")) {
                    return true;
                }
            }
        }
    }
    return false;
}