import { HTTP } from '../../../utils/http.js'

class Common extends HTTP {

	//获取每个学院每周得上传比率
	getUploadRatio(){
		return this.request({
			url: `/common/getUploadRatio`,
			method: 'GET',
			
		})
	}
	
	//查询各专业年级近一个月的上传率
	getProfessionUploadRationMonth(params){
		return this.request({
			url: `/common/getProfessionUploadRationMonth`,
			method: 'GET',
			data:params
		})
	}
}
export { Common }