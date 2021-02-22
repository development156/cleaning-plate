<template>
	<view>
	<view class="tab">
		<view class="info">
			<view class="detail">
			<text>四川省南充市</text>
			<text>西南石油大学</text>
			<text>姓名</text>
			<text>17489731198</text>
			</view>
			<view class=""icon></view>
		</view>
		<text class="line"></text>
		<view class="way">
			<text>配送方式</text>
			<text>上门自取</text>
		</view>
	</view>
	
	<view class="goods_details" v-for="item in Item" >
		<view class="info" v-for="i in item.orderProductList">
		<image :src="imgUrl+i.url"></image>
		<view class="details">
			<text>{{i.name}}</text>
			
			<view class="countBox centerboth">
				<view class="carSub" @click="changeNum(index,item.id,2)">
					<text class="iconfont car-sub"></text>
				</view>
				<view class="cartNum">*{{i.number}}</view>
				<view class="carAdd" @click="changeNum(index,item.id,1)">
					<text class="iconfont car-add"></text>
				</view>
			</view>
			
			<text>¥{{i.univalence}}/份</text>
		</view>
		</view>
		
		<view class="total">	
		<text>共{{totalNum1}}件</text>
		<text>商品小计：¥{{totalPrice1}}</text>	
		</view>
	</view>
	
	<view class="footer">
		<view class="money">
			<text>应付：¥{{totalPrice1}}</text>
			<text>含运费：￥0.00</text>
		</view>
		<button type="submit" @click="pay">提交订单</button>
		
	</view>
	
	
	
	</view>
</template>

<script>
	// import{exchangeCredit}  from '../../mine/myOrder/myOrder.vue'
	import{exchangeCredit}  from '@/models/exchangezone/creditsExchange/exchangeCredit'
	const Exchange = new exchangeCredit()
	export default{
		onLoad(e){
			const Pid = JSON.parse(decodeURIComponent(e.item));
			this.pid = Pid;
			console.log(this.pid)
			this.acquirePay()
			
		},
		data(){
			return {
				Item:[],
				// 临时设置的id
				studentID:1,
				pid:4,
				
				// 总数量
				totalNum:0,
				totalPrice:0
				
			}
		},
		computed:{
			totalNum1(){
				for(var i=0;i<this.Item.length;i++){
					console.log(this.Item[i].orderProductList.length)
					for(var j =0;j<this.Item[i].orderProductList.length;j++)
					
						this.totalNum+=this.Item[i].orderProductList[j].number
						
					}
				return this.totalNum
			
			},
			totalPrice1(){
				for(var i=0;i<this.Item.length;i++){
					console.log(this.Item[i].orderProductList.length)
					for(var j =0;j<this.Item[i].orderProductList.length;j++)
						this.totalPrice+=this.Item[i].orderProductList[j].number*this.Item[i].orderProductList[j].univalence
					}
					return this.totalPrice
			}
			
		},
		methods:{
		acquirePay(){
			Exchange.acquirePay(this.studentID,this.pid).then(res=>{
				console.log(res.data[0].orderProductList[0].orderID)
				this.Item = res.data
				console.log(this.Item)
			})
		},
		
		// 进行支付
		pay(){
		Exchange.orderPay(this.pid,this.totalPrice).then(res=>{
			console.log(res)
			uni.showToast({
			  title: res.msg,
			  icon: "none"
			});
		})
		},
		/**
		 * 修改商品数量
		 */
		changeNum:function(index,id,type) {
			var that = this;
			var carts = that.carts;
			var number = parseInt(carts[index].number);
			if(type==2){
				number = number - 1;
				if(number<=1){
					number = 1;
				}
			}else{
				number = number + 1;
			}
			carts[index].number = number;
			this.$emit('changeNum',carts,id,type);
		},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	
	page{
		.tab{
			border-radius: 10px;
			background-color: white;
			height: 9.3125rem;
			display: flex;
			flex-direction: column;
			font-size: 0.75rem;
			.info{
				display: flex;
				justify-content: space-around;
				.detail{
					display: flex;
					flex-direction: column;
					text{
						margin-top: 0.625rem;
					
					}
				}
			}
			.line{
				height: 0.0625rem;
				margin:17px 17px 17px 1.0625rem ;
				background-color: gray;
			}
			.way{
				display: flex;
				justify-content: space-around;
			}
			
		}
		
		
	
		.goods_details{
				margin-top: 0.875rem;
			border-radius: 10px;
			border: 1px solid rgba(255, 255, 255, 100);
			background-color: #FFFFFF;
			height: 13.0625rem;
			.info{
				display: flex;
				image{
					width: 5.9375rem;
					height: 5.5rem;
					margin: 3.3125rem  0 0 1.0625rem ;
					
				}
				.details{
					margin:3.3125rem  0 0 0.5625rem;
					display: flex;
					height: 6.25rem;
					width: 14.5625rem;
					justify-content: space-around;
					flex-direction: column;
					.countBox {
						position: absolute;
						right: 140rpx;
						bottom: 25rpx;
						right: 10rpx;
						bottom: 20rpx;
					}
					
					.countBox .iconfont{
						font-size: 46rpx;
					}
					
					.cartNum {
						width: 80rpx;
						height: 50rpx;
						text-align: center;
						line-height: 50rpx;
						font-size: 32rpx;
						color: #1a256a;
					}
					
					text{
						&:nth-child(1){
							font-size: 0.75rem;
						}
						&:nth-child(2){
							font-size: 8px;
							color:#9F9F9F;
						}
					}
				}
			}
			
			.total{
				display: flex;
				margin: 1.8125rem 0 0.875rem 11.5rem;
				font-size: 0.625rem;
				
			}
		}
		.footer{
			background-color: white;
			height: 3.25rem;
			display: flex;
			justify-content: space-around;
			margin-top: 20.625rem;
			.money{
			
				font-size: 0.875rem;
				margin:0.625rem 0 0 1.25rem;
				display: flex;
				flex-direction: column;
				&:nth-child(2){
					margin-left: 2.5rem
				}
			}
			button{
				margin-top: 0.3125rem;
				border-radius: 30px;
				width: 6.9375rem;
				height: 2.5rem;
				text-align: center;
				color: white;
				background-color: #C9A65E;
			}
		}
		
		
	}
	
	
	
	
</style>
