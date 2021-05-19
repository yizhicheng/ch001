/**
* UI层面用于界面生成
* date: 2021-5-14
* author: yzc
*/
import BlockData from './BlockData.js'
/**
* 工具方法
*/
function getBlockId( i, j ) {
    return ['rows',i,'cols',j].join('_')
}
// 颜色配置 BlockUI的背景颜色
const colorConfig = ["#ccc","red"]

class BlockUI {
    constructor( rows, cols ) {
        this.blockData = new BlockData( rows, cols )
        this.createUI(  this.blockData.getData()  )
        this.initEvent()
    }
    // 创建背景格子
    createUI( data ) {
        let dom = document.createElement( "ul" )
	    for( let i = 0; i < data.length; i++ ) {
	        let li = document.createElement( "li" )
	        for( let j = 0; j < data[i].length; j++ ){
	            let div = document.createElement( "div" );
	            div.setAttribute( "id", getBlockId( i, j ));
	            li.appendChild( div );
	        }
	        dom.appendChild( li );
	    }
        document.getElementById("map").appendChild( dom )
    }
    // keyCode 37左键
    // keyCode 39右键
    // keyCode 38上
    // keyCode 40下
    initEvent() {
        let self = this
        document.addEventListener("keydown", ( e ) => {
            let sharp = self.blockData.getSharpValue()
            switch( e.keyCode ) {
                case 37:
                    self.blockData.left( sharp )
                    break;
                case 39:
                    self.blockData.right( sharp )
                    break;
                case 38:
                    self.blockData.up( sharp )
                    break;
                case 40:
                    self.blockData.down( sharp )
                    break;
            }
            self.draw()
        } )
    }
    // 绘制图形
    draw() {
        let data = this.blockData.getData()
        for( let i=0; i<data.length; i++ ) {
            for( let j=0; j<data[i].length; j++ ) {
                document.getElementById( getBlockId(i,j) ).setAttribute("style","background-color:"+colorConfig[data[i][j]]);
            }
        }
    }
    // 上下左右的操作
    down( sharp ) {
        this.blockData.down( sharp )
        this.draw()
    }
    left( sharp ) {
        this.blockData.left( sharp )
        this.draw()
    }
    right( sharp ) {
        this.blockData.right( sharp )
        this.draw()
    }
    up( sharp ) {
        this.blockData.up( sharp )
        this.draw()
    }
    getSharpValue() {
        return this.blockData.getSharpValue()
    }
    createShape() {
        return this.blockData.createShape()
    }
}
export default BlockUI
