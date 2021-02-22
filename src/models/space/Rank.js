import { HTTP } from '../../utils/http.js'


class Rank extends HTTP {
	// 	 获取个人排名
	getPerRank() {
	    return this.request({
	        url: `/space/getPersonRank`,
			method: 'Get',
			
	    })
	}
	
	//集体荣誉度排名
	getClassRank(){
		return this.request({
		    url: `/space/getCollectivityRank`,
			method: 'Get',
			
		})
	}
}

export { Rank }