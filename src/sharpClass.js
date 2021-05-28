/** 工具方法 */
 // 获取随机数 0 - v 的随机数
function randomInt( v ) {
    return Math.floor( ( Math.random() * v ) )
}
function getBlockId( i, j ) {
    return ['rows',i,'cols',j].join('_')
}
const Event = {
    trigger( eventName, obj ) {
        window.dispatchEvent(new CustomEvent( eventName, {
            detail: obj
        }))
    },
    on( eventName, callback ) {
        window.addEventListener( eventName, function( e ) {
            console.log( '自定义事件数据：', e )
            callback && callback( e.detail )
        })
    }
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
    /** 事件处理 start */
    // 变形
    up() {
        Event.trigger('clear', this )
        this.sharpStatus = ++this.sharpStatus % this.sharpCoordList[this.sharp].length
        this.setSharpCoordList()
        Event.trigger('refresh', this)
    }
    down() {
        Event.trigger('clear', this )
        this.sharpCoord.x++
        this.setSharpCoordList()
        Event.trigger('refresh', this )
    }
    left() {
        Event.trigger('clear', this)
        this.sharpCoord.y--
        this.setSharpCoordList()
        Event.trigger('refresh', this)
    }
    right() {
        Event.trigger('clear', this)
        this.sharpCoord.y++
        this.setSharpCoordList()
        Event.trigger('refresh', this)
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
        // this.initEvent()
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
/** 数据服务类 */
class DataService {

}
class Page1 {
    // dom节点
    $dom
    // window节点
    $window
    //构造器
    constructor() {}
    // dom创建完成时调用
    created() {

    }
    // dom挂载在真正的dom节点上调用
    mounted() {

    }
    // dom销毁时调用
    destory() {

    }
}
class IndexPage extends Page1 {
    constructor() {
        super()
    }
    // 重写created方法
    created(){

    }
    //重写挂载方法
    mounted() {

    }
}
class Page {
    // 页面属性
    timer
    bg
    constructor() {
        // 页面拼接虚拟dom
        // dom = template(  )
        // 页面初始化完成之后触发
        let rows = document.getElementById("rows").value
        let cols = document.getElementById("cols").value

        this.bg = new BgClass( rows, cols )
        document.getElementById("map").appendChild( this.bg.create() )
        document.getElementById("start").addEventListener("click", ( e ) => {
            this.start( rows, cols )
        })

        // 监听事件
        // this.initEvent()
    }
    // 页面方法
    initEvent(sh) {
        // 清除图形事件
        Event.on("clear", (sh)=>{
            this.refresh(this.bg,sh,0)
        })
        // 刷新图形事件
        Event.on("refresh", ( sh ) =>{
            this.refresh(this.bg,sh,1)
        })
        // 系统事件
        document.addEventListener("keydown",( e ) =>{
            // console.log( e.keyCode )
            switch( e.keyCode ) {
                case 37: sh.left();break;
                case 38: sh.up();break;
                case 39: sh.right();break;
                case 40: sh.down();break;
            }
        })
    }
    start( rows, cols ) {
        let sharp = new SharpClass( rows, cols )
        this.timer = setInterval(function(){
            sharp.down()
        }, 1000)
        this.initEvent(sharp)
    }
    // 私有方法
    refresh(bg,sh,v) {
        let block = sh.getSharpCoord()
        for( let i=0; i<block.length; i++ ) {
            bg.setData( block[i].x, block[i].y, v )
        }
        bg.draw()
    }
}
function main() {
    new Page({
        data: {},
        created() {},
        mounted() {},
        methods: {

        }
    })
}
main()
