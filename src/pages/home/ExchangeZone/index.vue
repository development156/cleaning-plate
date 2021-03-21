<template>

	<view>
		<view class="xTab">
			<xTab :value="tabList" @changeTab="changeTab" actType="underline" :config="{padding:150,spacing: 150,background:'white',color:'#666666',actColor:'#C9A65E',actSize:40,size:40,position:0}"></xTab>
		</view>
		
		<!-- :url="`/pages/details/index?id=${item.target}`" -->
			<!-- 开始循环遍历 -->
			
			<!-- 	积分兑换 -->
			
	<view class="hot_goods" v-if="flag==1">
		<view class="tit"  style="color: #C9A65E;">我的积分:{{myInfo.integrate}}</view>
		<view class="goods_list">
			      <navigator class="goods_item"
			      v-for="(item,index) in goodsList"
			      :key="index"
				   :url="'goodsDetails/creditDetails?item='+ encodeURIComponent(JSON.stringify(item))" 
			     > 
			      <image 
			      :src="imgurl+item.url">
				  </image>
				  <view class="name" style="color: #C9A65E;">
				  	{{item.name}}
				  </view>
				  <view class="price">
				  	<text style="color: red;">{{item.integrate}}积分</text>
					<text>	产自{{item.productionPlace}}</text>
				  </view>
				 
				  <view class="name">
				  	已售{{item.sales}}
				  </view>
			      </navigator>
	</view>
</view>

<!-- 商城 -->
<view v-else>
<uni-search-bar placeholder="搜索" @confirm="search" @cancel="cancel()" :radius="100"></uni-search-bar>
    <navigator class="news_item"
	 v-for="(item,index) in shopList"
	:url="'goodsDetails/payDetails?item='+ encodeURIComponent(JSON.stringify(item))" 
	 :key="item.id"
	>
									<image :src="imgurl+item.url"></image>
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
	import { mapGetters } from 'vuex'
import uniSearchBar from '@/components/common/uni-search-bar/uni-search-bar.vue'
import xTab from '@/components/common/poiuy-xTab/xTab.vue';
import {getGoodlist} from '../../../models/exchangezone/creditsExchange/goodsList.js'
import {swiperList} from '../../../models/exchangezone/creditsExchange/swiperList.js'
import {search} from '../../../models/exchangezone/search/search.js'
const getgoodlist = new getGoodlist()
const SwiperList = new swiperList
const Search = new search()
export default{
	components: {
		xTab,
		uniSearchBar
	},
	computed: {
		...mapGetters([
			'userInfo','myInfo'
		])
	},
	data(){
		return{
			goodsList:[],
			// 商城里的商品列表
			shopList:[],
			imgurl:'',
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
		this.imgurl = this.imgUrl

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
				
				if(this.flag==1 && this.hasMore1==true)
				{
						this.goodsList=[...this.goodsList,...res.data];
						console.log(this.goodsList);
				}
				if(this.flag==2 && this.hasMore2 ==true)
				{
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
					
	             },
			
			
			search(e){
				console.log(e.value)
				Search.doSearch(e.value).then(res=>{
					this.shopList = res.data
				})
			},
			cancel(e){
				console.log(e)
				this.getScoll();
			}
	}
}
	
</script>

<style>
	page{
		background-color: #F5F5F5;
	}
</style>
<style lang="scss" scoped>
	page{
		
	.xTab{
		height: 3.625rem;
		background-color: white;
	}
		.hot_goods{
			overflow: hidden;
			margin-top: 10px;
			.tit{
				height: 40px;
				width: 90%;
				margin: 3% auto;
				border-radius: 0.5rem;
				line-height: 40px;
				color: white;
				padding-left: 5%;
				// 字间距
				letter-spacing: 3px;
			background: -webkit-linear-gradient(top, #151515 0%, #848f94 0%, #485f67 0%, #485e69 4%, #4a5e67 4%, #4d5c63 24%, #4e5b61 28%, #505b5d 28%, #53585a 40%, #57585a 42%, #595651 59%, #5e5452 63%, #5d544f 63%, #5e534f 67%, #5e544b 67%, #655146 89%, #665043 89%, #665043 97%, #694e43 97%, #694e43 100%);
	
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
					width: 90%;
					height: 130px;
					display: block;
					margin: 0 auto;
					border-radius: 10px;
				}
				.price{
					color:   red;
					font-size: 30rpx;
					display: flex;
					justify-content: space-between;
				}
				.name{
					font-size: 32rpx;
					line-height: 50rpx;
					padding-bottom: 15rpx;
					padding-top: 10rpx;
				}
			}
		}
	}
	
	// 商城
	
	.news_item{
				height: 7.3125rem;
				display: flex;
				border-radius: 5px;
				margin: 1.0625rem 0.5rem 0px 0.5rem;
				padding: 10rpx 20rpx;
				box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
				background-color: white;
				border: 1px solid rgba(255, 255, 255, 100);
				image{
				height: 90%;
					min-width: 7.5rem;
					max-width: 7.5rem;
					height: 100%;
					border-radius: 10px;
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
