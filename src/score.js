/**
 * 分数类用于计算分数等 100,300,600,1000
 */
class Score {
	total // 总分
	cScore
	constructor() {
		this.scoreConfig = [100,300,600,1000]
		this.total = 0
		this.cScore = 0
	}
	computeScore( data ) {
		let ci = 0
		for( let i=0; i<data.length; i++ ) {
			let cj = 0
			for( let j=0; j<data[i].length; j++ ) {
				if( data[i][j] == 1 ) {
					cj++
				}
			}
			if( cj == data[i].length ) ci++
		}
		this.cScore = this.scoreConfig[ci - 1]*ci
		this.setTotal( this.total + this.cScore )
	}
	getScore( data ) {
		return this.total
	}
	setTotal( total ) {
		this.total = total
	}
}
export default new Score