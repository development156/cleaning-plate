<template>
	<view><xTab :value="tabList" @changeTab="changeTab" actType="underline" :config="{padding:100,spacing: 200,background:'#1D5397',color:'#666666',actColor:'#D97F00',actSize:40,size:40,actWeight:'Bold',position:0}"></xTab>
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
			      :src="item.url">
				  </image>
				  
				  <view class="price">
				  	<text>{{item.univalence}}</text>
				  </view>
				  
				  <view class="name">
				  	{{item.name}}
				  </view>
				  <view class="name">
				  	{{item.productionPlace}}
				  </view>
				  <view class="name">
				  	{{item.sales}}
				  </view>
			      </navigator>
	</view>
</view>

<!-- 商城 -->
<view v-else>
	<uni-search-bar radius="100" placeholder="搜索" clearButton="none" cancelButton="none" @confirm="search" class="search"  />
    <navigator class="news_item"
	 v-for="(item,index) in shopList"
	:url="'goodsDetails/payDetails?item='+ encodeURIComponent(JSON.stringify(item))" 
	 :key="item.id"
	>
									<image :src="imgUrl+item.url"></image>
						              <view class="right">
						              	<view class="tit">
						                  	{{item.name}}
						              	</view>
						                  	
						               <text>{{item.univalence}}</text>
						                  <text>{{item.productionPlace}}</text>
						                  	
						                 </view>
		  </navigator>
	</view>
	 </view>


</template>

<script>
import uniSearchBar from '@/components/common/uni-search-bar/uni-search-bar.vue'
import xTab from '@/components/common/poiuy-xTab/xTab.vue';
import {getGoodlist} from '../../../models/exchangezone/creditsExchange/goodsList.js'
import {swiperList} from '../../../models/exchangezone/creditsExchange/swiperList.js'
const getgoodlist = new getGoodlist()
const SwiperList = new swiperList
export default{
	components: {
		xTab,
		uniSearchBar
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
		console.log("啦啦啦");
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
		getScoll(){
			getgoodlist.getGoodList(this.flag,this.pageNum=((this.flag==1)?this.pageNum1:this.pageNum2)).then(res =>{
				console.log(res.data);
				console.log(this.pageNum1);
				if(this.flag==1)
				{
						this.goodsList=[...this.goodsList,...res.data];
						console.log(this.goodsList);
				}
				else{
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
					console.log(this.pageNum1)
					
					if(this.hasMore1 || this.hasMore2){
						this.getScoll()
					}
					console.log(this.shopList.length)
					
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
	            }
	
		
	
	
	
	}
	
	
	
}
	
</script>

<style lang="scss" scope>
	
	.hot_goods{
		background: #eee;
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
		.goods_item{
			background: #fff;
			width: 355rpx;
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
	// 商城
	.search{
		width: 18.75rem;
		border-radius: 20px;
	}
	.news_item{
				height: 8.3125rem;
				display: flex;
				border-radius: 5px;
				margin: 1.0625rem 0.5rem 0px 0.5rem;
				padding: 10rpx 20rpx;
				box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.4);
				border: 1px solid rgba(255, 255, 255, 100);
				image{
				height: 8.3125rem;
					min-width: 7.5rem;
					max-width: 7.5rem;
					width: 8.3125rem;
				}
				.right{
					margin-left: 15rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.tit{
					font-size: 0.75rem;
				}
				text:nth-child(2){
					color: red;
				}
					
				
				}
				
			}
	
	
</style>
