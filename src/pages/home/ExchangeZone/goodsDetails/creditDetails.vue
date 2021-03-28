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
				<text>{{goodsItem.name}}</text>
			</view>
			
			
			<view class="item">
			<text>产品描述</text>
			<text>{{goodsItem.description}}</text>
			</view>
			
			
			<view class="item">
				<text>产地</text>
				<text>{{goodsItem.productionPlace}}</text>
			</view>
			
			<view class="item">
				<text>销量</text>
			<text>{{goodsItem.sales}}</text>
			</view>
			
			<view class="item">
			<text>所需积分</text>
			<text>{{goodsItem.integrate}}</text>
			</view>
			<view class="item">
			<text>扶贫单位</text>
			<text>{{goodsItem.povertyAlleviationUnit}}</text>
			</view>
			<view class="item">
			<text>扶贫详情</text>
			<text>{{goodsItem.descriptionOfPovertyAlleviation}}</text>
			</view>
		</view>
		
		<view class="footer">
			<view class="text">
			<text>兑换需知</text>
			<text>1、兑换方法：点击立即兑换-兑换成功</text>
			<text>2、物流：可在个人中心-兑换中查看购买情况</text>
			<text>3、取货方式：上门自取</text>
			<text>温馨提示</text>
			<text>积分一经使用不支持退还，数量有限，先到先得，兑完即止</text>
			</view>
			<button  :style="{backgroundColor:isEnough?'#C9A65E':'#777468'}" @click="navTo" :disabled="!isEnough">立即兑换</button>
		</view>
	</view>
	
</template>

<script>
	import { mapGetters } from 'vuex'
	import {swiperList} from '../../../../models/exchangezone/creditsExchange/swiperList.js'
	const SwiperList = new swiperList
	export default{
		data(){
			return{
				goodsItem:[],
				images:[],
				isEnough:true
			
			}
		},
		computed: {
			...mapGetters([
				'myInfo'
			])
		},
		onLoad(e){
			 const item = JSON.parse(decodeURIComponent(e.item));
			this.goodsItem = item;
			console.log(this.goodsItem)
			this.getSwiper()
			this.IsEnough()
			
		},
		
		methods:{
			navTo(){
				 uni.redirectTo({
				url:`../acquireExchange/creditAcquireExchange?item=`+ encodeURIComponent(JSON.stringify(this.goodsItem))
				})
			},
			// 获取轮播图数据
			getSwiper(){
				console.log(this.goodsItem.ID)
				SwiperList.GetSwiperList(this.goodsItem.ID).then(res=>{
					this.images = res.data
					console.log(this.images)
				})
			},
			// 判断积分是否足够
			IsEnough(){
			if(this.goodsItem.integrate>this.myInfo.integrate){
				this.isEnough= false
			}
		}
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F5F5;
		swiper{
			border-radius: 0.3125rem;
			height: 275px;
			}
			
			.image{
				height:  275px;
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
			margin: 0.3125rem auto;
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
		.footer{
				height: 12.4375rem;
				font-size: 30rpx;
			.text{
			
			width: 98%;
			margin: 3% auto;
			border-radius: 0.625rem;
				background-color: white;
				display: flex;
				flex-direction: column;
				text{
					margin: 0.625rem 0 2% 0.5rem;
						font-size: 0.875rem;
					&:nth-child(1),&:nth-child(5){
						height:1.4rem;
						width: 4.8125rem;
						border-radius: 0.625rem;
						border: 0.0625rem solid gainsboro;
						text-align: center;
						background-color:#C9A65E ;
						color: white;
					}
				}
			}
			button{
				height: 2.625rem;
				width: 95%;
				text-align: center;
				
				color: white;
				margin-bottom: 1.125rem;
			}
		}
		
		
		
	}
</style>
