import { HTTP } from '../../../utils/http.js'
class OrderManager extends HTTP {
	//获得所有商品
	getAllGoods(params) {
	    return this.request({
	        url: `/covert/getAllGoods`,
			method: 'Get',
			data: params
	    })
	}
	
	
}

export { OrderManager }