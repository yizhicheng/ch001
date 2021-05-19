/**
* @file game1.js
* @brief 俄罗斯方块第一版
* @author yzc
* @version 1.0
* @date 2021-05-03
*/
var timer;
// 行数，
var rows = 30;
// 列数
var cols = 19;

var currentI = 0;

var currentJ = Math.ceil( cols/2 ) - 1;

// sharpMap 形状对应的值及方法
var sharpMap = [{
	'sharpName': '条形',
	'sharpValue': 0,
	'sharpLabel': 'Bar',
	'draw': function(i, j) {

		var preBlock = [{ x: i - 1, y: j }, { x: i, y: j }, { x: i + 1, y: j }, { x: i + 2, y: j }];
		var currentBlock = [{ x: i, y: j }, { x: i + 1, y: j }, { x: i + 2, y: j }, { x: i + 3, y: j }];

		setBackground( preBlock, currentBlock );

	}
}, {
	'sharpName': '田字形',
	'sharpValue': 1,
	'sharpLabel': 'Field',
	'draw': function(i, j) {

		var preBlock = [{ x: i - 1, y: j }, { x: i, y: j }, { x: i-1, y: j + 1 }, { x: i , y: j + 1 }];
		var currentBlock = [{ x: i, y: j }, { x: i + 1, y: j }, { x: i, y: j + 1 }, { x: i + 1, y: j + 1 }];

		setBackground( preBlock, currentBlock );

	}
}, {
	'sharpName': '山字形',
	'sharpValue': 2,
	'sharpLabel': 'Mountain',
	'draw': function(i, j) {
		var preBlock = [{ x: i - 1, y: j }, { x: i, y: j - 1 }, { x: i, y: j + 1 }, { x: i + 1, y: j }];
		var currentBlock = [{ x: i, y: j }, { x: i + 1, y: j - 1 }, { x: i + 1, y: j + 1 }, { x: i + 1, y: j }];

		setBackground( preBlock, currentBlock );
	}
}, {
	'sharpName': 'L形',
	'sharpValue': 3,
	'sharpLabel': 'L',
	'draw': function(i, j) {
		var preBlock = [{ x: i - 1, y: j }, { x: i, y: j }, { x: i + 1, y: j }, { x: i + 1, y: j + 1 }];
		var currentBlock = [{ x: i, y: j }, { x: i + 1, y: j }, { x: i + 2, y: j }, { x: i + 2, y: j + 1 }];

		setBackground( preBlock, currentBlock );

	}

}, {
	'sharpName': '反L形',
	'sharpValue': 4,
	'sharpLabel': 'AntiL',
	'draw': function(i, j) {

		var preBlock = [{ x: i - 1, y: j }, { x: i, y: j }, { x: i + 1, y: j }, { x: i + 1, y: j - 1 }];
		var currentBlock = [{ x: i, y: j }, { x: i + 1, y: j }, { x: i + 2, y: j }, { x: i + 2, y: j - 1 }];

		setBackground( preBlock, currentBlock );

	}
}, {
	'sharpName': 'N形',
	'sharpValue': 5,
	'sharpLabel': 'N',
	'draw': function(i, j) {

		var preBlock = [{ x: i - 1, y: j }, { x: i, y: j }, { x: i, y: j - 1 }, { x: i + 1, y: j - 1 }];
		var currentBlock = [{ x: i, y: j }, { x: i + 1, y: j }, { x: i + 1, y: j - 1 }, { x: i + 2, y: j - 1 }];

		setBackground( preBlock, currentBlock );

	}
}, {
	'sharpName': '反N形',
	'sharpValue': 6,
	'sharpLabel': 'AntiN',
	'draw': function(i, j) {

		var preBlock = [{ x: i - 1, y: j }, { x: i, y: j }, { x: i, y: j + 1 }, { x: i + 1, y: j + 1}];
		var currentBlock = [{ x: i, y: j }, { x: i + 1, y: j }, { x: i + 1, y: j + 1 }, { x: i + 2, y: j + 1 }];

		setBackground( preBlock, currentBlock );

	}
}];

