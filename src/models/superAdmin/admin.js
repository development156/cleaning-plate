import { HTTP } from '../../utils/http.js'


class Admin extends HTTP {
	// 	查询管理员
	selectAdmin() {
	    return this.request({
	        url: `/superAdmin/selectAdmin`,
			method: 'Get',
			
	    })
	}
	
	//更改管理员
	updateAdmin(ID,adminName){
		return this.request({
		    url: `/superAdmin/updateAdmin`,
			method: 'Post',
			data:{
				ID:ID,
				adminName:adminName
			}
		})
	}
	
	// 增加管理员
	addAdmin(ID){
		return this.request({
		    url: `/superAdmin/addAdmin`,
			method: 'GET',
			
			data:{
				ID:ID
			}
		})
	}
	
	// 删除管理员
	deleteAdmin(ID){
		return this.request({
		    url: `/superAdmin/deleteAdmin`,
			method: 'GET',
			data:{
				ID:ID
			}
		})
	}
}

export { Admin }