import BgClass from "./bg_class.js"
import SharpClass from "./sharp_class.js"


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
        return true
    }
    constructor() {
        // 页面拼接虚拟dom
        // 页面初始化完成之后触发
        document.getElementById("start").addEventListener("click", ( e ) => {
            this.start( this.rows, this.cols )
            e.target.innerText = this.isStart?"结束":"开始"
            // 监听事件
            this.initEvent()
        })
    }
    // 页面方法
    initEvent() {
        let eventConfig = {37: 'left', 38: 'up', 39: 'right', 40: 'down'}
        // 系统事件
        document.addEventListener("keydown",( e ) =>{
            this[eventConfig[e.keyCode]]()
        })
    }
    beforeChange() {
        this.refresh( 0 )
    }
    afterChange() {
        this.sharp.setSharpCoordList()
        this.refresh( 1 )
    }
    up() {
        this.beforeChange()
        let sh = this.sharp
        sh.sharpStatus = ++sh.sharpStatus % sh.sharpCoordList[sh.sharp].length
        this.afterChange()
    }
    down() {
        this.beforeChange()
        let sh = this.sharp
        sh.sharpCoord.x++
        this.afterChange()
    }
    left() {
        this.beforeChange()
        this.sharp.sharpCoord.y--
        this.afterChange()
    }
    right() {
        this.beforeChange()
        this.sharp.sharpCoord.y++
        this.afterChange()
    }
    start( rows, cols ) {
        this.rows = document.getElementById("rows").value
        this.cols = document.getElementById("cols").value
        if( !this.isStart ) {
            this.createBg()
            let sh = this.sharp = new SharpClass( this.rows, this.cols )
            this.timer = setInterval(function(){
                // 如果当前形状到达了底部
                if( !this.isBottom() ) {
                    // 设置到达底部的形状
                    this.refresh( 1 )
                    sh = this.sharp = new SharpClass( this.rows, this.cols )
                } else {
                    this.down()
                }
            }.bind(this), 1000)
            this.initEvent()
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
function main() {
    new Page()
}
main()