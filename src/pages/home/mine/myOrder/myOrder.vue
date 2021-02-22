<template>
		<view>
			<!--顶部导航栏-->
			<view class="uni-tab-bar">
			<xTab :value="tabBars" @changeTab="changeTab" actType="underline" :config="{height: 150,padding:30,spacing: 90,height1: 40,left:200,color:'#666666',actColor:'#C9A65E',size:32,position:0}" class="uni-swiper-tab">
				
			</xTab>
			</view>
			<!--内容区-->
			
				<swiper  
				:current="swiperCurrIndex" 
				@change="swiperChange" 
				:style="{height:swiperHegiht}"
				>
					<swiper-item v-for="(item,index) in tabBars" :key="index">		
					<view :id="'swiper_id_'+item.id">
					<view class="content" v-for="(content,index) in contentList">
						<view class="item1">
								<text>{{content.shipmentFlag}}</text>
								<text>{{content.receivingDate}}</text>
						</view>
							<view class="item2" @click="navTo(content.id)">
								<image :src="imgUrl+content.url">
									
								</image>
								<text>{{content.shippingAdress}}</text>
								<text>￥{{content.money}}</text>
							</view>
							<view class="item3" @click="acquireOrder(content.id)" v-show="isShow">确认订单</view>
					</view>	
					
				
					
					</view>
					</swiper-item>
				</swiper>
			
			
			
		
		
			
		</view>
</template>
<script>
	  import xTab from '@/components/common/poiuy-xTab/xTab.vue';
	  import {orderList} from '../../../../models/MyModel/orderList.js'
	  const getOrder = new orderList()
	export default {
		
			data() {
				return {
				
					contentList: [],
					tabBars:[
						{
							name: '全部',
							id: 0
						},
						{
							name: '待付款',
							id: 1
						},
						{
							name: '待取货',
							id: 2
						},
						{
							name: '已完成',
							id: 3
						},
						
						
					],
				
				//swiper当前位置
				swiperCurrIndex:0,
				//swiper动态高度
				swiperHegiht:400, 
				// 临时设置的学号
				studentId:1,
				state:'',
				isShow:false
				}
			},
			components: {
				xTab
			},
			onLoad() {
				 this.getOrder()
		// 获取动态高度
			 this.setSwiperHeight();
			
			},
			methods: {
				
				changeTab(e){
				                 console.log(e);
				                 this.swiperCurrIndex = e.index;
								 
								 this.getOrder()
								 if(this.swiperCurrIndex ==2){
									 this.isShow = true
								 }
								 else{
									  this.isShow = false
								 }
				             },
				//swiper组件的切换返回值（执行其他的方法只需要在这里执行即可。）
				            swiperChange(e) {
								
				                this.swiperCurrIndex = e.detail.current;	
				                this.setSwiperHeight(); //例如动态获取高
				            },
				 //动态设置swiper高度
				            setSwiperHeight() {
				                const that = this;
							
				                let obj = uni.createSelectorQuery().in(this).select("#swiper_id_" + (this.swiperCurrIndex));
							
				                obj.boundingClientRect(function(data) { //data - 各种参数
				                    if (data) {
				//得到px单位的高度，通过px转换rpx的单位换算(加上底部的间距或者存在底部按钮高度合成最后的rpx高度)
										
										that.swiperHegiht = data.height+50+'px'; 
										console.log(that.swiperHegiht)
				                    }
				                }).exec();
				            },
				
				navTo(id){
					console.log(id)
					if(this.swiperCurrIndex ==3){
						uni.navigateTo({
						url:`orderDetails/orderDetails?item=`+ encodeURIComponent(JSON.stringify(id))
						})
					}
					
				},
				
				// 获取订单列表
				getOrder(){
					if(this.swiperCurrIndex==1 || this.swiperCurrIndex==2 ||  this.swiperCurrIndex==2)
					{
						 this.state = this.swiperCurrIndex
					}
					getOrder.getOrderFirstPage(this.studentId,this.state).then(res=>{
						console.log(res.data)
						if(res.data!=null){
							this.contentList = res.data
						}
						else{
							this.contentList=""
						}
						

					})
				},
				
				// 确认订单
				acquireOrder(id){
					getOrder.acquireOrder(this.studentId,id).then(res=>{
						console.log(res)
						uni.showToast({
						  title:res.msg,
						  icon: "none"
						})
					})
					
				},
			
			}
		}
	</script>
	
	<style lang="scss">
		.tab-view{
			margin-top: 3.125rem;
			
			
		}
		  swiper {
		            min-height: 80vh;
		        }
		
		
	page{
		background-color: #3B5A69;
	}
	
		.uni-tab-bar{
			border-bottom: 1upx solid #eeeeee;
			background-color: #ffffff;
			
		}
				.content{	
						background-color: #FFFFFF;
						border-radius: 5px;
						text-align: center;
						border: 1px solid rgba(255, 255, 255, 100);
						margin-top: 0.875rem;
						width: 98%;
						box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
						margin: 5% auto;
						.item1{
						display: flex;
						margin:0.3125rem  1.5625rem 0.1875rem 1.5625rem;
						justify-content: space-between;
						text{
							&:nth-child(1) {
								font-size: 0.875rem;
							}
							&:nth-child(2) {
								font-size: 0.75rem;
								color: #C9A65E;
							}
						}
					}
					.item2{
						display: flex;
						justify-content: space-around;
						margin-bottom: 5%;
						image{
						
							width: 60%;
							height: 5.5rem;
							border: 1px solid gray;
							margin: 0.1875rem 0 0 1.4375rem; 
							border-radius: 10px;
						}
						text{
							
							&:nth-child(2) {
								margin: 42px 0 0 0.625rem;
								font-size: 0.75rem;
								text-align: left;
								width: 9.5625rem;
							}
							&:nth-child(3) {
								margin: 3.4375rem 1.5625rem 0 1.625rem;
								color: #C9A65E;
							}
						}
					}
					.item3{
						width: 4.6875rem;
						height: 1.5625rem;
						opacity: 0.63;
						border-radius: 15px;
						text-align: center;
						border: 1px solid rgba(187, 187, 187, 100);
						font-size: 0.8125rem;
						margin: 0 1.375rem 5% 75%;
					}
					}
			
		
	
</style>
