<template>

	<view >

		<xTab :value="tabList"  
		@changeTab="changeTab" actType="underline" 
		:config="{padding:100,spacing: 200,background:'#1D5397',color:'#666666',actColor:'#D97F00',actSize:40,size:40,actWeight:'Bold',position:0}"></xTab>

		<!-- :url="`/pages/details/index?id=${item.target}`" -->
			<!-- 开始循环遍历 -->
			
			<!-- 	积分兑换 -->
			
	<view class="hot_goods" v-if="flag==1">
		<view class="tit">我的积分</view>
		<view class="goods_list">
			     <navigator class="goods_item"
			      v-for="(item,index) in goodsList"
			      :key="index"
				   :url="'goodsDetails/creditDetails?item='+ encodeURIComponent(JSON.stringify(item))" 
			     >
			      <image 
			      :src="imgUrl+'/' +item.url">
				  </image>
				  <!-- 移除菜品的按钮  -->
				  <view class="q-image-remover"  @tap="removeImage(item.ID,flag)">
					  <!-- :data-idx="idx" -->
				      <text>x</text>
				      <!-- <image  src="../../../../../dist/dev/mp-weixin/static/images/tabbar/upload.png" mode="aspectFill"></image> -->
				  </view>
				  
				 <!-- <view class="price">
				  	<text>{{item.univalence}}</text>
				  </view>
				  -->
				  <view class="name">
				  	{{item.name }}
				  </view>
				  
				  <view class="name2">
				  	{{item.integrate}}  积分
				  </view>
				
				  <view class="name3">
				  	{{item.sales}} 件已兑换
				  </view>
			      </navigator>
	</view>
		
		<view>
			<button class="addGoods"
			 style="position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 8%;
		line-height: 104rpx;
		background-color: rgba(201, 166, 94, 100);
		text-align: center;
		color: rgba(255, 255, 255, 100);
		font-size: 40rpx;
		font-weight: 500;
		border: 2rpx solid rgba(255, 255, 255, 100);"
			 @click="addGoods(1)">上传兑换商品</button>
		</view>
	</view>

<!-- 商城 -->
<view v-else class="hot_goods">
	<uni-search-bar radius="100" placeholder="搜索" clearButton="none" cancelButton="none" @confirm="search" class="search"  />
    <navigator class="news_item"
	 v-for="(item,index) in shopList"
	:url="'goodsDetails/payDetails?item='+ encodeURIComponent(JSON.stringify(item))" 
	 :key="item.id"
	>
									<image :src="imgUrl+'/'+item.url" mode="aspectFill"></image>
									
									<!-- 移除菜品的按钮  -->
									<view class="q-image-remover"  @tap="removeImage(item.ID,flag)">
														  <!-- :data-idx="idx" -->
									    <text>x</text>
									    <!-- <image  src="../../../../../dist/dev/mp-weixin/static/images/tabbar/upload.png" mode="aspectFill"></image> -->
									</view>
									
						              <view class="right">
						              	<view class="tit">
						                  	{{item.name}}
						              	</view>
						                  	
						               <text class="text1">￥{{item.univalence}}</text>
						                  <text class="text2">产地: {{item.productionPlace}}</text>
						                  	
						                 </view>
		  </navigator>
		
		<view>
			<button class="addGoods"
			 style="position: fixed;
			 bottom: 0;
			 width: 750rpx;
			 height: 8%;
			 line-height: 104rpx;
			 background-color: rgba(201, 166, 94, 100);
			 text-align: center;
			 color: rgba(255, 255, 255, 100);
			 font-size: 40rpx;
			 font-weight: 500;
			 border: 2rpx solid rgba(255, 255, 255, 100);"
			 @click="addGoods(2)">上传商城商品</button>
		</view>
	</view>
	 </view>


</template>

