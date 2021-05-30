function getDatatCoordListByCoord( i, j ) {
    return {
        all: [[
            [{x:i,y:j},{x:i+1,y:j},{x:i+2,y:j},{x:i+3,y:j}], // 竖条
            [{x:i,y:j},{x:i,y:j-1},{x:i,y:j+1},{x:i,y:j+2}] // 横条
        ],[
            [{x:i,y:j},{x:i,y:j+1},{x:i+1,y:j},{x:i+1,y:j+1}] // 方块形
        ],[
            [{x:i,y:j},{x:i+1,y:j-1},{x:i+1,y:j},{x:i+1,y:j+1}], // 锥形
            [{x:i,y:j},{x:i+1,y:j},{x:i+1,y:j+1},{x:i+2,y:j}],
            [{x:i,y:j},{x:i,y:j-1},{x:i,y:j+1},{x:i+1,y:j}],
            [{x:i,y:j},{x:i+1,y:j},{x:i+1,y:j-1},{x:i+2,y:j}]
        ],[
            [{x:i,y:j},{x:i+1,y:j},{x:i+2,y:j},{x:i+2,y:j-1}], // L形
            [{x:i,y:j},{x:i+1,y:j},{x:i+1,y:j+1},{x:i+1,y:j+2}],
            [{x:i,y:j},{x:i+1,y:j},{x:i+2,y:j},{x:i,y:j+1}],
            [{x:i,y:j},{x:i,y:j+1},{x:i,y:j+2},{x:i+1,y:j+2}]
        ],[
            [{x:i,y:j},{x:i+1,y:j},{x:i+2,y:j},{x:i+2,y:j+1}], // J形
            [{x:i,y:j},{x:i,y:j+1},{x:i,y:j+2},{x:i+1,y:j}],
            [{x:i,y:j},{x:i,y:j+1},{x:i+1,y:j+1},{x:i+2,y:j+1}],
            [{x:i,y:j},{x:i+1,y:j},{x:i+1,y:j-1},{x:i+1,y:j-2}]
        ],[
            [{x:i,y:j},{x:i-1,y:j+1},{x:i,y:j+1},{x:i+1,y:j}],
            [{x:i-1,y:j},{x:i,y:j+1},{x:i,y:j},{x:i-1,y:j-1}]
        ],[
            [{x:i,y:j},{x:i-1,y:j},{x:i,y:j+1},{x:i+1,y:j+1}],
            [{x:i-1,y:j},{x:i-1,y:j+1},{x:i,y:j},{x:i,y:j-1}]
        ]],
        bottom: [[
            [{x:i+3,y:j}],
            [{x:i,y:j},{x:i,y:j-1},{x:i,y:j+1},{x:i,y:j+2}]
        ],[
            [{x:i+1,y:j},{x:i+1,y:j+1}]
        ],[
            [{x:i+1,y:j-1},{x:i+1,y:j},{x:i+1,y:j+1}], // 锥形
            [{x:i+1,y:j+1},{x:i+2,y:j}],
            [{x:i,y:j-1},{x:i,y:j+1},{x:i+1,y:j}],
            [{x:i+1,y:j-1},{x:i+2,y:j}]
        ],[
            [{x:i+2,y:j},{x:i+2,y:j-1}], // L形
            [{x:i+1,y:j},{x:i+1,y:j+1},{x:i+1,y:j+2}],
            [{x:i+2,y:j},{x:i,y:j+1}],
            [{x:i,y:j},{x:i,y:j+1},{x:i+1,y:j+2}]
        ],[
            [{x:i+2,y:j},{x:i+2,y:j+1}], // J形
            [{x:i,y:j+1},{x:i,y:j+2},{x:i+1,y:j}],
            [{x:i,y:j},{x:i+2,y:j+1}],
            [{x:i+1,y:j},{x:i+1,y:j-1},{x:i+1,y:j-2}]
        ],[
            [{x:i,y:j+1},{x:i+1,y:j}],
            [{x:i,y:j+1},{x:i,y:j},{x:i-1,y:j-1}]
        ],[
            [{x:i,y:j},{x:i+1,y:j+1}],
            [{x:i-1,y:j+1},{x:i,y:j},{x:i,y:j-1}]
        ]]
    }
}
export default getDatatCoordListByCoord
