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
			url : '/admin/uploadProductImg',
			filePath: params,
			name: 'file',
			formData: {//????
			 'user': 'test'
			},
		})
	}
	
	//获得所有的菜品	
	getMenu(params){
		console.log(params)
		return this.request({
		    url: `/admin/getMenu`,
			method: 'GET',
			data: params
		})
	}
}
export { FoodUpload }