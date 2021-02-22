import { HTTP } from '../../utils/http.js'

class Upload extends HTTP {
	//公告发布界面
	uploadNotice(params) {
	    return this.request({
	        url: `/admin/uploadNotice`,
			method: 'POST',
			header:{
			'Content-Type': 'json',
			        },
			data: params
	    })
	}
	
	//添加菜品
	uploadMenu(params){
		return this.request({
		    url: `/admin/addMenu`,
			method: 'POST',
			data: params
		})
	}
	
	//添加剩菜
	uploadOrt(params){
		return this.request({
		    url: ``,
			method: 'POST',
			data: params
		})
	}
	
	
}

export { Upload }