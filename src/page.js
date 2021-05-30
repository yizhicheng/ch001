import BgClass from "./bg_class.js"
import SharpClass from "./sharp_class.js"
/**
 * 主页
 */
class Page {
    // 页面属性
    timer
    // 当前背景
    bg
    // 当前形状
    sharp
    // isStart 是否已经开启
    isStart
    // isBottom 是否到达底部
    isBottom() {
        return this.checkBdary('bottom') == 'bottom'
    }
    // 边界检测
    checkBdary( bdaryFlag ) {
        let strArr = ['get', bdaryFlag.replace(/^\S/, s => s.toUpperCase()), 'CoordList']
        let list = this.sharp[strArr.join('')]()
        for( let i=0; i<list.length; i++ ) {
            let x = list[i].x, y = list[i].y, data = this.bg.getData()
            if( x + 1 >= this.rows ) return bdaryFlag
            if( data[x+1][y] >=1 ) return bdaryFlag
        }
        return false
    }
    // 到达左方
    isLeft() {
        return this.checkBdary('left') == 'left'
    }
    isRight() {
        return this.checkBdary('right') == 'right'
    }
    isUp() {
        return this.checkBdary('up') == 'up'
    }
    constructor() {
        // 页面初始化完成之后触发
        document.getElementById("start").addEventListener("click", ( e ) => {
            this.start( this.rows, this.cols )
            e.target.innerText = this.isStart?"结束":"开始"
        }, true )
        // 监听事件
        this.initEvent()
    }
    // 页面方法
    initEvent() {
        let eventConfig = {37: 'left', 38: 'up', 39: 'right', 40: 'down'}
        let hander = ( e ) =>{
            this[eventConfig[e.keyCode]] && this[eventConfig[e.keyCode]]()
        }
        // 系统事件
        window.addEventListener("keyup", hander, true)
    }
    clearPre() {
        this.refresh( 0 )
    }
    drawCurrent() {
        this.refresh( 1 )
    }
    up() {
        if( this.isUp() ) return
        this.clearPre()
        let sh = this.sharp
        sh.sharpStatus = ++sh.sharpStatus % sh.sharpCoordList[sh.sharp].length
        this.drawCurrent()
    }
    down() {
        if( this.isBottom() ) return
        let sh = this.sharp
        if( sh.sharpCoord.x < this.rows -1 ){
            this.clearPre()
            sh.sharpCoord.x++
            this.drawCurrent()
        }
    }
    left() {
        if( this.isLeft() ) return
        if( this.sharp.sharpCoord.y>1 ) {
            this.clearPre()
            this.sharp.sharpCoord.y--
            this.drawCurrent()
        }
    }
    right() {
        if( this.isRight() ) return
        if( this.sharp.sharpCoord.y < this.cols - 1) {
            this.clearPre()
            this.sharp.sharpCoord.y++
            this.drawCurrent()
        }
    }
    start( rows, cols ) {
        this.rows = document.getElementById("rows").value
        this.cols = document.getElementById("cols").value
        if( !this.isStart ) {
            this.createBg()
            let sh = this.sharp = new SharpClass( this.rows, this.cols )
            this.timer = setInterval(function(){
                // 如果当前形状到达了底部
                if( this.isBottom() ) {
                    // 设置到达底部的形状
                    this.refresh( 1 )
                    sh = this.sharp = new SharpClass( this.rows, this.cols )
                } else {
                    this.down()
                }
            }.bind(this), 1000)
        } else {
            clearInterval( this.timer )
            this.clearBg()
        }
        this.isStart = !this.isStart
    }
    createBg() {
        this.bg = new BgClass( this.rows, this.cols )
        document.getElementById("map").appendChild( this.bg.create() )
    }
    clearBg() {
        document.getElementsByTagName("ul")[0].remove()
    }
    // 私有方法
    refresh( v ) {
        // console.log( this.rows, this.cols )
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
export default Page
