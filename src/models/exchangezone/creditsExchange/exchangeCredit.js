import {HTTP} from '../../../utils/http.js'
class exchangeCredit extends HTTP{
	exchange(PID,studentId,Date,Pname,url,integrate){
		return this.request({
			url:'/covert/getIntegrationGoods',
			method:'POST',
			header:{
			'Content-Type': 'application/json',
			        },
			data:{
				PID:PID,
				studentId:studentId,
				Date:Date,
				Pname:Pname,
				url:url,
				integrate:integrate,
				
			}
		})
	}
	
	// 提交订单
	pay(orderProductListViewList){
		return this.request({
		url:"/covert/getApplyGoods",
		method:'POST',
		header:{
		'Content-Type': 'application/json',
		        },	
				
		data:{
			orderProductListViewList:orderProductListViewList
		}
		})
	}
	//订单详情
	acquirePay(studentId,ID){
		return this.request({
		url:"/mine/getApplyInformation",
		method:'GET',
		header:{
		'Content-Type': 'application/json',
		        },	
				
		data:{
			studentId:studentId,
			ID:ID
		}
		})
	}
	// 订单支付
	orderPay(orderId,money){
		return this.request({
		url:"/covert/goApply",
		method:'POST',
		header:{
		'Content-Type': 'application/json',
		        },	
				
		data:{
			// 订单ID
			orderId:orderId,
			money:money
		}
		})
	}
	
	
}
export{
	exchangeCredit
}