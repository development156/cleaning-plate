import { HTTP } from '../../utils/http.js'

// 菜品展示
class FoodShow  extends HTTP {
	
	getFood(diningRoom,floor,window) {
	    return this.request({
	        url: `/admin/getMenu`,
			method: 'Get',
			data: {
				diningRoom:diningRoom,
				floor:floor,
				window:window
			}
	    })
	}
	getCanteenName(){
		return this.request({
		    url: `/covert/getCanteenName`,
			method: 'Get',
		})
	}
	getCanteenInfo(CanteenName){
		return this.request({
		    url: `/covert/getCanteenInfo`,
			method: 'Get',
			data: {
				CanteenName:CanteenName
			}
		})
	}

}

export { FoodShow}