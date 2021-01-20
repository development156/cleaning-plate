<template>
	
	<view>
	<view class="window-choice" @click="show(0)">{{ShowTab}}</view>
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
			<image style="height: 234rpx; width: 300rpx;background: #3F536E; border-radius: 10rpx;" mode="aspectFit" :src="item.url"
			    @error="imageError"></image>
				<view style="display: flex; justify-content: space-between;">
					<span>{{item.dishName}} </span> 
					<span> {{item.price}} </span>
				</view>
		</view>
		</view>
	</view> 
	 
	 <view class="input-food">
		 <view class="food-photo" >
			 <addPhoto @photoShow="showPicture($event)"></addPhoto>
		 </view>
		
		<!-- 食物价格 -->
		<view  class="food-price">
					 <input class="input-name" type="number" v-model="inputInfo.price" maxlength="15" placeholder="输入价格" />		 
		</view>
		
		<view class="food-info" >
				<input class="input-name" v-model="inputInfo.dishName" maxlength="20" placeholder="输入菜品名称" />
				
				<!-- -食堂  待处理- -->
				<view class="choice host-choice" @click="show(1)">{{ShowTab1}}</view>
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
				
				<!-- -楼层 待处理- -->
				<view class="choice layer-choice" @click="show(2)">{{ShowTab2}}</view>
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
		
			
			
		
				<!-- -窗口  待处理- -->
				<view class="choice wind-choice"  @click="show(3)" >{{ShowTab3}}</view>
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
	import { FoodUpload } from '@/models/admin/Upload/foodUpload.js'
	const upLoad = new FoodUpload();
	
	import addPhoto from "../../../../components/common/add-photo.vue"

	
	 export default {
	  name:'UploadFood',
	  data() {
	  return {
		  //输入的信息
		inputInfo:{  
			"diningRoom":"",//第二食堂
			"floor":"",//一楼
			"window":"",//2号窗口
			"dishName":"",
			"price":"30",
			"url":"wewfwjefkwe",  
		  },
		  
		  diningRoom:'第二食堂',//食堂名称
		  floor:'一楼',//食堂楼层
		  window:'2号窗口',//窗口
		  
		//显示下拉框列表与否
			ShowHidden: false,
			ShowHidden1: false,
			ShowHidden2: false,
			ShowHidden3: false,
			//显示下拉框选择的内容
			ShowTab:'-点击选择窗口-',
			ShowTab1:'-食堂 未选择-',
			ShowTab2:'-楼层 未选择-',
			ShowTab3:'-窗口 未选择-',
	   
	   //选择得下拉框下标
	   	activeIndex:"-1",//	   ShowHidden: true,////如果想要设置默认选中，activeIndex值和索引值对应即可；例如，activeIndex等于0，默认选中就是按钮A
		activeIndex1:"-1",
		activeIndex2:"-1",
	    activeIndex3:"-1",
		
		//下拉框窗口
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
		   //食堂下拉表
		   windowlist1:[
			   {
			   	num:"第二食堂"
			   },	
			   	{
			   		num:"一楼"
			   	},
			   	{
			   		num:"2号窗口"
			   	},{
			   		num:"窗口B"
			   	},
		   ],
		     //楼层下拉表
		   windowlist2:[
					{
						num:"一楼"
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
		   //窗口下拉表
		   windowlist3:[
						{
							num:"2号窗口"
						},
		   ],
		//willUploadUrl:'',//即将上传的图片
		//食物列表
			foodlist:[
				
					{
						dishName: "冒菜", 
						price: 30, 
						url: "wewfwjefkwe", 
						favour: 0, 
						state: 1
					},
			]
	  };
	  },
	  components:{
		addPhoto  
	  },
	  created() {
			//获得菜得数据
			this.gotMenu();
	  },
	  methods: {
		  
	   //获取数据
	   gotMenu(){
		   upLoad.getMenu({
		   	"diningRoom":this.diningRoom,
		   	"floor":this.floor,
		   	"window":this.window,
		   }
		   ).then(res => {
		   	this.foodlist=res.data
		   })
		   .catch(err => {
		   	uni.showModal({
		   			content: err.msg,
		   			showCancel: false
		   	});
		   })
	   },
	   //添加数据
	   addData(){
				//上传菜名接口
					upLoad.uploadMenu( this.inputInfo ).then(res => {
					console.log(res)
					//如果菜名为空返回
					if(this.inputInfo.dishName==''){
						uni.showToast({
							title: '菜名不能为空',
							icon:'none',
							duration: 2000
						});
						return
					}
					
					console.log(this.inputInfo.floor)
					if(this.inputInfo.diningRoom ==''||this.inputInfo.floor==''|| this.inputInfo.window==''){
						uni.showToast({
							title: '未选择完全哦',
							icon:'none',
							duration: 2000
						});
						return
					}
					
					this.gotMenu();
					
				    uni.showToast({
				    	    title: res.msg,
				    	    duration: 1500
				    	});	
					this.ShowTab="-点击选择窗口-"
					this.ShowTab1='-食堂 未选择-'
					this.ShowTab2='-楼层 未选择-'
					this.ShowTab3='-窗口 未选择-'
					
				})
				.catch(err => {
					console.log(err)
					uni.showModal({
							content: err,
							showCancel: false
						});
				})	
	   },
	   //显示照片
	   showPicture(imgurl){
		   console.log(imgurl[0]);
	   },

		imageError: function(e) {
	      console.error('image发生error事件，携带值为' + e.detail.errMsg)
		},
		
		//点击下拉框
	    tap(index){
			
	   			  this.activeIndex=index;
				  setTimeout(()=>{ this.HiddenClick()}, 100);
				  //设置选择的窗口得显示
				  this.ShowTab = this.windowlist[index].num 
				  //把]不能给inputinfo 因为这是查询得输入
				  // this.inputInfo.window = this.windowlist[index].num 
				  
	    },
		tap1(index){
			//食堂
				  this.activeIndex1=index;
				  setTimeout(()=>{ this.HiddenClick()}, 100);
				  this.ShowTab1 = this.windowlist1[index].num 
				  this.inputInfo.diningRoom = this.windowlist1[index].num 
		},
		tap2(index){
			//楼层
				  this.activeIndex2=index;
				  setTimeout(()=>{ this.HiddenClick()}, 100);
				  this.ShowTab2 = this.windowlist2[index].num 
				  this.inputInfo.floor = this.windowlist2[index].num 
		},
		tap3(index){
			//窗口
				  this.activeIndex3=index;
				  setTimeout(()=>{ this.HiddenClick()}, 100);
				  this.ShowTab3= this.windowlist3[index].num 
				  this.inputInfo.window = this.windowlist3[index].num 
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
		.food-price{
			width: 260rpx;
			height: 60rpx;
			border-radius: 10rpx;
			position: relative;
			left: 30rpx;
			top: 54rpx;
			.input-name{
				background-color: #FFFFFF;
			}
		}
		.food-photo{
			width: 260rpx;
			height: 260rpx;
			border-radius: 20rpx;
			position: relative;
			left: 30rpx;
			top: 38rpx;

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
				line-height:240% ;
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
				top: 25.5%;
			}
			.layer-choice{
				
				position: absolute;
				left: 344rpx;
				// top: 214rpx;
				top: 44%;
			}
			.wind-choice{
				position: absolute;
				left: 344rpx;
				// top: 304rpx;
				top: 62%;
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
