import {HTTP} from '../../../utils/http.js'
class getGoodlist extends HTTP{
	getGoodList(flag,pageNum){
		return this.request({
			url:'/covert/getAllGoods',
			method:'GET',
			header:{
			'Content-Type': 'json',
			        },
			data:{
					// 判断是否是支付还是积分的标志
				flag:flag,
				// 开始页
				pageNum:pageNum
			}
		})
	}
	
}
export{
	getGoodlist
}