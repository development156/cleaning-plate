import { HTTP } from '../../../utils/http.js'
class OrderManager extends HTTP {
	//管理员查看所有订单
	getAllGoods() {
	    return this.request({
	        url: `/admin/getAllOrderFirstPageByAdmin`,
			method: 'Get',
	    })
	}
	//管理员查询未发货的订单
	getUnshipment(params) {
	    return this.request({
	        url: `/admin/getUnshipment`,
			method: 'Get',
			data:params
	    })
	}
	//管理员确认发货
	ensureShipment(params) {
	    return this.request({
	        url: `/admin/ensureShipment`,
			method: 'Get',
			data:params
	    })
	}
	//查询订单详情
	getApplyInformation(params) {
		let Authorization = uni.getStorageSync('AuthTokens')
	    return this.request({
	        url: `/mine/getApplyInformation`,
			method: 'Get',
			header: {
			'Authorization':Authorization
			},	
			data:params
	    })
	}
}

export { OrderManager }