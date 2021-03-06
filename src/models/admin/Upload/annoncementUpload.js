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
		
		return  uni.uploadFile({
		    url: 'http://8.129.51.225:8080/YouGuang_war/notice/uploadNoticeImg',
			filePath: params,
			name: 'multipartFile',
	
		})
	}
}

export { AnnoncementUpload }