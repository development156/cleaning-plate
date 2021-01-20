import { HTTP } from '../../../utils/http.js'
class AddScocre extends HTTP {
	//显示待处理的专业
	showRowMajor(params) {
	    return this.request({
	        url: ``,
			method: 'Get',
			data: params
	    })
	}
	////显示已处理的专业
	showRipeMajor(params){
		return this.request({
		    url: ``,
			method: 'Get',
			data: params
		})
	}
}

export { AddScocre }