<template>
	
	<view>
	<view class="window-choice" @click="show(0)">-点击选择窗口-</view>
	<!-- 下拉 -->
	<view class="arrivalNavigation" v-if="ShowHidden">
	  <view class="d4"></view>
	  <view class="sideNavigation">
	  <ul>
		<li 
	 v-for="(item,index) in windowlist" :key="index" @click="tap(index)" :class="activeIndex==index ? 'active' : ''"
	 > {{item.num}} 
	 </li>
	  </ul>
	  </view>
	 </view>
	 
	<view class="food-show">
		<view class="food-list"  v-for="(item,index) in foodlist" :key="index">
		<view class="one-food">
			<image style="height: 234rpx; width: 300rpx;background: #3F536E; border-radius: 10rpx;" mode="aspectFit" src=""
			    @error="imageError"></image>
				<view style="display: flex; justify-content: space-between;">
					<span>{{item.foodname}} </span> 
					<span> {{item.price}} </span>
				</view>
		</view>
		</view>
	</view> 
	 
	 <view class="input-food">
		 <view class="food-photo" >
			 <addPhoto @photoShow="showPicture($event)"></addPhoto>
		 </view>
		 
		<view class="food-info" >
			    <input class="input-name"  maxlength="20" placeholder="输入菜品名称" />
				<view class="choice host-choice" @click="show(1)">-食堂  待处理-</view>
				<view class="arrivalNavigation1" v-if="ShowHidden1">
				  
				  <view class="sideNavigation1">
				  <ul>
					<li 
					v-for="(item,index) in windowlist1" :key="index" @click="tap1(index)" :class="activeIndex1==index ? 'active' : ''"
				 > {{item.num}} 
				 </li>
				  </ul>
				  </view>
				 </view>
				
				
				
		
				<view class="choice layer-choice" @click="show(2)">-楼层 待处理-</view>
				<view class="arrivalNavigation2" v-if="ShowHidden2">
				  
				  <view class="sideNavigation2">
				  <ul>
					<li 
					v-for="(item,index) in windowlist2" :key="index" @click="tap2(index)" :class="activeIndex2==index ? 'active' : ''"
				 > {{item.num}} 
				 </li>
				  </ul>
				  </view>
				 </view>
				
				
			
				
				<view class="choice wind-choice" @click="show(3)">-窗口  待处理-</view>
				<view class="arrivalNavigation3" v-if="ShowHidden3">
				  
				  <view class="sideNavigation3">
				  <ul>
					<li 
					v-for="(item,index) in windowlist3" :key="index" @click="tap3(index)" :class="activeIndex3==index ? 'active' : ''"
				 > {{item.num}} 
				 </li>
				  </ul>
				  </view>
				  
				 </view>
		 </view>
	 </view>
	 
	 
	 <view class="btn-upload">

	 	 <!-- <navigator url="./addData" hover-class="navigator-hover"> -->
	 	<view @click="addData">上传</view>
	 	 <!--   </navigator> -->
	 </view>
	 </view>
</template>

