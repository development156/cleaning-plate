import { HTTP } from '../../../utils/http.js'

class FoodUpload extends HTTP {
//菜品板块
	//添加菜品
	uploadMenu(params){
		return this.request({
		    url: `/admin/addMenu`,
			method: 'POST',
			data: JSON.stringify(params)
		})
	}


	//添加菜品图片
	uploadPicture(params){
		return uni.uploadFile({
			url : 'http://8.129.51.225:8080/YouGuang_war/admin/uploadProductImg',
			filePath: params,
			name: 'multipartFile',
		})
	}
	
	//获得所有的菜品	
	getMenu(params){
		return this.request({
		    url: `/admin/getMenu`,
			method: 'GET',
			data: params
		})
	}
	
	//删除菜品
	deleteMenu(params){
		return this.request({
		    url: `/admin/deleteMenu`,
			method: 'GET',
			data: params
		})
	}
}
export { FoodUpload }