/************************ Data 层 ********************************/
var BlockData = function( rows, cols ) {
	// 背景格子
	this.data = [];
	// 当前形状
	this.currentSharp = [];
	// 当前形状的值
	this.currentSharpVal = 0;

	// 私有方法 -- 初始化背景格子
	function init() {
		for( var i=0; i<rows; i++ ) {
			for( var j=0; j<cols; j++ ) {
				this.setValue( i, j, 0 );
			}
		}
		console.log('格子数据：', this.data);
	}
	// 私有方法 -- 设置背景元素的值
	function setValue( i, j, v ) {
		this.data[i][j] = v;
	}

	// 私有方法 -- 根据下标获取形状
	function getSharpBlock( i, j ) {
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
	this.init( rows, cols );

}
BlockData.prototype = {
	// 外部方法 -- 设置形状对应的方块的值
	setSharpValue: function( i, j, sharp, val ) {
		var sharpBlock = this.getSharpBlock( i, j, sharp );
		for (var k = 0; k < sharpBlock.length; k++ ) {
			this.setValue( i, j, val );
		}
	},
	createShape: function() {
		this.currentSharp = Math.floor( ( Math.random() * 7 ) );
	}
}

var getBlockId = function( i, j ) {
	return ['row',i,'col',j].join('_');
}

var getBlockDomById = function( id ) {
	return document.getElementById( id );
}

var setBackground = function( preBlock, block ) {

	if( preBlock[ 0 ].x >= 0 ) {
		for(var i = 0; i< preBlock.length; i++ ) {
		    setBlockBackground( preBlock[i].x, preBlock[i].y , '#ccc' );
	    }
	}

	for( var j = 0; j< block.length; j++ ) {
		setBlockBackground( block[j].x, block[j].y, 'red' );
	}
}
var setBlockBackground = function( x, y, color ) {
	var dom = document.getElementById( getBlockId( x, y ) );
	dom.setAttribute('style', 'background-color:' + color );
}

// 生成游戏格子
var initMap = function( rows, cols ) {
    var dom = document.createElement( "ul" );
    for( var i = 0; i < rows; i++ ) {
        var li = document.createElement( "li" );
        for( var j = 0; j < cols; j++ ){
            var div = document.createElement( "div" );
            div.setAttribute( "id", "row_" + i + "_col_" + j );
            li.appendChild( div );
        }
        dom.appendChild( li );
    }
    document.getElementById("map").appendChild( dom );
}

// 生成图形 形状一共有 0 横条竖条，1正方形，2山字形，3L形，4反L形，5N字形，6反N字形
var createShape = function() {
	return Math.floor( ( Math.random() * 7 ) );
}

// 游戏开始
var gameStart = function() {
	var i = currentI, j = currentJ, sharp = createShape();
	timer = setInterval(function(){
			if( isBottom() ) {
				currentI = 0;
				sharp = createShape();
			} else {
                i = currentI;
				j = currentJ;
                // console.log( sharp );
				draw( i, j, sharp );
				i++;
				currentI = i;
				currentJ = j;
			}
	}, 1000);
}

var isBottom = function() {
	return rows - 1 <= currentI
}

var draw = function( i, j, sharp ) {
    sharpMap[ sharp ]['draw']( i, j );
}
var gameStop = function() {
	clearInterval( timer );
}
window.onload = function() {
    initMap( rows, cols );
    initEvent();
}

var initEvent = function() {
    var isStart = 0;
    document.getElementById("start").addEventListener("click", function( e ){
        if( !isStart ) {
            gameStart();
            this.innerText = "暂停";
			isStart = 1;
        } else {
            gameStop();
            this.innerText = "继续";
			isStart = 0;
        }
    });
}
