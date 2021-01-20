import { HTTP } from '../../../utils/http.js'

class OrtUpload extends HTTP {
	///剩菜板块
	//添加剩菜数据
	uploadOrt(params){
		return this.request({
		    url: ``,
			method: 'POST',
			data: params
		})
	}
	
	//获得所有剩菜数据
	getAllOrt(params){
		return this.request({
			url: ``,
			method: 'POST',
			data: params
		})
	}
	
	
}
export { OrtUpload }