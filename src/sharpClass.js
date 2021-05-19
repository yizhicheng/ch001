/** 工具方法 */
 // 获取随机数 0 - v 的随机数
function randomInt( v ) {
    Math.floor( ( Math.random() * v ) )
}
function getBlockId( i, j ) {
    return ['rows',i,'cols',j].join('_')
}
const colorConfig = ["#ccc","red"]
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
    constructor( rows, cols ) {
        this.sharp = randomInt( 7 )
        this.sharpCoord = {x: 0, y: Math.ceil( cols/2 ) - 1}
        this.setSharpCoordList()
    }
    setSharpCoord( i, j ) {
        this.sharpCoord = {x:i, y:j}
    }
    setSharpCoordList() {
        let i = this.sharpCoord.x
        let j = this.sharpCoord.y
        this.sharpCoordList = [[
            [{x:i,y:j},{x:i+1,y:j},{x:i+2,y:j},{x:i+3,y:j}],
            [{x:i,y:j},{x:i,y:j-1},{x:i,y:j+1},{x:i,y:j+2}]
        ],[],[],[],[],[],[]]
    }
    getSharpCoordList() {
        return this.sharpCoordList
    }
    /** 事件处理 start */
    up() {

    }
    down() {

    }
    left() {

    }
    right() {

    }
    /** 事件处理 end  */
}
/** 背景类 */
class BgClass {
    cols
    rows
    data
    constructor( rows, cols ) {
        this.cols = cols
        this.rows = rows
        this.initData( rows, cols )
    }
    initData( rows, cols ) {
        // 初始化背景的值
        this.data = []
        for ( let i=0; i<rows; i++ ) {
            this.data[i] = []
            for( let j=0; j<cols; j++ ) {
                this.setData( i, j, 0 )
            }
        }
    }
    create() {
        let data = this.data
        let dom = document.createElement( "ul" )
	    for( let i = 0; i < data.length; i++ ) {
	        let li = document.createElement( "li" )
	        for( let j = 0; j < data[i].length; j++ ){
	            let div = document.createElement( "div" );
	            div.setAttribute( "id", getBlockId( i, j ) );
	            li.appendChild( div );
	        }
	        dom.appendChild( li );
	    }
        return dom
    }
    draw() {
        let data = this.getData()
        for( let i=0; i<data.length; i++ ) {
            for( let j=0; j<data[i].length; j++ ) {
                document.getElementById( getBlockId(i,j) ).setAttribute("style","background-color:"+colorConfig[data[i][j]]);
            }
        }
    }
    setData( i, j, v ) {
        this.data[i][j] = v
    }
    getData() {
        return this.data
    }
}
/** 数据服务类 */
class DataService {

}

function main() {
    let rows = document.getElementById("rows").value
    let cols = document.getElementById("cols").value
    let bg = new BgClass( rows, cols )
    document.getElementById("map").appendChild( bg.create() )
}
main()
