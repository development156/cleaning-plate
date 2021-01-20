<template>
	<view>
		<view class="tab-view">
		<xTab :value="tabList" @changeTab="changeTab" actType="underline" :config="{padding:30,background:'#1989FA',color:'#666666',actColor:'#1989FA',size:32,actWeight:'Bold',position:0}"></xTab>
		<xTab :value="floorList" @changeTab="changeTab" actType="underline" :config="{padding:30,spacing: 115,background:'#1989FA',color:'#666666',actColor:'#1989FA',size:32,actWeight:'Bold',position:0}"></xTab>
		<select  v-model="window" class="select">
		      <option v-for="(item,index) in windows" @click="changeTab" :value='item.id' :key="index" class="option">{{item.name}}</option>
		 </select>
		</view>
		<view class="goods_list">
				<!-- 开始循环遍历 -->
				      <view class="goods_item"
				      v-for="(item,index) in tabList"
				      :key="index">
				      <image 
				      mode="widthFix"
				      :src="item.url"></image>
					  <view class="content">
					  <view class="price">
					  	<text>{{item.id}}</text>
					  </view>
					  <view class="name">
					  	{{item.name}}
					  </view>
					</view>
				      </view>
		</view>
		
		
	</view>
</template>

<script>
	
	import xTab from '@/components/common/poiuy-xTab/xTab.vue'
	export default{
		components: {
			xTab
		},
		data(){
			return{
				tabList: [{
					name:'学生食堂',
					id:0
					},
					{
						name:'小食堂',
				
					id:1
					},
					{
						name:'教工食堂',
					id:2
						
					},
					{
						name:'教工食堂',
					id:3
						
					}
				],
				floorList: [{
					name:'一楼',
					id:0
					},
					{
						name:'二楼',
				
					id:1
					},
					{
						name:'三楼',
					id:2
						
					},
					{
						name:'四楼',
					id:3
						
					}
				],
				windows:[{
					name:'窗口1',
					id:0
					},
					{
						name:'窗口2',
				
					id:1
					},
					{
						name:'窗口3',
					id:2
						
					},
					{
						name:'窗口4',
					id:3
						
					}
				],
				window:'窗口1'
			}
		},
		watch:{
			window(val, oldval) {
			   console.log(this.floorList[val].id)
			      }
		},
		methods:{
			changeTab(e){
			                 console.log(e);
			                 this.swiperCurrIndex = e.index;
							 this.type=e.name;
							
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
						findItemNameBYClass(e){
										console.log( e)
								}
		}
		}
</script>

<style lang="scss">
	page{
		.select{
			margin: 1.25rem 0 1.375rem 1.6875rem;
			width: 7.6875rem;
			height: 1.875rem;
			border: 1px solid rgba(187, 187, 187, 100);
			font-size: 0.875rem;
			.option::after{
				width: 7.6875rem;
				
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
					width: 8.125rem;
					height: 7.3125rem;
					margin: 0 auto;
						border: 1px solid red;
					border-radius: 5px
				}
				.content{
					display: flex;
					justify-content: space-around;
					font-size: 32rpx;
					
				}
				
			}
		}
	}
</style>
