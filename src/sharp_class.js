// 获取随机数 0 - v 的随机数
function randomInt( v ) {
   return Math.floor( ( Math.random() * v ) )
}
/** 形状类 */
class SharpClass {
    // 形状 0 条 1...
    sharp
    // 形状对应的坐标列表
    sharpCoordList
    // 形状的中心点
    sharpCoord
    // 形状的状态列表
    sharpStatus
    // 底部判断坐标
    bottomCoord
    // 左部判断坐标
    leftCoord
    // 右部判断坐标
    rightCoord
    constructor( rows, cols ) {
        this.sharp = randomInt( 7 )
        this.sharpStatus = 0
        this.sharpCoord = {x: 1, y: Math.ceil( cols/2 ) - 1}
        this.setSharpCoordList()
        // return this
    }
    setSharpCoord( i, j ) {
        this.sharpCoord = {x:i, y:j}
    }
    setSharpCoordList() {
        let i = this.sharpCoord.x
        let j = this.sharpCoord.y
        this.sharpCoordList = [[
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
        ]]
    }
    getSharpCoordList() {
        return this.sharpCoordList
    }
    // 获取当前图形边界点列表
    // getCurrentBdaryCoordList() {
    //     let list = this.getBdaryCoordList()
    //     return list[''][ this.sharp ][ this.sharpStatus ]
    // }
    // 获取边界点的坐标列表
    getBdaryCoordList() {
        let i = this.sharpCoord.x
        let j = this.sharpCoord.y
        return {
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
                
            ]],
            left: [],
            right: []
        }
    }
    // 获取当前形状的底部坐标
    getBottomCoordList() {
        this.getBdaryCoordList()['bottom'][this.sharp][this.sharpStatus]
    }
    // 获取当前心中左侧边界坐标
    getLeftCoordList() {
        this.getBdaryCoordList()['left'][this.sharp][this.sharpStatus]
    }
    // 获取当前形状右侧边界
    getRightCoordList() {
        this.getBdaryCoordList()['right'][this.sharp][this.sharpStatus]
    }
    getSharpCoord() {
        return this.sharpCoordList[ this.sharp ][ this.sharpStatus ]
    }
    setSharpStatus( v ) {
        this.sharpStatus = v
    }
    getSharpStatus() {
        return this.sharpStatus
    }
}

export default SharpClass
