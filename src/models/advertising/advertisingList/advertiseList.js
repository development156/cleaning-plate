import {HTTP} from '../../../utils/http.js'
class getAdvertiseList extends HTTP{
	getList(type){
		return this.request({
			url:'/notice/getNotice',
			method:'GET',
			header:{
			'Content-Type': 'json',
			        },
			data:{
					// 根据类型加载公告
				type:type
				
			}
		})
	}
	getDetails(ID){
		return this.request({
			url:'/notice/getNoticeById',
			method:'GET',
			header:{
			'Content-Type': 'json',
			        },
			data:{
					// 根据类型加载公告
				ID:ID
				
			}
		})
	}
	getSlideshow(){
		return this.request({
			url:'/notice/getSlideshow',
			method:'GET',
			header:{
			'Content-Type': 'json',
			        },
		})
	}
	
}
export{
	getAdvertiseList
}