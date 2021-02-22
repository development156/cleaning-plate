import { HTTP } from '../../utils/http.js'


class orderList extends HTTP {
	// 订单列表
	getOrderFirstPage(studentId,state) {
	    return this.request({
	        url: `/mine/getOrderFirstPage`,
			method: 'GET',
			data: {
				studentId:studentId,
				state:state,
			
			}
	    })
	}
	
	//确认订单
	acquireOrder(studentId,ID){
		return this.request({
		url:"/mine/ensureOdrder",
		method:'GET',
		header:{
		'Content-Type': 'application/json',
		        },	
				
		data:{
			studentId:studentId,
			ID:ID
		}
		})
	}
	
	// 修改订单
	updateOrder(ID,contactWay,shippingAdress){
		return this.request({
		url:"/mine/updateOrderByUser",
		method:'POST',
		header:{
		'Content-Type': 'application/json',
		        },	
				
		data:{
			ID:ID,
			contactWay:contactWay,
			shippingAdress:shippingAdress
		}
		})
	}
	
}

export { orderList }