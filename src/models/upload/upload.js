import {HTTP} from '../../utils/http.js'
class upload extends HTTP{
	Getupload(file,studentId){		
	return	uni.uploadFile({
			url:'/Img/uploadImg',
			filePath: file,
			formData:{
			studentId:studentId,
					},											  
	})
	
}
}
export{
	upload
}