import getDatatCoordListByCoord from './coord.js'
// 获取随机数 0 - v 的随机数
function randomInt( v ) {
   return Math.floor( ( Math.random() * v ) )
}
/** 形状类 */
class SharpClass {
    // 形状 0 条 1...
    sharp
    // 形状的中心点
    sharpCoord
    // 形状的状态列表
    sharpStatus
    constructor( rows, cols ) {
        this.sharp = randomInt( 7 )
        this.sharpStatus = 0
        this.sharpCoord = {x: 1, y: Math.ceil( cols/2 ) - 1}
    }
    setSharpCoord( i, j ) {
        this.sharpCoord = {x:i, y:j}
    }
    // 获取边界点的坐标列表
    getBdaryCoordList() {
        let i = this.sharpCoord.x
        let j = this.sharpCoord.y
        return {
            all: getDatatCoordListByCoord(i,j)['all'],
            bottom: getDatatCoordListByCoord(i,j)['bottom'],
            left: getDatatCoordListByCoord(i,j)['left'],
            right: getDatatCoordListByCoord(i,j)['right']
        }
    }
    // 根据当前中心点获得当前图形的坐标值
    getSharpCoordList() {
        return this.getBdaryCoordList()['all']
    }
    // 获取当前形状的底部坐标
    getBottomCoordList() {
        return this.getBdaryCoordList()['bottom'][this.sharp][this.sharpStatus]
    }
    // 获取当前心中左侧边界坐标
    getLeftCoordList() {
        return this.getBdaryCoordList()['left'][this.sharp][this.sharpStatus]
    }
    // 获取当前形状右侧边界坐标
    getRightCoordList() {
        return this.getBdaryCoordList()['right'][this.sharp][this.sharpStatus]
    }
    // 变形边界
    getUpCoordList() {
        return this.getBdaryCoordList()['up'][this.sharp][this.sharpStatus]
    }
    getSharpCoord() {
        return this.getSharpCoordList()[ this.sharp ][ this.sharpStatus ]
    }
    setSharpStatus( v ) {
        this.sharpStatus = v
    }
    getSharpStatus() {
        return this.sharpStatus
    }
}

export default SharpClass
