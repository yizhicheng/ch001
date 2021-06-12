function getDatatCoordListByCoord( i, j ) {
    
    return {
        "all": [[
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
            [{x:i+1,y:j},{x:i,y:j+1},{x:i+1,y:j+1},{x:i+2,y:j}],
            [{x:i,y:j},{x:i+1,y:j+1},{x:i+1,y:j},{x:i,y:j-1}]
        ],[
            [{x:i+1,y:j},{x:i,y:j},{x:i+1,y:j+1},{x:i+2,y:j+1}],
            [{x:i,y:j},{x:i,y:j+1},{x:i+1,y:j},{x:i+1,y:j-1}]
        ]],
        "down": [[
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
            [{x:i+1,y:j+1},{x:i+2,y:j}],
            [{x:i+1,y:j+1},{x:i+1,y:j},{x:i,y:j-1}]
        ],[
            [{x:i+1,y:j},{x:i+2,y:j+1}],
            [{x:i,y:j+1},{x:i+1,y:j},{x:i+1,y:j-1}]
        ]],
        "left": [[
            [{x:i,y:j},{x:i+1,y:j},{x:i+2,y:j},{x:i+3,y:j}], // 竖条
            [{x:i,y:j-1}] // 横条
        ],[
            [{x:i,y:j},{x:i+1,y:j}] // 方块形
        ],[
            [{x:i,y:j},{x:i+1,y:j-1}], // 锥形
            [{x:i,y:j},{x:i+1,y:j},{x:i+2,y:j}],
            [{x:i,y:j-1},{x:i+1,y:j}],
            [{x:i,y:j},{x:i+1,y:j-1},{x:i+2,y:j}]
        ],[
            [{x:i,y:j},{x:i+1,y:j},{x:i+2,y:j-1}], // L形
            [{x:i,y:j},{x:i+1,y:j}],
            [{x:i,y:j},{x:i+1,y:j},{x:i+2,y:j}],
            [{x:i,y:j},{x:i+1,y:j+2}]
        ],[
            [{x:i,y:j},{x:i+1,y:j},{x:i+2,y:j}], // J形
            [{x:i,y:j},{x:i+1,y:j}],
            [{x:i,y:j},{x:i+1,y:j+1},{x:i+2,y:j+1}],
            [{x:i,y:j},{x:i+1,y:j-2}]
        ],[
            [{x:i+1,y:j},{x:i,y:j+1},{x:i+2,y:j}],
            [{x:i+1,y:j},{x:i,y:j-1}]
        ],[
            [{x:i+1,y:j},{x:i,y:j},{x:i+2,y:j+1}],
            [{x:i,y:j},{x:i+1,y:j-1}]
        ]],
        "right": [[
            [{x:i,y:j},{x:i+1,y:j},{x:i+2,y:j},{x:i+3,y:j}], // 竖条
            [{x:i,y:j+2}] // 横条
        ],[
            [{x:i,y:j+1},{x:i+1,y:j+1}] // 方块形
        ],[
            [{x:i,y:j},{x:i+1,y:j+1}], // 锥形
            [{x:i,y:j},{x:i+1,y:j+1},{x:i+2,y:j}],
            [{x:i,y:j+1},{x:i+1,y:j}],
            [{x:i,y:j},{x:i+1,y:j},{x:i+2,y:j}]
        ],[
            [{x:i,y:j},{x:i+1,y:j},{x:i+2,y:j}], // L形
            [{x:i,y:j},{x:i+1,y:j+2}],
            [{x:i+1,y:j},{x:i+2,y:j},{x:i,y:j+1}],
            [{x:i,y:j+2},{x:i+1,y:j+2}]
        ],[
            [{x:i,y:j},{x:i+1,y:j},{x:i+2,y:j+1}], // J形
            [{x:i,y:j+2},{x:i+1,y:j}],
            [{x:i,y:j+1},{x:i+1,y:j+1},{x:i+2,y:j+1}],
            [{x:i,y:j},{x:i+1,y:j}]
        ],[
            [{x:i,y:j+1},{x:i+1,y:j+1},{x:i+2,y:j}],
            [{x:i,y:j},{x:i+1,y:j+1}]
        ],[
            [{x:i,y:j},{x:i+1,y:j+1},{x:i+2,y:j+1}],
            [{x:i,y:j+1},{x:i+1,y:j}]
        ]],
        "up": [[
            [{x:i,y:j-1},{x:i,y:j+1},{x:i,y:j+2}],[{x:i+1,y:j},{x:i+2,y:j},{x:i+3,y:j}] // 横条
        ],[
            [] // 方块形
        ],[
            [{x:i+2,y:j}],[{x:i+1,y:j-1}],[{x:i-1,y:j}],[{x:i+1,y:j+1}]
        ],[
            [{x:i+1,y:j+1},{x:i+1,y:j+2}],[{x:i,y:j+1},{x:i+2,y:j}],[{x:i,y:j+2},{x:i+1,y:j+2}],[{x:i+1,y:j},{x:i+2,y:j},{x:i+2,y:j-1}]
        ],[
            [{x:i,y:j+1},{x:i,y:j+2}], // J形
            [{x:i+1,y:j+1},{x:i+2,y:j+1}],
            [{x:i+1,y:j},{x:i+1,y:j-1},{x:i+1,y:j-2}],
            [{x:i+2,y:j},{x:i+2,y:j+1}]
        ],[
            [{x:i,y:j},{x:i,y:j-1}],
            [{x:i,y:j+1},{x:i+2,y:j}]
        ],[
            [{x:i+1,y:j-1},{x:i,y:j+1}],
            [{x:i+1,y:j+1},{x:i+2,y:j+1}]
        ]]
    }
}
export default getDatatCoordListByCoord
