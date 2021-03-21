import { HTTP } from '../../../utils/http.js'

class FeedBack extends HTTP {
	//管理员查看反馈列表
	checkFeedbackList() {
	    return this.request({
	        url: `/common/getFeedBackByAdmin`,
			method: 'GET',
			
	    })
	}
	//管理员某个
	checkFeedback(id) {
	    return this.request({
	        url: `/common/getFeedBackByAdmin`,
			method: 'GET',
			data:{
			"ID":id,
			}
	    })
	}
	//删除
	deleteFeedBackByAdmin(ID) {
	    return this.request({
	        url: `/admin/deleteFeedBackByAdmin`,
			method: 'GET',
			data:{
			"ID":ID,
			}
	    })
	}
	
}

export { FeedBack }