<script>
	import { Upload } from '@/models/Upload/Upload.js'
	const upLoad = new Upload();
	
	import addPhoto from "../../../../components/common/add-photo.vue"

	
	 export default {
	  name:'UploadFood',
	  data() {
	  return {
		  
	   ShowHidden: false,
	   ShowHidden1: false,
	   ShowHidden2: false,
	   ShowHidden3: false,
	   	activeIndex:"-1",//	   ShowHidden: true,////如果想要设置默认选中，activeIndex值和索引值对应即可；例如，activeIndex等于0，默认选中就是按钮A
		activeIndex1:"-1",
		activeIndex2:"-1",
	    activeIndex3:"-1",
		   windowlist:[
	   		{
	   			num:"窗口B"
	   		},
			{
				num:"窗口B"
			},
			{
				num:"窗口B"
			},{
				num:"窗口B"
			},
	   	],
		windowlist1:[
			{
				num:"窗口B"
			},	
				{
					num:"窗口B"
				},
				{
					num:"窗口B"
				},{
					num:"窗口B"
				},
		],
		windowlist2:[
			{
				num:"窗口B"
			},	
				{
					num:"窗口B"
				},	
				{
					num:"窗口B"
				},	
				{
					num:"窗口Z"
				},	
		],
		windowlist3:[
			{
				num:"窗口B"
			},		
		],
		willUploadUrl:'',//即将上传的图片
		foodlist:[
			{
				imageurl:'',
				foodname:'麻婆豆腐',
				price:'¥7',
			},
			{
				imageurl:'',
				foodname:'麻婆豆腐',
				price:'¥7',
			},
			
		]
	  };
	  },
	  components:{
		addPhoto  
	  },
	  methods: {
	   addData(){
	   	
			upLoad.uploadMenu({
			"diningRoom":"第二食堂",
			"floor":"一楼",
			"window":"2号窗口",
			"dishName":"冒菜",
			"price":"30",
			"url":"wewfwjefkwe"
		}

	   ).then(res => {
	   		console.log(res)
	   		// this.array=res.data
			JSON.parse(res.data);
	   	    uni.showToast({
	   	    	    title: '操作成功',
	   	    	    duration: 1500
	   	    	});	
	   	})
	   	.catch(err => {
			console.log(err)
	   		
			uni.showModal({
								content: err,
								showCancel: false
						});
			console.log("err")	
	   	})	
	   },
	   //显示照片
	   showPicture(imgurl){
		   console.log(imgurl[0]);
	   },

		imageError: function(e) {
	      console.error('image发生error事件，携带值为' + e.detail.errMsg)
		},
	    tap(index){
			
	   			  this.activeIndex=index;
				  setTimeout(()=>{ this.HiddenClick()}, 350);
					
				  
	    },
		tap1(index){
				  this.activeIndex1=index;
				  setTimeout(()=>{ this.HiddenClick()}, 350);
		},
		tap2(index){
				  this.activeIndex2=index;
				  setTimeout(()=>{ this.HiddenClick()}, 350);
		},
		tap3(index){
				  this.activeIndex3=index;
				   setTimeout(()=>{ this.HiddenClick()}, 350);
		},
		show(num){
			if(num==0){
				this.ShowHidden = ! this.ShowHidden ;
			}else if(num==1){
				this.ShowHidden1 = ! this.ShowHidden1 ;
			}else if(num==2){
				this.ShowHidden2 = ! this.ShowHidden2;
			}else if(num==3){
				this.ShowHidden3 = ! this.ShowHidden3;
			}
		},
		   // 点击页面事件 隐藏需要隐藏的区域
		   HiddenClick () {
		    this.ShowHidden = false;
			this.ShowHidden1 = false;
			this.ShowHidden2 = false;
			this.ShowHidden3 = false;
			
		   },
	  },
	  mounted () {
	    
	   },
	 }
</script>

