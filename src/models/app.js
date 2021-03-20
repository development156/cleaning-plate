//AppModel的接口定义
import { HTTP } from '../utils/http.js'

class AppModel extends HTTP {
	login(params) {
        return this.request1({
            url: `/user/login`,
			method: 'GET',
			
			header:{
			'Content-Type': 'json',
			        },
			data: params

        })
    }
}

export { AppModel }
