'use strict'
import BgClass from "./bg_class"
import SharpClass from "./sharp_class"
import Score from "./score"
/**
 * 主页
 */
class Tires {
    // 页面属性
    timer
    // 当前背景
    bg
    // 当前形状
    sharp
    // isStart 是否已经开启
    isStart
    // 总分
    totalScore
    /**
     * 构造函数
     * @return {0}
     */
    constructor() {
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
    // 边界检测
    checkBdary( bdaryFlag ) {
        let funName = ['get', bdaryFlag.replace(/^\S/, s => s.toUpperCase()), 'CoordList'].join('')
        let list = this.sharp[funName]()
        for( let i=0; i<list.length; i++ ) {
            let x = list[i].x, y = list[i].y, data = this.bg.getData()
            switch( bdaryFlag ) {
                case 'down': 
                    if( data[x+1][y] >=1 ) return bdaryFlag
                    break
                case 'left':
                    if( data[x][y-1] >= 1 ) return bdaryFlag
                    break
                case 'right':
                    if( data[x][y+1] >= 1 ) return bdaryFlag
                    break
                case 'up':
                    if( data[x][y] >= 1 ) return bdaryFlag
            }
        }
        return false
    }
    // isBottom 是否到达底部
    isBottom() {
        return this.checkBdary('down') == 'down' 
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
    clearPre() {
        this.refresh( 0 )
    }
    drawCurrent() {
        this.refresh( 1 )
    }
    up() {
        // 判断是否可以变形
        if( this.isUp() ) return
        let sh = this.sharp
        this.clearPre()
        sh.sharpStatus = ++sh.sharpStatus % sh.getSharpCoordList()[sh.sharp].length
        this.drawCurrent()
    }
    down() {
        if( this.isBottom() ) return
        let sh = this.sharp
        this.clearPre()
        sh.sharpCoord.x++
        this.drawCurrent()
    }
    left() {
        if( this.isLeft() ) return
        this.clearPre()
        this.sharp.sharpCoord.y--
        this.drawCurrent()
    }
    right() {
        if( this.isRight() ) return
        this.clearPre()
        this.sharp.sharpCoord.y++
        this.drawCurrent()
    }
    start( rows, cols ) {
        this.rows = +document.getElementById("rows").value
        this.cols = +document.getElementById("cols").value
        if( !this.isStart ) {
            this.createBg()
            let sh = this.sharp = new SharpClass( this.rows, this.cols )
            this.timer = setInterval(function(){
                // 如果当前形状到达了底部
                if( this.isBottom() ) {
                    // 设置到达底部的形状
                    this.scoreSet()
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
    scoreSet(){
        //计算分数
        let data = Score.computeScore( this.bg.getData() )
        this.bg.setDataAll( data ) 
        document.getElementById("total").innerText = Score.total  
    }
    /**
     * 创建背景格子
     * @return {[type]} [description]
     */
    createBg() {
        this.bg = new BgClass( this.rows, this.cols )
        document.getElementById("map").appendChild( this.bg.create() )
        this.bg.draw()
    }
    clearBg() {
        document.getElementsByTagName("ul")[0].remove()
    }
    // 私有方法
    refresh( v ) {
        let bg = this.bg, sh = this.sharp
        let block = sh.getSharpCoord()
        for( let i=0; i<block.length; i++ ) {
            bg.setData( block[i].x, block[i].y, v )
        }
        bg.draw()
    }
}
export default Tires
