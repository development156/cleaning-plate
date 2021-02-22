import { HTTP } from '../../../utils/http.js'
class AddScocre extends HTTP {
	
	//加分
	awardIntegrateByAdmin(params){
		return this.request({
		    url: `/admin/awardIntegrateByAdmin`,
			method: 'Get',
			data: params
		})
	}
}

export { AddScocre }