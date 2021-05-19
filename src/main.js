import BlockUI from './BlockUI.js'
// 定时器
let timer, sharp = -1
// 暂停游戏
function gameStop() {
    clearInterval( timer )
}
// 游戏开始
function gameStart( ui ) {
    // let self = this, isBottom = 0
    timer = setInterval(function(){
        sharp = sharp != -1 ? sharp : ui.createShape()
        console.log( '当期形状：', sharp )
        ui.down( sharp )
    }, 1000);
}
// 游戏结束
function gameOver() {

}
window.onload = function() {
    // start()
    let isStart = 0;
    let rows = document.getElementById("rows").value
    let cols = document.getElementById("cols").value
    let ui = new BlockUI( rows, cols )
    document.getElementById("start").addEventListener("click", function( e ){
        if( !isStart ) {
            gameStart( ui );
            this.innerText = "暂停";
			isStart = 1;
        } else {
            gameStop();
            this.innerText = "继续";
			isStart = 0;
        }
    })
}