<style scoped lang="scss">

	.btn-upload{
		position: fixed;
		display: flex;
		width: 750rpx;
		// height: 70rpx;
		height: 4%;
		z-index: 2;
		bottom: 21rpx;
		left: 0;
		
		
		view{
			z-index: 2;
		    align-self: center;
			margin: 0 auto;
			width: 664rpx;
			height: 70rpx;
			line-height: 70rpx;
			border-radius: 40rpx;
			color: rgba(255, 255, 255, 100);
			font-size: 35rpx;
			font-weight: 500;
			background-color: rgba(201, 166, 94, 100);
			text-align: center;
			border: 2rpx solid rgba(187, 187, 187, 100);
		}
	}
	
	.input-food{
		overflow-y: scroll;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		width: 750rpx;
		height: 35%;
		
		border-radius: 10rpx;
		background-color: rgba(245, 245, 245, 100);
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: center;
		box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(0, 0, 0, 0.4);
		font-family: Arial;
		border: 2rpx solid rgba(255, 255, 255, 100);
		.food-photo{
			width: 260rpx;
			height: 260rpx;
			border-radius: 20rpx;
			position: relative;
			left: 28rpx;
			top: 42rpx;
			
			// ??AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
		
		// 		font-family: Microsoft Yahei;
		// 		font-weight: 500;
		// 		color: #F9F9F9 ;
		// 		font-size: 100rpx;
		// 		width: 260rpx;
		// 		height: 260rpx;
		// 		line-height: 260rpx;
		// 		border-radius: 10px;
		// 		background: #EBEBEB;
			











		}
		.food-info{
			
			.input-name{
				position: absolute;
				left: 344rpx;
				top: 38rpx;
				// width: 378rpx;
				width: 42%;
				// height: 60rpx;
				height: 13%;
				line-height:100% ;
				color: rgba(136, 136, 136, 100);
				font-size: 28rpx;
				text-align: left;
				padding-left: 20rpx;
				padding-right: 20rpx;
				background: #FFFFFF;
				font-family: Microsoft Yahei;
				border: 2rpx solid rgba(255, 255, 255, 100);
			}
			.choice{
				padding-left: 20rpx;
				padding-right: 20rpx;
				// width: 378rpx;
				width: 42%;
				// height: 64rpx;
				height: 13%;
				// line-height: 64rpx;
				line-height:210% ;
				background: #FFFFFF;
				color: rgba(136, 136, 136, 100);
				font-size: 28rpx;
				text-align: left;
				font-family: Microsoft Yahei;
				border: 2rpx solid rgba(255, 255, 255, 100);
			}
			.host-choice{
				
				position: absolute;
				left: 344rpx;
				// top: 124rpx;
				top: 27%;
			}
			.layer-choice{
				
				position: absolute;
				left: 344rpx;
				// top: 214rpx;
				top: 45%;
			}
			.wind-choice{
				position: absolute;
				left: 344rpx;
				// top: 304rpx;
				top: 63%;
					//下拉窗口!!
					
			}
		}
		
		//下拉1
		.arrivalNavigation1{
								// width: 308rpx;
								width: 66%;
								
								position: absolute;
								left: 344rpx;
								// top: 260rpx;
								top: 40%;
								z-index: 999;
				.sideNavigation1{
									z-index: 999;
									overflow-y: scroll;
									max-height:140rpx ;
									// width: 308rpx;
									width: 73%;
									background-color: #FFFFFF;
									color: rgba(16, 16, 16, 100);
									box-shadow: 4rpx 5rpx 16rpx 5rpx rgba(0, 0, 0, 0.2);
								// 	border: 1rpx solid rgba(187, 187, 187, 100);
								ul{
									padding:0 ;
									margin: 0 auto;
									// width: 308rpx;
									z-index: 999;
								}
								li{
									
									// width:100%;
									list-style-type:none;
									height: 50rpx;
									line-height: 50rpx;
									text-align: left;
									padding-left: 24rpx;
									line-height: 60rpx;
									font-size: 36rpx;
								// border-bottom: 1rpx solid rgba(187, 187, 187, 100);
			}
		
			}
		.active{
					color: #FFFFFF;
					background: #555555;
				}
		}
		
		
		
		
		//下拉2
		.arrivalNavigation2{
								// width: 308rpx;
								width: 66%;
								
								position: absolute;
								left: 344rpx;
								// top: 260rpx;
								top: 59%;
								z-index: 999;
				.sideNavigation2{
									z-index: 999;
									overflow-y: scroll;
									
									max-height:110rpx ;
									// width: 308rpx;
									width: 73%;
									background-color: #FFFFFF;
									color: rgba(16, 16, 16, 100);
									box-shadow: 4rpx 5rpx 16rpx 5rpx rgba(0, 0, 0, 0.2);
								// 	border: 1rpx solid rgba(187, 187, 187, 100);
								ul{
									padding:0 ;
									margin: 0 auto;
									// width: 308rpx;
									z-index: 999;
								}
								li{
									
									// width:100%;
									list-style-type:none;
									height: 50rpx;
									line-height: 50rpx;
									text-align: left;
									padding-left: 24rpx;
									line-height: 60rpx;
									font-size: 36rpx;
								// border-bottom: 1rpx solid rgba(187, 187, 187, 100);
			}
		
			}
		.active{
					color: #FFFFFF;
					background: #555555;
				}
		}
		
		
		//下拉框3
		.arrivalNavigation3{
								// width: 308rpx;
								width: 66%;
								position: absolute;
								left: 344rpx;
								// top: 260rpx;
								top: 54%;
								z-index:2000;
				.sideNavigation3{
									
									overflow-y: scroll;
									
									max-height:150rpx ;
									// width: 308rpx;
									width: 73%;
									background-color: #FFFFFF;
									color: rgba(16, 16, 16, 100);
									box-shadow: 4rpx 0rpx 16rpx 5rpx rgba(0, 0, 0, 0.2);
								// 	border: 1rpx solid rgba(187, 187, 187, 100);
								ul{
									padding:0 ;
									margin: 0 auto;
									// width: 308rpx;
								}
								li{
									padding-left: 24rpx;
									
									list-style-type:none;
									height: 50rpx;
									text-align: left;
									line-height: 60rpx;
									font-size: 36rpx;
								// border-bottom: 1rpx solid rgba(187, 187, 187, 100);
			}
		
			}
		.active{
					color: #FFFFFF;
					background: #555555;
				}
		
		}
		
		
	}
	
	.food-show{
		display: flex;
		flex-direction: row; 
		flex-wrap: wrap;
		justify-content: space-between;
		position: absolute;
		top: 280rpx;
		left:64rpx ;
		height: 38%;
		width: 634rpx;
		margin: 0 auto;
		overflow-y: scroll;
		
		.one-food{
		width: 300rpx;
		height: 276rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		margin-bottom: 20rpx;
		}
	}
	
	//窗口
	.window-choice{
		position: absolute;
		left: 56rpx;
		top: 176rpx;
		width: 246rpx;
		height: 60rpx;
		line-height: 60rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-family: Microsoft Yahei;
		text-align: center;
		border: 2rpx solid rgba(187, 187, 187, 100);
		border-radius: 10rpx;
	}
	
	//下拉窗口
	 .arrivalNavigation{
			width: 245rpx;
					position: absolute;
					top: 228rpx;
					left: 40rpx;
					z-index: 99;
					.sideNavigation{
						overflow-y: scroll;
						// height: 310rpx;
						max-height:310rpx ;
						width: 245rpx;
						background-color: #FFFFFF;
						color: rgba(16, 16, 16, 100);
						box-shadow: 3rpx 3rpx 2rpx 5rpx rgba(0, 0, 0, 0.1);
					// 	border: 1rpx solid rgba(187, 187, 187, 100);
					ul{
						padding:0 ;
						margin: 0 auto;
						width: 245rpx;
					}
			 li{
					
						list-style-type:none;
						height: 50rpx;
						text-align: center;
						line-height: 60rpx;
						font-size: 36rpx;
					// border-bottom: 1rpx solid rgba(187, 187, 187, 100);
			 }
				
			 
					}
			.active{
						color: #FFFFFF;
							background: #555555;
					}
			.d4{
			// position: absolute;
			//  left: 140rpx;
						width: 0; 
						height: 0;
						margin-left: 150rpx;
						margin-top: -20rpx;
						border-width:20rpx;
						border-style: solid;
						border-color: transparent rgba(187, 187, 187, 100) transparent transparent;
						transform: rotate(90deg); /*顺时针旋转90°*/
			 
			}
	   }
</style>
