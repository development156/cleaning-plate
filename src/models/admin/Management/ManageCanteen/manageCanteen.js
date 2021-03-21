import { HTTP } from '../../../../utils/http.js'

class ManageCanteen extends HTTP {
	//获取所有食堂的名称
	getCanteenName() {
	    return this.request({
	        url: `/covert/getCanteenName`,
			method: 'GET',
	    })
	}
	//根据食堂和楼层 获得窗口
	getCanteenWindows(params) { //
	    return this.request({
	        url: `/common/getCanteenWindows`,
			method: 'GET',
			data:params
	    })
	}
	//获取相应食堂的楼层及窗口信息
	getCanteenInfo(params) { //
	    return this.request({
	        url: `/covert/getCanteenInfo`,
			method: 'GET',
			data:params
	    })
	}
	//管理员添加食堂信息
	addCanteenInfo(params) {
	    return this.request({
	        url: `/admin/addCanteenInfo`,
			method: 'POST',
			data:params
	    })
	}
	//管理员删除食堂信息
	deleteCanteenInfo() {
	    return this.request({
	        url: `/admin/deleteCanteenInfo`,
			method: 'POST',
	    })
	}
	
}

export { ManageCanteen }