import { HTTP } from '../../../utils/http.js'

class FeedBack extends HTTP {
	checkFeedback(params) {
	    return this.request({
	        url: ``,
			method: 'Get',
			data: params
	    })
	}
}

export { FeedBack }