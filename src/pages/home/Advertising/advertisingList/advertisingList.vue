<template>
<view>
<view class="tab-view">
<xTab :value="tabList" @changeTab="changeTab" actType="underline" :config="{padding:47,spacing: 150,color:'#666666',actColor:'#C9A65E',size:32,actWeight:'Bold',position:0}"></xTab>

 <view>
             <view class="swiper">
               <swiper 
             	autoplay 
             	interval="2000" 
             	duration="500">
                                     <swiper-item>
                                         <view class="swiper-item uni-bg-red">A</view>
                                     </swiper-item>
                                     <swiper-item>
                                         <view class="swiper-item uni-bg-green">B</view>
                                     </swiper-item>
                                     <swiper-item>
                                         <view class="swiper-item uni-bg-blue">C</view>
                                     </swiper-item>
                                 </swiper>
             </view>
						 <swiper :current="swiperCurrIndex" @change="swiperChange" :style="{height:swiperHegiht}">
						                    <swiper-item v-for="(item,index) of tabList" :key="index">
						                    <view :id="'swiper_id_'+index">
						                  <view  v-for="(item,index) in Info" :key="index"  >
						                    <view :id="'swiper_id_'+swiperCurrIndex" class="news_item">
						                  <image :src="item.url"></image>
						                  <view class="right">
						                  	<view class="tit">
						                  		{{item.title}}
						                  	</view>
						                  	<view class="info">
						                  		<text>发表时间：{{item.date}}</text>
						                  		<text>浏览：{{item.pageview}}</text>
						                  	</view>
						                  </view>
						                    </view>
						                    </view>
						                    </view>
						                    </swiper-item>
						   </swiper>
</view>
</view>
</view>
</template>

<script>
	  import xTab from '@/components/common/poiuy-xTab/xTab.vue';
	import {getAdvertiseList} from '../../../../models/advertising/advertisingList/advertiseList.js'
	const GetAdvertiseList = new getAdvertiseList()
	export default{
		components: {
			xTab
		},
		data(){
			return{
				type:"新闻",
				Info:[],
				tabList: [{
					name:'新闻',
					id:0
					},
					{
						name:'产品',
					id:1
					},
					{
						name:'宣传',
						id:2
					}
				],
				  //swiper当前位置
				swiperCurrIndex:0,
				//swiper动态高度
				swiperHegiht:300, 
				            
			}
			
		},
		onLoad(){
			
			this.getList();	
			// 获取动态高度
			 this.setSwiperHeight();
		},
		methods:{
			// 根据类型获取所有公告
			getList(){
				GetAdvertiseList.getList(this.type).then(res =>{
					this.Info = res.data;
					console.log(this.Info);
		})
		},
					changeTab(e){
		                 console.log(e);
		                 this.swiperCurrIndex = e.index;
						 this.type=e.name;
						 console.log(this.type);
						 this.getList();	
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

<style lang="scss" scoped="scoped">
	.tab-view{
		margin-top: 3.125rem;
		
	}
	  swiper {
	            min-height: 80vh;
	        }
	.swiper{
		width: 18.75rem;
		height: 12.5rem;
		border: 1px solid rgba(0, 0, 0, 0.4);
		margin: 0 auto;
		margin-top: 2.125rem;
		border-radius: 0.625rem;
	
	}
.news_item{
			display: flex;
			border-radius: 5px;
			margin: 1.0625rem 0.5rem 0px 0.5rem;
			padding: 10rpx 20rpx;
			box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.4);
			border: 1px solid rgba(255, 255, 255, 100);
			image{
				width: 200rpx;
				min-width: 200rpx;
				max-width: 200px;
				height: 150rpx;
			}
			.right{
				margin-left: 15rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.tit{
				font-size: 35rpx;
			}
			.info{
				font-size: 24rpx;
				text:nth-child(2){
					margin-left: 30rpx;
				}
			}
			}
			
		}
</style>
