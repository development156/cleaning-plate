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
		let Authorization = uni.getStorageSync('AuthTokens')
		return uni.uploadFile({
			url : 'http://47.112.121.20:8080/YouGuang_war/admin/uploadProductImg',
			filePath: params,
			header: {
			'Authorization':Authorization
			},	
			name: 'multipartFile',
		})
	}
	
	//获得所有的菜品	
	getMenu(params){
		console.log("333")
		console.log(params)
		return this.request({
		    url: `/common/getMenu`,
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