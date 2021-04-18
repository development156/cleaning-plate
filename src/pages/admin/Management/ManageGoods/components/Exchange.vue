<template>
	<view>
		<!-- 这个页面用用户端的 -->
<!-- 	<view class="credit">我的积分<span>208</span></view>
	<view class="select">
		<select  v-model="option" >
		      <option v-for="(item,index) in options" @click="changeTab" :value='item.name' :key="item.id" class="option">{{item.name}}</option>
		</select>
	</view>
	<view class="item-list"> -->
	<view>
		<button class="addGoods" @click="addGoods">上传商品</button>
	</view>
	</view>
</template>

<script>
	
	export default{
		data(){
			return{
			// 	options:[{name:'默认排序',id:'0'},{name:'积分从低到高',id:'1'},{name:'积分从高到低',id:'2'}],
				
			// 	option:'默认排序',
			goodsList:[],
			// 商城里的商品列表
			shopList:[],
			
			// 判断是否是支付还是积分的标志
			  flag:1,
			  // 分页的相应参数
			 
			  pageNum1:1,
			  pageNum2:1,
			// 是否还有更多数据
			 hasMore1:true,
			 hasMore2:true,
			 tabList: [{
			 	name:'兑换',
			 	id:0
			 	},
			 	{
			 		name:'商城',
			 	id:1
			 	},
			 	
			 ],
			
			}
		},
		methods:{
			addGoods:function(){
				console.log("addExchangeGoods")
				uni.navigateTo({
				 url:'./components/addExchangeGoods'
				 })  
			}
		}
	}
</script>

<style scoped lang="scss">
	
	.hot_goods{
	background-color: rgba(249, 249, 249, 0.8);
	
		overflow: hidden;
		margin-top: 10px;
	
		.tit{
			height: 50px;
			line-height: 50px;
			color: red;
			text-align: center;
			// 字间距
			letter-spacing: 20px;
			background: #fff;
			margin: 7rpx 0;
		}
	}
	.goods_list{
			display: flex;
			flex-wrap: wrap;
			padding: 0 10rpx;
			justify-content: space-between;
			width: 95%;
			margin: 0 auto;
		.goods_item{
			background: #fff;
			width: 49%;
			margin-top: 10px;
			
			padding: 20rpx;
			box-sizing: border-box;
			border-radius: 10px;
			image{
				width: 70%;
				height: 130px;
				display: block;
				margin: 0 auto;
			}
			.price{
				color:   red;
				font-size: 30rpx;
			
			}
			.name{
				font-size: 32rpx;
				line-height: 50rpx;
				padding-bottom: 15rpx;
				padding-top: 10rpx;
			}
		}
	}
	// page{
		
	// 	display: flex;
	// 	flex-direction: column;
		
	// 	.credit{
	// 		margin: auto;
	// 		width: 646rpx;
	// 		padding: 0 25rpx 0 25rpx;
	// 		height: 104rpx;
	// 		line-height: 104rpx;
	// 		opacity: 0.8;
	// 		border-radius: 16rpx;
	// 		font-size: 36rpx;
	// 		background-color: rgba(255, 227, 210, 100);
	// 		text-align: left;
	// 		border: 2rpx solid rgba(255, 255, 255, 100);
			
	// 		span{
	// 			margin-left: 5%;
	// 			font-family: 方正兰亭黑-标准;
	// 			color: rgba(217, 127, 0, 100);
	// 			font-size: 40rpx;
	// 		}
	// 	}
	// 	.select{
	// 		width: 100%;
	// 		width: 752rpx;
	// 		height: 70rpx;
	// 		color: #959595 ;
	// 		background: #FFFFFF;
	// 		margin-top:4%;
	// 		select{
	// 			width: 30%;
	// 			height: 100%;
	// 			border: 0px;
	// 			margin-left: 10%;
	// 			color: #959595 ;
	// 		.option{
	// 			width: 100%;
	// 			border: 0rpx;
	// 			// color: rgba(16, 16, 16, 100);
	// 			font-size: 24rpx;
	// 			font-family: Microsoft Yahei;
	// 			border: 2rpx solid rgba(255, 255, 255, 100);
	// 		}
	// 		}
	// 	}
	// 	.addGoods{
	// 		position: fixed;
	// 		bottom: 0;
	// 		width: 750rpx;
	// 		height: 104rpx;
	// 		line-height: 104rpx;
	// 		background-color: rgba(201, 166, 94, 100);
	// 		text-align: center;
	// 		color: rgba(255, 255, 255, 100);
	// 		font-size: 40rpx;
	// 		font-weight: 600;
	// 		border: 2rpx solid rgba(255, 255, 255, 100);
	// 	}
		
	
		
	// }


</style>
