import {HTTP} from '../../../utils/http.js'
class CartList extends HTTP{
	getCartList(studentId){
		return this.request({
			url:'/covert/getPersonAllShoppingCart',
			method:'GET',
			header:{
			'Content-Type': 'application/json',
			        },
			data:{
				// 学号
				studentId:studentId,
				
			}
		})
	}
	delCartList(idList){
		return this.request({
			url:'/covert/batchDeleteShoppingCartInfo',
			method:'POST',
			header:{
			'Content-Type': 'application/json',
			        },
			data:[idList]
		})
	}
	
	changeNum(ID,flag){
		return this.request({
			url:'/covert/addNumber',
			method:'GET',
			header:{
			'Content-Type': 'application/json',
			        },
			data:{
			ID:ID,
			flag:flag
				
			}
		})
	}
	
}
export{
	 CartList
}