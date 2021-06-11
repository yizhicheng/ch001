function getBlockId( i, j ) {
    return ['rows',i,'cols',j].join('_')
}
const colorConfig = ["#ddd","gray"]
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
        let iLength = rows + 2
        let jLength = cols + 2
        for ( let i=0; i<iLength; i++ ) {
            this.data[i] = []
            for( let j=0; j<jLength; j++ ) {
                let v = i==0 || i==iLength - 1 || j==0 || j== jLength -1? 1 : 0
                this.setData( i, j, v )
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
    setDataAll( data ) {
        this.data = data
    }
    getData() {
        return this.data
    }
}

export default BgClass
