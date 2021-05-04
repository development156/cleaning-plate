import { HTTP } from '../../../utils/http.js'

class AnnoncementUpload extends HTTP {
	//公告发布界面
	uploadNotice(params) {
	    return this.request({
	        url: `/admin/addNotice`,
			method: 'POST',
			// header:{
			// 'Content-Type': 'application/json',
			//         },
			data: params
	    })
	}	
	//上传图片
	uploadPictrue(params){
		let Authorization = uni.getStorageSync('AuthTokens')
		return  uni.uploadFile({
		    url: 'http://47.119.143.146:8080/YouGuang_war/notice/uploadNoticeImg',
			header: {
			'Authorization':Authorization
			},	
			filePath: params,
			name: 'multipartFile',
	
		})
	}
}

export { AnnoncementUpload }