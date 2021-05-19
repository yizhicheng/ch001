/**
* @file BLockData.js
* @brief 俄罗斯方块第三版
* @author yzc
* @version 3.0
* @date 2021-05-14
*/
// 声明私有属性
//所有节点的值
const data = Symbol("data")
// 当前形状的对应的值
const currentSharpVal = Symbol("currentSharpVal")
// 当前形状对应的中心节点的坐标
const currentSharpCoord = Symbol("currentSharpCoord")


// 声明私有方法
const initData = Symbol("initData")
const initCurrentSharpCoord = Symbol("initCurrentSharpCoord")
const getSharpBlock = Symbol("getSharpBlock")
const setValue = Symbol("setValue")


class BlockData {
    /* 属性data */
    /* 属性currentSharp */

    /** 构造方法 */
    constructor( rows, cols ) {
        this[initData]( rows, cols )
        this[initCurrentSharpCoord]( cols )
    }
    // 初始化背景格子数据的值
    [initData]( rows, cols ) {
        this[data] = new Array( rows )
        for( let i = 0; i<rows; i++ ) {
            this[data][i] = new Array( cols )
            this[data][i].fill( 0 )
        }
    }
    // 当前形状对应的中心节点的坐标
    [initCurrentSharpCoord]( cols ) {
        // 初始化当前中心节点的值
        this[currentSharpCoord] = {
            x: 0,
            y: Math.ceil( cols/2 ) - 1
        }
    }
    // 私有方法定义 设置格子的值
    [setValue]( i, j, v) {
        this[data][i][j] = v;
    }
    // 私有方法定义
    [getSharpBlock]( i, j ) {
        var sharpBlock = [];
		switch ( sharp ) {
			case 0: sharpBlock = [{ x: i, y: j }, { x: i + 1, y: j }, { x: i + 2, y: j }, { x: i + 3, y: j }]; break;
			case 1: sharpBlock = [{ x: i, y: j }, { x: i + 1, y: j }, { x: i, y: j + 1 }, { x: i + 1, y: j + 1 }]; break;
			case 2: sharpBlock = [{ x: i, y: j }, { x: i + 1, y: j - 1 }, { x: i + 1, y: j + 1 }, { x: i + 1, y: j }]; break;
			case 3: sharpBlock = [{ x: i, y: j }, { x: i + 1, y: j }, { x: i + 2, y: j }, { x: i + 2, y: j + 1 }]; break;
			case 4: sharpBlock = [{ x: i, y: j }, { x: i + 1, y: j }, { x: i + 2, y: j }, { x: i + 2, y: j - 1 }]; break;
			case 5: sharpBlock = [{ x: i, y: j }, { x: i + 1, y: j }, { x: i + 1, y: j - 1 }, { x: i + 2, y: j - 1 }]; break;
			case 6: sharpBlock = [{ x: i, y: j }, { x: i + 1, y: j }, { x: i + 1, y: j + 1 }, { x: i + 2, y: j + 1 }]; break;
		}
		return sharpBlock;
    }

    // 外部方法 -- 设置形状对应的方块的值
	setSharpValue ( i, j, sharp, val ) {
		var sharpBlock = this[getSharpBlock]( i, j, sharp );
		for (var k = 0; k < sharpBlock.length; k++ ) {
			this[setValue]( i, j, val );
		}
	}
    // 创建形状
	createShape () {
		this[currentSharpVal] = Math.floor( ( Math.random() * 7 ) );
	}
    getData() {
        return this[data]
    }
}

export default BlockData
