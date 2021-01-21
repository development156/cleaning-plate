<template>
	<view>
		<view class="tab-view">
		<xTab :value="tabList" @changeTab="changeTab" actType="underline" :config="{padding:80,spacing: 200,background:'#1989FA',color:'#666666',actColor:'#C9A65E',size:32,position:0}"></xTab>
		<xTab v-if="isShow" :value="colleges" @changeTab="changeTab" actType="underline" :config="{spacing: 125,background:'#1989FA',color:'#666666',actColor:'#1989FA',size:32,position:0}"></xTab>
		</view>
	
	
	<view class="border">	
		<view class="con">
		<image></image>
		<view class="item1">
			<text>我的昵称</text>
			<text>2小时前</text>
		</view>
		<view class="item2">
			数字媒体技术2018级
		</view>
		<view class="item3">
			<image></image>
			<text>我已处理</text>
		</view>
		</view>
		<view class="line"></view>
	</view>	
	
	

	<view class="footer" v-if="isShow">
		<!-- 下拉框 -->
		<select  v-model="major" class="select">
		      <option v-for="(item,index) in majors" @click="changeTab" :value='item.id' :key="index" class="option">{{item.name}}</option>
		 </select>
		
		<view class="text">
			<text>总积分：</text>
			<text>356</text>
			<text>上传率</text>
			<text>76.5%</text>
		</view>
		<button>提交</button>
	</view>
	
	<view>
	<!-- 　　　　　　　// 其中uni-p-b-98是公共样式类名，表示padding-bottom: 98upx;  设置的98upx是和底部导航栏的高度保持一致，页面的内容就不会被底部导航遮挡住啦 -->
	            <view class="uni-p-b-98"></view>
	<!-- 　　　　　　　// 最后引入自定义组件，并传当前栏目对应的pagePath到自定义组件，显示当前栏目的选中样式 -->
	            <tabBar :pagePath="'AddSocre/addSocre'"></tabBar>
	 </view>
	</view>
	
	
</template>

<script>
 // import xTab from '@/components/common/poiuy-xTab/xTab.vue';
	export default{
		name:"addSocre",
		components:{
			// xTab
		},
		onLoad(){
			// 获取动态高度
			 this.setSwiperHeight();
		},
		data(){
			return{
				tabList: [{
					name:'已处理',
					id:0
					},
					{
						name:'待处理',
					id:1
					},
				],
				colleges:[{
					name:'信息学院',
					id:0
					},
					{
						name:'工程学院',
					id:1
					},
					{
						name:'财经学院',
					id:2
					},
				],
				major:"信息管理与信息系统",
				majors:[{
					name:'信息管理与信息系统',
					id:0
					},
					{
						name:'数字媒体技术',
					id:1
					},
					{
						name:'酒店管理',
					id:2
					},
				],
				//swiper当前位置
				swiperCurrIndex:0,
				//swiper动态高度
				swiperHegiht:300, 
				isShow:true
			}
		},
		methods:{
			
			changeTab(e){
			  console.log(e);
			  this.swiperCurrIndex = e.index;
				if(e.index==1){
					this.isShow=false
				}
				else{
					this.isShow=true
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
			                        that.swiperHegiht = data.height * 2 + 110; 
			                    }
			                }).exec();
			            }
			
		}
		
	}
</script>

<style lang="scss">
	page{
		
	.border{
		display: flex;
		flex-direction: column;
		height: 8.3125rem;
		margin-top: 2.875rem;
		border: 0.0625rem solid red;
		.con{
		
			display: flex;
			justify-content: space-around;
			image{
				margin: 7% 0 0 2%;
				height: 3rem;
				width: 3rem;
				border: 0.0625rem solid red;
				border-radius: 100%;
			}
			.item1{
				display: flex;
				flex-direction: column;
				font-size: 0.5rem;
				justify-content: space-evenly;
			}
			.item2{
				font-weight: bold;
				color: #C9A65E;
				margin-top: 7%;
				font-size: 0.625rem;
			}
			.item3{
				display: flex;
				flex-direction: column;
			
				image{
					height: 4.0625rem;
					width: 4.0625rem;
					margin-top: 10%;
				}
			}
		}
		.line{
			height: 0.0625rem;
			margin: 5% 5% 5% 5%;
			background-color: gray;
		}
	}
		
	.footer{
		background: #FFFCEB;
		height:40%;
		
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		border: 1px solid red;
		position: absolute;
		width: 100%;
		bottom: 1.4rem;
		select{
			width: 80%;
			height: 15%;
			margin: 8% auto;
			background-color: gray;
			
		}
		.text{
			display: flex;
			justify-content: space-between;
			margin: 10% 10% 0 10%;
			
		}
		button{
			
			height: 2.1875rem;
			line-height: 100%;
			width: 80%;
			border-radius: 20px;
			margin: 10% auto;
			
			text-align: center;
			background-color: #C9A65E;
			color: white;
		}
	}	
		
		
	}
	
	
	
</style>
