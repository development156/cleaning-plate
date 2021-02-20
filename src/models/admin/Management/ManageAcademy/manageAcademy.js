import { HTTP } from '../../../../utils/http.js'

class ManageAcademy extends HTTP {
	//获得所有的学院
	getCollegeNameList() {
	    return this.request({
	        url: `/common/getCollegeNameList`,
			method: 'Get',
	    })
	}
	//管理员添加学院信息
	addCollegeInfo(params) {
	    return this.request({
	        url: `/admin/addCollegeInfo`,
			method: 'POST',
			data:params
	    })
	}
	
	//删除学院
	deleteCollegeInfo(params) {
		console.log(params)
	    return this.request({
	        url: `/admin/deleteCollegeInfo`,
			method: 'POST',
			data:params.ID
	    })
	}
	//获得所有的专业信息
	getAllProfession(params) {
	    return this.request({
	        url: `/common/getAllProfession`,
			method: 'Get',
			data:params
	    })
	}
}


export { ManageAcademy }