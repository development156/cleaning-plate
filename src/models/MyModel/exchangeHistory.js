import { HTTP } from '../../utils/http.js'


class MyModel extends HTTP {
	// 	 我的兑换界面
	
	convertHistory(params) {
	    return this.request({
	        url: `/mine/getMyConvert`,
			method: 'Get',
			data: {
				studentId:params
			}
	    })
	}
	
	// 所有人兑换的历史列表
	allHistoty(){
		return this.request({
		    url: `/covert/getHistory`,
			method: 'Get',
			
		})
	}
}

export { MyModel }