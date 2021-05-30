import Tires from './tires.js'
let t = new Tires()
let handerStart = ( e ) => {
    t.start( t.rows, t.cols )
    e.target.innerText = t.isStart?"结束":"开始"
}
// 页面初始化完成之后触发
document.getElementById("start").addEventListener("click", handerStart, true )

