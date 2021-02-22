import { HTTP } from '../../../utils/http.js'

class OrtUpload extends HTTP {
	///剩菜板块
	//添加剩菜数据
	uploadOrt(params){
		return this.request({
		    url: `/admin/uploadWasteInfo`,
			method: 'GET',
			data: params
		})
	}
	//获得所有剩菜数据
	getAllOrt(){
		return this.request({
			url: `/covert/getAllWasteInfo`,
			method: 'GET',
			
		})
	}
	//获得所有剩菜统计数据
	getTotalWasteInfo(){
		return this.request({
			url: `/common/getTotalWasteInfo`,
			method: 'GET',
			
		})
	}
	//获得近七天剩饭菜得数据
	getSevenDayWasteFood(){
		return this.request({
			url: `/covert/getSevenDayWasteFood`,
			method: 'GET',
			
		})
	}
	//获得近七个月剩饭菜得数据
	getSevenYearFood(){
		return this.request({
			url: `/covert/getSevenYearFood`,
			method: 'GET',
			
		})
	}

	
}
export { OrtUpload }