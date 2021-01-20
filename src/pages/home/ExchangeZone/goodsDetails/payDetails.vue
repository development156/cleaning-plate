<template>
	<view>
		<view class="swiper">
		  <swiper 
			autoplay 
			interval="2000" 
			duration="500">
		                       <swiper-item>
		                           <view class="swiper-item uni-bg-red">
		                       		<image :src="imgUrl+shopItem.url" class="image"></image>
		                       	</view>
		                       </swiper-item>
		                        <swiper-item>
		                            <view class="swiper-item uni-bg-green">B</view>
		                        </swiper-item>
		                        <swiper-item>
		                            <view class="swiper-item uni-bg-blue">C</view>
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
	
	
	
</template>

<script>
		import uniGoodsNav from '@/components/common/uni-goods-nav/uni-goods-nav.vue'
		import {addToCart} from '../../../../models/exchangezone/cart/addToCart.js'
		const AddToCart = new addToCart()
		import {swiperList} from '../../../../models/exchangezone/creditsExchange/swiperList.js'
		const SwiperList = new swiperList
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
							   
							   // 设置的studentId
							   studentId:1
							   
					       }],
					       buttonGroup: [{
					         text: '加入购物车',
					         backgroundColor: '#F6EDE1',
					         color: '#C9A65E'
					       },
					       {
					         text: '立即购买',
					         backgroundColor: '#C9A65E',
					         color: '#fff'
					       }
					       ],
						   shopItem:[]
				}
			},
			components:{
				uniGoodsNav
			},
			methods:{
				onClick (e) {
					
				      uni.navigateTo({
				      url:'../cart/cart'
				      })
				     },
				     buttonClick (e) {
				       console.log(e)
					   if(e.index==0){
						   const studentId=1
						  const number = this.options[0].info+1
						  console.log(this.shopItem.id)
						AddToCart.addToCart(this.shopItem.id,studentId,number).then(res=>{
							console.log(res)
						}).catch(error=>{
							console.log(error)
						})    
					   }
				      else{
						 
						  uni.navigateTo({
						  url:`../acquireExchange/payAcquireExchange?item=`+ encodeURIComponent(JSON.stringify(this.shopItem))
						  })
					  }
				     },
					 // 获取轮播图数据
					 getSwiper(){
					 	console.log(this.shopItem.ID)
					 	SwiperList.GetSwiperList(this.shopItem.ID).then(res=>{
					 		console.log(res)
					 	})
					 }
			}
		}
</script>

<style lang="scss" scoped="scoped">
	
	page{
		height: 100%;
		background:	#EDEDED;
	
		swiper{
			border-radius: 0.3125rem;
			height: 375px;
			}
			
			.image{
				height:  375px;
				width: 100%;
			}
			
			
	
	.info{
		
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		height: 7.4375rem;
		background-color: white;
		font-size: 0.625rem;
		width: 98%;
		border-radius: 0.625rem;
		margin: 10% auto;
		.item{
			display: flex;
			justify-content: space-between;
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
		height:3.125rem;
	
		font-size:0.625rem;
		display: flex;
		justify-content: space-between;
		text{
			margin-top: 5%;
		}
		text:nth-child(1){
			width: 15%;
			margin-left: 3%;
			text-align: center;
			height:1.125rem;
			background-color: #C9A65E;
			color: white;
			border-radius: 0.625rem;
		}
		text:nth-child(2){
			margin-right: 20%;
		}
	}
	.footer{
		margin-top: 10.3125rem;
	}
	
	}
</style>
