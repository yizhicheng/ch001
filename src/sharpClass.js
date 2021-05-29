/** 工具方法 */
 // 获取随机数 0 - v 的随机数
function randomInt( v ) {
    return Math.floor( ( Math.random() * v ) )
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
	            let div = document.createElement( "div" )
	            div.setAttribute( "id", getBlockId( i, j ) )
	            li.appendChild( div )
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
class Page {
    // 页面属性
    timer
    // 当前背景
    bg
    // 当前形状
    sharp
    constructor() {
        // 页面拼接虚拟dom
        // dom = template(  )
        // 页面初始化完成之后触发
        this.rows = document.getElementById("rows").value
        this.cols = document.getElementById("cols").value

        this.bg = new BgClass( this.rows, this.cols )
        document.getElementById("map").appendChild( this.bg.create() )
        document.getElementById("start").addEventListener("click", ( e ) => {
            this.start( this.rows, this.cols )
        })

        // 监听事件
        this.initEvent()
        return this
    }
    // 页面方法
    initEvent() {
        let eventConfig = [{'keyCode': 37,'funName': 'left'},{'keyCode': 38,'funName': 'up'},{'keyCode': 39,'funName': 'right'},{'keyCode': 40,'funName': 'down'}]
        // 系统事件
        document.addEventListener("keydown",( e ) =>{
            let funName = eventConfig.filter( item => {
                return item.keyCode == e.keyCode
            })
            funName && this[funName]()
        })
    }
    up() {
        let sh = this.sharp
        sh.sharpStatus = ++sh.sharpStatus % sh.sharpCoordList[sh.sharp].length
        // sh.setSharpCoordList()
        // this.refresh( 1 )
    }
    down() {
        // this.refresh( 0 )
        // let sh = this.sharp
        this.sharp.sharpCoord.x++
        // sh.setSharpCoordList()
        // this.refresh( 1 )
    }
    left() {
        // this.refresh( 0 )
        // let sh = this.sharp
        this.sharp.sharpCoord.y--
        // sh.setSharpCoordList()
        // this.refresh( 1 )
    }
    right() {
        // this.refresh( 0 )
        // let sh = this.sharp
        this.sharp.sharpCoord.y++
        // sh.setSharpCoordList()
        // this.refresh( 1 )
    }
    start( rows, cols ) {
        // 监听当前形状对象的变化
        // let obj = this.sharpCoord
        // wactch 变化
        let handler = {
            set( target, key ) {
                console.log( target, key )
            },
            construct(target, args, newTarget){
                return Reflect.construct(target, args, newTarget)
            }
        }
        let ProxySharpClass = new Proxy(SharpClass,handler)
        this.sharp = new ProxySharpClass( rows, cols )
        this.timer = setInterval(function(){
            this.down()
        }.bind(this), 1000)
        this.initEvent()
    }
    // 私有方法
    refresh( v ) {
        console.log( this.rows, this.cols )
        let bg = this.bg, sh = this.sharp
        let block = sh.getSharpCoord()
        for( let i=0; i<block.length; i++ ) {
            block[i].x>=0 &&
            block[i].y>=0 &&
            block[i].x<= this.rows &&
            block[i].y<= this.cols &&
            bg.setData( block[i].x, block[i].y, v )
        }
        bg.draw()
    }
}
function main() {
    new Page()
}
main()
