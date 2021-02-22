import { HTTP } from '../../utils/http.js'


class UploadHistory extends HTTP {
	// 	上传历史
	uploadHistory(studentId) {
	    return this.request({
	        url: `/mine/getUploadHistory`,
			method: 'Get',
			data: {
				studentId:studentId
			}
	    })
	}
}

export { UploadHistory  }