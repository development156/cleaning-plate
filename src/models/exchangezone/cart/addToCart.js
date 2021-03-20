import {HTTP} from '../../../utils/http.js'
class addToCart extends HTTP{
	addToCart(PID,number){
		return this.request({
			url:'/covert/addToShoppingCart',
			method:'POST',
			header:{
			'Content-Type': 'application/json',
			        },
			data:{
				// 商品ID
				PID:PID,
			
				// 数量
				number:number
			}
		})
	}
	
	
	
	
}
export{
	addToCart
}