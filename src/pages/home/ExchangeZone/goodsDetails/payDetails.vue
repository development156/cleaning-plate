<template>
	<view>
		<view class="swiper">
		  <swiper 
			autoplay 
			interval="2000" 
			duration="500">
		                        <swiper-item v-for="item in images">
										<image :src="item.url" class="image"></image>
		                        </swiper-item>
		                    </swiper>
		</view>
		<view class="info" >
			<view class="item">
				<text>产品</text>
				<text>{{shopItem.name}}</text>
			</view>
			
			
			<view class="item">
			<text>描述</text>
			<text>{{shopItem.description}}</text>
			</view>
			
			
			<view class="item">
				<text>产地</text>
				<text>{{shopItem.productionPlace}}</text>
			</view>
			
			<view class="item">
				<text>销量</text>
			<text>{{shopItem.sales}}</text>
			</view>
			
			<view class="item">
			<text>金额</text>
			<text>￥{{shopItem.univalence}}</text>
			</view>
			<view class="item">
			<text>扶贫单位</text>
			<text>{{shopItem.povertyAlleviationUnit}}</text>
			</view>
			<view class="item">
			<text>扶贫详情</text>
			<text>{{shopItem.descriptionOfPovertyAlleviation}}</text>
		</view>
		
		<view class="tip">
			<text>
				配送方式
			</text>
			<text>
				免运费
				上门自取
			</text>
			
			</view>
		
		<view class="footer">
		<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
		
	</view>
	
	
</view>	
</template>

<script>
		import uniGoodsNav from '@/components/common/uni-goods-nav/uni-goods-nav.vue'
		import {addToCart} from '../../../../models/exchangezone/cart/addToCart.js'
		const AddToCart = new addToCart()
		import {swiperList} from '../../../../models/exchangezone/creditsExchange/swiperList.js'
		const SwiperList = new swiperList
		import{exchangeCredit}  from '@/models/exchangezone/creditsExchange/exchangeCredit'
		const Exchange = new exchangeCredit()
		export default{
			onLoad(e){
				
				const item = JSON.parse(decodeURIComponent(e.item));
				this.shopItem = item;
				console.log(this.shopItem)
				this.getSwiper()
				
			},
			data(){
				return{
					options: [ {
					           icon: 'cart',
					           text: '购物车',
							 
							// 这个是加入购物车的的总数量
					           info: 0,
							   
							  
							   
					       }],
					       buttonGroup: [{
					         text: '加入购物车',
					         backgroundColor: '#F6EDE1',
					         color: '#C9A65E'
					       },
					       {
					         text: '立即购买',
					         backgroundColor: '#b5a58c',
					         color: '#fff'
					       }
					       ],
						   shopItem:[],
						   images:[]
				}
			},
			components:{
				uniGoodsNav
			},
			methods:{
				onClick (e) {
					
				      uni.redirectTo({
				      url:'../cart/cart'
				      })
				     },
				     buttonClick (e) {
				      
					   if(e.index==0){
						
						  
						  const number = this.options[0].info+1
						  console.log(number)
						  console.log(this.shopItem.id)
						  // 添加购物车
						AddToCart.addToCart(this.shopItem.id,number).then(res=>{
							console.log(res)
							uni.showToast({
							  title:res.msg,
							  icon: "none"
							});
						}).catch(error=>{
							console.log(error)
						})    
					   }
				      else{
						 // 生成订单
							let PIdList={
								number:1,
								pId:this.shopItem.id
							}
							
						 	// 确认订单
						 	Exchange.pay(PIdList).then(res=>{
								console.log(res)
								console.log("啦啦啦")
						 		uni.showToast({
						 		  title:res.msg,
						 		  icon: "none"
						 		})
						 		 uni.redirectTo({
						 		url:`../acquireExchange/payAcquireExchange?item=`+ encodeURIComponent(JSON.stringify(res.data))
						 		})
						 	}).catch(error=>{
								uni.showToast({
								  title:"提交订单失败",
								  icon: "none"
								});
							})
					  }
				     },
					 // 获取轮播图数据
					 getSwiper(){
					 	console.log(this.shopItem.ID)
					 	SwiperList.GetSwiperList(this.shopItem.ID).then(res=>{
					 		console.log(res)
							this.images = res.data
							console.log(this.images)
					 	})
					 }
			}
		}
</script>

<style lang="scss" >
	
	page{
		height: 100%;
		background-color: #F5F5F5;
	
		swiper{
			border-radius: 0.3125rem;
			height: 13.4375rem;
			}
			
			.image{
				height:  13.4375rem;
				width: 100%;
			}
			
			
	
	.info{
		font-size: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		height: 100%;
		background-color: white;
		
		width: 98%;
		border-radius: 0.625rem;
		margin: 10% auto;
		.item{
			display: flex;
			justify-content: space-between;
			margin-top: 2%;
			text:nth-child(2){
				margin-right: 20%;
				width: 50%;
			}
			text:nth-child(1){
				
				color: gray;
				margin-left: 3%;
			}
			
		}
		
		
		
	}
	.tip{
		
		font-size:0.9375rem;
		width: 98%;
		border-radius: 0.625rem;
		background: white;
		margin: 5% auto;
		height:4.125rem;
		font-size: 0.9rem;
		display: flex;
		justify-content: space-between;
		text{
			margin-top: 5%;
		}
		text:nth-child(1){
			width: 4.8125rem;
			margin-left: 3%;
			text-align: center;
			height:1.4rem;
			background: -webkit-linear-gradient(-45deg, rgba(167,147,123,1) 0%,rgba(176,158,134,1) 14%,rgba(181,165,140,1) 30%,rgba(205,190,169,1) 76%,rgba(213,201,179,1) 98%,rgba(213,201,179,1) 100%,rgba(240,240,240,1) 100%,rgba(240,240,240,1) 100%);
			color: white;
			border-radius: 0.625rem;
		}
		text:nth-child(2){
			margin-right: 20%;
		}
	}
	.footer{
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		background: #FFFFFF;
		box-shadow: #f3f3f3 0rpx -5rpx 10rpx;
		height: 98rpx;
		padding: 0 300rpx 0 30rpx;
		z-index: 99;
	}
	
	}
</style>
