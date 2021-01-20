import {HTTP} from '../../../utils/http.js'
class swiperList extends HTTP{
	GetSwiperList(PID){
		return this.request({
			url:'/covert/getProductionImg',
			method:'GET',
			header:{
			'Content-Type': 'json',
			        },
			data:{
				// 商品ID
				PID:PID
			}
		})
	}
	
}
export{
	swiperList
}