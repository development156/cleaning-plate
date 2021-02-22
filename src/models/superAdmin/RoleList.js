import { HTTP } from '../../utils/http.js'


class RoleList extends HTTP {
	// 	 查询申请权限列表
	getRoleList() {
	    return this.request({
	        url: `/superAdmin/getApplyRolesList`,
			method: 'Get',
			
	    })
	}
	
	
}

export { RoleList }