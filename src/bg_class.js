function getBlockId( i, j ) {
    return ['rows',i,'cols',j].join('_')
}
const colorConfig = ["#ccc","red"]
/** 背景类 */
class BgClass {
    cols
    rows
    data
    constructor( rows, cols ) {
        this.cols = cols
        this.rows = rows
        this.initData( rows, cols )
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

export default BgClass
