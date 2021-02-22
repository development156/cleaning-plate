import { HTTP } from '../../utils/http.js'


class MyInfo extends HTTP {
	// 	 修改个人信息界面
	getMyInformation(studentId) {
	    return this.request({
	        url: `/mine/getMyInformation`,
			method: 'Get',
			data: {
				studentId:studentId
			}
	    })
	}
}

export { MyInfo }