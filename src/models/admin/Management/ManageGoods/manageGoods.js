import { HTTP } from '../../../../utils/http.js'
class ManageGoods extends HTTP {
	//管理员增加产品
	addGoods(params) {
	    return this.request({
	        url: `/admin/addGoods`,
			method: 'POST',
			data: params
	    })
	}
	//上传图片
	uploadPictrue(params){
		
		return  uni.uploadFile({
		    url: 'http://8.131.230.3:8080/YouGuang_war/admin/uploadProductImg',
			filePath: params,
			name: 'multipartFile',
	
		})
	}
	//删除产品
	deleteGoods(params) {
	    return this.request({
	        url: `/admin/deleteGoods`,
			method: 'Get',
			data: params
	    })
	}
	//更新产品(未作)
	updateGoods(params) {
	    return this.request({
	        url: `/admin/updateGoods`,
			method: 'POST',
			data: params
	    })
	}
	
	//查询产品(用用户的)
	
}

export { ManageGoods }