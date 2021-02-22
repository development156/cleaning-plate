import { HTTP } from '../../utils/http.js'


class User extends HTTP {
	// 	 查询用户
	selectUser() {
	    return this.request({
	        url: `/superAdmin/selectAllUser`,
			method: 'Get',
			
	    })
	}
	
	
}

export { User }