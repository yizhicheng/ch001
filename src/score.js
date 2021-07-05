/**
 * 分数类用于计算分数等 100,300,600,1000
 */
class Score {
	constructor() {
		this.scoreConfig = [100,300,600,1000]
		this.total = 0
		this.cScore = 0
	}
	computeScore( data ) {
		let newdata = []
		let k=0
		let cols
		for( let i=0; i<data.length; i++ ){
			if(i==0||i==data.length-1) continue
			newdata[k] = []
			let t=0
			for( let j=0; j<data[i].length-1; j++ ) {
				cols = data[i].length
				if(j==0)continue
				newdata[k][t] = data[i][j]
				t++
			}
			k++
		}
		// 遍历所有的行
		var level=0
		var rows = []
		for (var i = 0; i < newdata.length; i++) {
			let row_col=0
			for(var j=0;j<newdata[i].length;j++){
				if(newdata[i][j]==1){
					row_col++
				}
			}
			if( row_col==newdata[i].length ) {
				level++
				rows.push(i)
			}
		}
		
		if(rows.length>0){
			// 删除掉已经满行的元素
			data = data.filter( (item, ix) => {
				return rows.indexOf(ix-1)==-1
			})
			let arr = []
			for( let i=0;i<data[0].length;i++ ){
				let val = i==0||i==data[0].length-1 ? 1:0
				arr.push( val )
			}
			// 追加行
			for( var i=0;i<rows.length;i++ ){
				data.splice(1,0,arr)
			}
			this.setTotal( this.total + this.scoreConfig[level - 1] )
		}
		
		return data
	}
	getScore() {
		return this.total
	}
	setTotal( total ) {
		this.total = total
	}
}
export default new Score