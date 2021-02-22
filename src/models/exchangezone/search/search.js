import {HTTP} from '../../../utils/http.js'
class search extends HTTP{
	doSearch(keyword){
		return this.request({
			url:'/common/searchProduction',
			method:'GET',
			
			data:{
				// 商品ID
				keyword:keyword
			}
		})
	}
}
export{
	search
}