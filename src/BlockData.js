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
// 当前形状对应的状态
const currentSharpStatus = Symbol("currentSharpStatus")
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
        this[data] = []
        for( let i=0; i<rows; i++ ) {
            this[data].push([])
            for( let j = 0; j<cols; j++ ) {
                this[data][i].push( 0 )
            }
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
    [getSharpBlock]( i, j, sharp ) {
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
			this[setValue]( sharpBlock[k].x, sharpBlock[k].y, val );
		}
	}
    // 清除上一次的图形的状态
    clearPreSharpValue( sharp ) {
        let coord = this[currentSharpCoord]
        let i = coord.x, j = coord.y
        this.setSharpValue( i, j, sharp, 0 )
    }
    // 设置新的中心点
    setCurrentSharpCoord( i, j ){
        this[currentSharpCoord] = {
            x: i,
            y: j
        }
    }

    down( sharp ) {
        let coord = this[currentSharpCoord]
        let i = coord.x, j = coord.y
        this.clearPreSharpValue( sharp )
        this.setCurrentSharpCoord( i+1, j )
        this.setSharpValue( i+1, j, sharp, 1 )
    }
    up() {
        let coord = this.currentSharpCoord
        let i = coord.x, j = coord.y
        this.setCurrentSharpCoord( i+1, j )
    }
    left( sharp ) {
        let coord = this[currentSharpCoord]
        let i = coord.x, j = coord.y
        this.clearPreSharpValue( sharp )
        this.setCurrentSharpCoord( i, j - 1 )
        this.setSharpValue( i, j-1, sharp, 1 )
    }
    right( sharp ) {
        let coord = this[currentSharpCoord]
        let i = coord.x, j = coord.y
        this.clearPreSharpValue( sharp )
        this.setCurrentSharpCoord( i, j + 1 )
        this.setSharpValue( i, j+1, sharp, 1 )
    }
    // 获取中心点的值
    getCurrentSharpCoord() {
        return this[currentSharpCoord]
    }
    // 创建形状
	createShape () {
		this[currentSharpVal] = Math.floor( ( Math.random() * 7 ) );
        return this[currentSharpVal]
	}
    getData() {
        return this[data]
    }
    getSharpValue() {
        return this[currentSharpVal]
    }
    // 检测是否到达底部
}

export default BlockData
