import { HTTP } from '../../../utils/http.js'

class AnnoncementUpload extends HTTP {
	//公告发布界面
	uploadNotice(params) {
	    return this.request({
	        url: `/admin/uploadNotice`,
			method: 'POST',
			header:{
			'Content-Type': 'application/json',
			        },
			data: params
	    })
	}	
}

export { AnnoncementUpload }