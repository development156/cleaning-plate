import { HTTP } from '../../utils/http.js'


class MyFeedBack extends HTTP {
	// 反馈信息
	postFeedback(studentId,description) {
	    return this.request({
	        url: `/mine/postFeedback`,
			method: 'POST',
			data: {
				studentId:studentId,
				description:description
			}
	    })
	}
	
	feedbackList(){
		return this.request({
		    url: `/admin/getFeedBackByAdmin`,
			method: 'GET',
			
		})
	}
	
}

export { MyFeedBack }