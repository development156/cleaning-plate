import {HTTP} from '../../../utils/http.js'
class addToCart extends HTTP{
	addToCart(PID,studentId,number){
		return this.request({
			url:'/covert/addToShoppingCart',
			method:'POST',
			header:{
			'content-type': 'application/json; charset=UTF-8',
			        },
			dataType:' json',
			data:{
				// 商品ID
				PID:PID,
				// 学号
				studentId:studentId,
				// 数量
				number:number
			}
		})
	}
	
	
	
	
}
export{
	addToCart
}