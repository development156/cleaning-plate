<template>
	<view>
		<view class="tab-view">
			<view class="tab">
				<view class="item1">
					<text>楼层</text>
					 <picker mode="selector" :value="index1" :range-key="'floor'" :range="floorList" @change="bindPickerChange1">
					       <view>{{floorList[index1].floor}}</view>
					  </picker>
					
				</view>
				
			<view class="item2">
			<text>窗口</text>
			<picker @change="bindPickerChange2" :value="index2" :range="windows" :range-key="'windows'">
				<view class="uni-input">{{windows[index2].windows}}</view>
			</picker>
			
				</view>
				
			</view>
		</view>
		
		<view class="goods_list">
				<!-- 开始循环遍历 -->
				      <view class="goods_item"
				      v-for="(item,index) in foodList"
				      :key="index">
				      <image 
				      mode="widthFix"
				      :src="imgUrl+item.url"></image>
					  <view class="content">
					  <view class="price">
					  	<text>{{item.dishName}}</text>
					  </view>
					  <view class="name">
					  	{{item.price}}
					  </view>
					  <view>
					  	{{item.favour}}
					  </view>
					</view>
				      </view>
		</view>
		
		
	</view>
</template>

<script>
	
	import {FoodShow} from '../../../models/foodShow/foodShow.js'
	const foodShow = new FoodShow()
	export default{
		
		data(){
			return{
				// 楼层列表
				floorList: [],
				// 窗口列表
				windows:[],
				
				// 菜品列表
				foodList:[],
				// 当前默认窗口
				window:'1号',
				// 当前默认楼层
				floor:'1楼',
				// 当前默认食堂
				diningRoom:'第一食堂',
				index1: 0,
				index2:0
				
			}
		},
		// watch:{
		// 	floor(val, oldval) {
		// 	   this.getFood()
		// 	      },
		// 	window(val, oldval) {
		// 	   this.getFood()
		// 	      }
				
		// },
		onLoad(e){
			this.diningRoom  = JSON.parse(decodeURIComponent(e.item));
			this.getCanteenInfo()
			this.getFood()
			
		},
		methods:{
						
					// 获取菜品列表
					getFood(){
						console.log(this.floor)
						console.log(this.window)
						foodShow.getFood(this.diningRoom,this.floor,this.window).then(res=>{
							console.log(res.data)
							this.foodList = res.data
						})
					},
				
					// 获取楼层信息
					getCanteenInfo(){
						foodShow.getCanteenInfo(this.diningRoom).then(res=>{
							console.log(res)
							
							for(var i=0;i<res.data.length;i++){
								this.floorList[i]=res.data[i]
								
							}
							this.windows =res.data[this.index1].windowsList
							console.log(this.windows)
						})
					},
					bindPickerChange1: function(e) {
						
						this.index1 = e.detail.value
						this.floor = this.floorList[this.index1].floor
						this.getFood()
					},
					bindPickerChange2: function(e) {
						this.index2 = e.detail.value
						this.window = this.windows[this.index2].windows
						this.getFood()
					},
					
		}
		}
</script>

<style lang="scss">
	page{
		background-color: rgba(249, 249, 249, 0.8);
		
		.tab{
			display: flex;
			width: 98%;
			height: 3.125rem;
			margin: 5% auto;
			background-color: white;
			border-radius: 0.3125rem;
			justify-content: space-around;
			.item1,.item2{
			margin: 3% 0 0 10%;
			display: flex;
			width: 50%;
				picker{
					width: 3.125rem;
					height: 1.875rem;
					margin-left: 5%;
					border: none;
					font-size: 0.9375rem;
					color: #C9A65E;
					
				}
				text{
					font-size: 0.9375rem;
					color: gray;
				
				}
			}
			
		}
		.goods_list{
				display: flex;
				flex-wrap: wrap;
				padding: 0 10rpx;
				justify-content: space-around;
				background-color: white;
				width: 95%;
				margin: 0 auto;
				border-radius: 12px;
			.goods_item{
				background: #fff;
				width: 45%;
				margin-top: 10px;
				
				padding: 20rpx;
				box-sizing: border-box;
				border-radius: 10px;
				image{
					width: 8.125rem;
					height: 7.3125rem;
					margin: 0 auto;
			
					border-radius: 5px
				}
				.content{
					display: flex;
					justify-content: space-around;
					font-size: 32rpx;
					.name{
						color: red;
					}
				}
				
			}
		}
	}
</style>