<script>
// import uniSearchBar from '@/components/common/uni-search-bar/uni-search-bar.vue'
import xTab from '@/components/common/poiuy-xTab/xTab.vue';
import {getGoodlist} from '../../../../models/exchangezone/creditsExchange/goodsList.js'
import {swiperList} from '../../../../models/exchangezone/creditsExchange/swiperList.js'
import {ManageGoods} from '../../../../models/admin/Management/ManageGoods/manageGoods.js'
const getgoodlist = new getGoodlist()
const SwiperList = new swiperList()
const manageGoods = new ManageGoods()
export default{
	components: {
		xTab,
		// uniSearchBar
	},
	data(){
		return{
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
	onLoad(){
		this.getScoll();

	},
	//滚动条触底事件
	onReachBottom(){
		
		if((this.hasMore1 && this.flag==1) || (this.hasMore2 && this.flag==2)){
		this.getScoll();
		}else{
		  uni.showToast({
		    title: '没有数据啦！',
		    icon:"none"
		  });
		}
	},
	
	methods:{
		// 获取商品的分页数据
		getScoll(a){
			console.log("22")
			console.log(a==undefined)
			getgoodlist.getGoodList(this.flag=((a==undefined)?this.flag:a),this.pageNum=((this.flag==1)?this.pageNum1:this.pageNum2)).then(res =>{
				// console.log(res.data);
				// console.log(this.pageNum1);
				if(this.flag==1 && this.hasMore1 == true)
				{
						this.goodsList=[...this.goodsList,...res.data];
						console.log(this.goodsList);
				}
				if(this.flag==2 && this.hasMore2 == true){
					this.shopList = [...this.shopList,...res.data]
					console.log(this.shopList[0].description);
				}
				
				if(res.data.length < 8 && this.flag==1){
				      this.hasMore1=false;
				      uni.showToast({
				        title: '没有更多数据了！',
				        icon: "none"
				      });
				      return;
				    }
				if(res.data.length < 8 && this.flag==2){
				      this.hasMore2=false;
				      uni.showToast({
				        title: '没有更多数据了！',
				        icon: "none"
				      });
				      return;
				    }
				if(res.data.length === 8 && this.flag === 1){
					this.pageNum1++;
				}
				if(res.data.length === 8 && this.flag === 2){
					this.pageNum2++;
				}
				   
					}).catch(error => {
						console.log("获取数据失败")
				})
		},
				// 监听切换
				changeTab(e){
	                 // console.log(e);
	                 this.swiperCurrIndex = e.index;
					this.flag=e.index+1;
					// console.log(this.pageNum1)
					
					if(this.hasMore1 || this.hasMore2){
						this.getScoll()
					}
					// console.log(this.shopList.length)
					
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
	                        that.swiperHegiht = data.height * 2 + 110; 
	                    }
	                }).exec();
	            },
				
			addGoods:function(index){
				
				if(index==1){
				uni.navigateTo({
				 url:'./components/addExchangeGoods'
				 })  
				}else if(index==2){
					uni.navigateTo({
					 url:'./components/addShopGoods'
					 }) 
				}
			},
			
			removeImage: function(index,flag){
			   
				const that = this;
				manageGoods.deleteGoods( {"ID":index} ).then(res => {
					if(res.code==200){
						
					
						// uni.redirectTo({
						// 	url:'/pages/admin/Management/ManageGoods/index',
							
						// })
						uni.showToast({
							title: '删除成功',
							icon:'none',
							duration: 1500
						});
						
						
							// that.getScoll(flag)
							that.$router.go(0);
							
						
						
					}
				})
				.catch(err => {
					
					uni.showModal({
							content: "删除失败",
							showCancel: false
						});
				})
				
			    // var photoFiles = this.photoFiles;
			    // photoFiles.splice(idx, 1);
			    // // this.setData({
			    // //     photoFiles: photoFiles
			    // // })
							// this.photoFiles=photoFiles;
							// this.notice.productionImgList=photoFiles;
						
			},
	
		
	
	
	
	}
	
	
	
}
	
</script>

<style lang="scss" scope>
	page{
		background-color: rgba(249, 249, 249, 0.8);
		
	}
	.hot_goods{
	
		
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
	.q-image-remover {
	    width: 0;
	    height: 0;
	    border-top: 66rpx solid #555555;
	    border-left: 66rpx solid transparent;
		// border-radius: 10px;
	    position: absolute;
	    top: 0;
	    right: 0;
		text{
		    width: 30rpx;
		    display: block;
		    height: 30rpx;
		    color: #FFFFFF;
		    text-align: center;
		    line-height: 30rpx;
		    font-size: 30rpx;
			font-weight: 600;
		    border-radius: 20rpx;
		    background-color:#555555;
		    position: absolute;
		    top: -60rpx;
		    right: 2rpx;
		}
		image {
		    width: 24rpx;
		    height: 24rpx;
		    position: absolute;
		    top: -60rpx;
		    right: 4rpx;
		}
	}
	
	.goods_list{
			display: flex;
			flex-wrap: wrap;
			padding: 0 10rpx;
			justify-content: space-between;
			width: 91%;
			margin: 0 auto;
			
		.goods_item{
			background: #fff;
			width: 49%;
			margin-top: 5px;
			position: relative;
			padding: 20rpx;
			box-sizing: border-box;
			border-radius: 10px;
			image{
				width: 72%;
				height: 130px;
				display: block;
				margin: 0 auto;
			}
			.price{
				color:   red;
				font-size: 30rpx;
			
			}
			.name{
				
				line-height: 50rpx;
				
				font-size: 28rpx;
				padding-top: 20rpx;
				padding-left: 20rpx;
				
			}
			.name2{
				
				color:#F13430;
				font-size: 28rpx;
				padding-bottom: 8rpx;
				padding-left: 20rpx;
				// padding-top: 5rpx;
				text-align: left;
				
				font-family: 方正兰亭黑-标准;
			}
			.name3{
				
				color: rgba(149, 149, 149, 100);
				font-size: 24rpx;
				text-align: right;
				padding-left: 10rpx;
				font-family: 方正兰亭黑-标准;
			}
			/////////
		}
	}
	
	// 商城
	.search{
		width: 18.75rem;
		border-radius: 20px;
	}
	.news_item{
				// height: 8.3125rem;
				height: 266rpx;
				display: flex;
				// border-radius: 5px;
				margin: 0.8rem 0rem 0px 0rem;
				background: #FFFFFF;
				position: relative;
				padding: 0rpx 20rpx;
				
				box-shadow: 0px 3rpx 10rpx 0px rgba(0, 0, 0, 0.4);
				
				border: 2rpx solid rgba(255, 255, 255, 100);
				image{
			
					border-radius: 20rpx;
					// height: 8.3125rem;
					height: 266rpx;
					
					min-width: 7.5rem;
					max-width: 7.5rem;
					width: 8.3125rem;
					margin-left: 10rpx;
				}
				.right{
					margin-left:25rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.tit{
					color: rgba(16, 16, 16, 100);
					font-size: 31rpx;
					text-align: left;
					letter-spacing:0;
					
				}
				text:nth-child(2){
					color: rgba(255, 0, 0, 100);
					font-size: 32rpx;
					text-align: left;
					font-weight: 600;
					padding-top: 40rpx;
				}
				.text2{
					color: rgba(149, 149, 149, 100);
					font-size: 24rpx;
					float: right;
					text-align: right;
					// margin-bottom: 20rpx;
					padding-bottom: 20rpx;
					font-family: 方正兰亭黑-标准;
				}
					
				
				}
				
			}
	
	
</style>
