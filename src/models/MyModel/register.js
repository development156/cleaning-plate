import { HTTP } from '../../utils/http.js'


class register extends HTTP {
	// 注册
	registerStudent(studentInfo,userDate) {
	    return this.request({
	        url: `/user/registerStudent`,
			method: 'POST',
			data: {
				studentInfo:studentInfo,
				userDate:userDate
			
			}
	    })
	}
}

export {register }