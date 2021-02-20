<template>
	
	<view>
		<view class="tab-view">
<xTab :value="windowlist1" @changeTab="changeTab1" actType="underline" :config="{ padding:20,spacing: 100,color:'#666666',actColor:'#C9A65E',size:32,actWeight:'Bold',position:0}"></xTab>
<xTab :value="windowlist2" @changeTab="changeTab2" actType="underline" :config="{padding:20,spacing: 115,background:'#1989FA',color:'#666666',actColor:'#1989FA',size:32,actWeight:'Bold',position:0}"></xTab>
		</view>
	<view class="window-choice" @click="show(0)">{{ShowTab}}</view>
	<!-- 下拉 -->
	<view class="arrivalNavigation" v-if="ShowHidden">
	  <view class="d4"></view>
	  <view class="sideNavigation">
	  <ul>
		<li 
	 v-for="(item,index) in windowlist" :key="item.id" @click="tap(index)" :class="activeIndex==index ? 'active' : ''"
	 > {{item.name}} 
	 </li>
	  </ul>
	  </view>
	 </view>
	 
	<view class="food-show">
		<view class="food-list"  v-for="(item,index) in foodlist" :key="index">
		<view class="one-food">
			<image style="height: 234rpx; width: 300rpx;background: #EEEEEE; 
			border-radius: 10rpx;" mode="aspectFit" :src="imgurl+item.url"
			    @error="imageError"></image>
				
				<!-- 移除菜品的按钮  -->
				<view class="q-image-remover" @tap="removeImage(item.id)"> <!-- :data-idx="idx" -->
				    <text>x</text>
				</view>
				
				<view style="display: flex; justify-content: space-between;">
					<span>{{item.dishName}} </span> 
					<span> {{item.price}} </span>
				</view>
		</view>
		</view>
	</view> 
	
	<p v-show="hasNoData" style="color: #808080; width: 100%;text-shadow:5px 5px 5px #C8C7CC; text-align: center; margin-top: 240rpx;"> 此处尚未添加菜品哦 </p>
	 
	 <view class="input-food">
		 <view class="food-photo" >
			 <image :src="imgurl+imgPath" v-if="showpicture"  mode="aspectFill"/>
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
						v-for="(item,index) in windowlist1" :key="item.id" @click="tap1(index)" :class="activeIndex1==index ? 'active' : ''"
						> {{item.name}} 
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
						v-for="(item,index) in windowlist2" :key="item.id" @click="tap2(index)" :class="activeIndex2==index ? 'active' : ''"
					> {{item.name}} 
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
					> {{item.name}} 
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
	
	import addPhoto from "./components/add-photo.vue"
	import xTab from '@/components/common/poiuy-xTab/xTab.vue'

	import {ManageCanteen} from '@/models/admin/Management/ManageCanteen/manageCanteen.js'
	const manageCanteen = new ManageCanteen();
	
	 export default {
	  name:'UploadFood',
	  onLoad:function(e){  
	        this.imgurl=this.imgUrl;
	 },
	  data() {
			return {
				showpicture:false,
				imgPath:'',//请求的图片路径
				imgurl:'',//根路径
				//判断是否有数据
				hasNoData:false,
			//输入的信息
				inputInfo:{
					"diningRoom":"",//第二食堂
					"floor":"",//一楼
					"window":"",//2号窗口
					"dishName":"",
					"price":"",
					"url":"",  
				  },	
				//传参内容
				diningRoom:'',//食堂名称 第二食堂
				floor:'',//食堂楼层 一楼
				window:'',//窗口 2号窗口
				
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
				windowlist:[],
				//食堂下拉表
				windowlist1:[
										  // {
										  // 	name:"未添加",
										  // 	id:0
										  // },	
										  //  {
										  //  	name:'小食堂',
										   		
												// id:1
										  //  },
				],	   
				//楼层下拉表
				   windowlist2:[
							// {
							// 	name:"未添加",
							// 	id:0
							// },	
				// 				{
				// 					name:"二楼",
				// 					id:1
				// 				},	
				],	    
				//窗口下拉表
				   windowlist3:[
								// {
								// 	name:"尚未添加",
								// 	id:0
								// },
				   ],
				//食物列表
					foodlist:[
							// {
							// 	dishName: "待添加", 
							// 	price: 0, 
							// 	url: "wewfwjefkwe", 
							// 	favour: 0, 
							// 	state: 1,
							// id:
							// },
					],
					
			};
	  },
	  components:{
		addPhoto,
		xTab
	  },
	  created() {
		  //获取所有食堂的名称
			this.getCanteeName();
			
	  },
	  methods: {
		changeTab1(e){
		            // console.log(e.index);
		            this.diningRoom=this.windowlist1[e.index].name;
					this.gotMenu();
						
		},
		changeTab2(e){
		      // console.log(e.index);
		       this.floor=this.windowlist2[e.index].name;
			   this.gotMenu();
						
		},
		
		//获取所有食堂的名称
		getCanteeName(){
			var th=this;
			manageCanteen.getCanteenName().then( res => {
				console.log(res)
				if(res.code == 200){
					// 初始化开始界面的数据
					th.diningRoom = res.data[0];

					var id=0;
					res.data.forEach(function(element) {
					  th.windowlist1.push({
						  name:element,id:id,
					  })
					  
					  id++;
					});
					
					
					th.getCanteeInfo(th.windowlist1[0]);
				}else if(res.code == 1005){
					uni.showModal({
							content: "快去添加食堂哦~",
							showCancel: false
						});
				}
			}).catch(err => {
				uni.showModal({
						content: "error",
						showCancel: false
					});
			})
		},
		//获取相应食堂的楼层及窗口信息
		getCanteeInfo(CanteenName){
			var th=this;
			// console.log("CanteenName.name")
			// console.log(CanteenName.name)
			manageCanteen.getCanteenInfo({"CanteenName":CanteenName.name}).then( res => {
				// console.log(res)
				if(res.code==200){
					// 初始化开始界面的数据
					th.floor = res.data[0].floor;
					th.window =res.data[0].windowsList[0].windows;
					th.ShowTab=res.data[0].windowsList[0].windows;
					
					
					var id=0;
					//导入楼层
					res.data.forEach(function(element) {
						
						th.windowlist2.push({
							name:element.floor,id:id,
						})
						id++;		
							
					element.windowsList.forEach(function(element2){	
						//导入窗口
						th.windowlist.push({
							name:element2.windows,id:element2.id,
						})
						th.windowlist3.push({
							name:element2.windows,id:element2.id,
						})
						
					})		
				// console.log(th.windowList)	
				})
				
				//获得菜得数据
				this.gotMenu();
				}else if(res.code==1005){
					uni.showModal({
							content: "快去添加楼层窗口哦~",
							showCancel: false
						});
				}
					
			}).catch(err => {
				uni.showModal({
						content: "error",
						showCancel: false
					});
			})
		},
	   //获取数据
	   gotMenu(){
		   upLoad.getMenu({
		   	"diningRoom":this.diningRoom,
		   	"floor":this.floor,
		   	"window":this.window,
		   }
		   ).then(res => {
			   console.log("res")
			   console.log(res)
			if(res.code == 200){
				this.hasNoData=false;
				this.foodlist=res.data
			}else if(res.code == 1005){
				this.foodlist='';
				this.hasNoData=true;
				
			}
		   	
		   })
		   .catch(err => {
		   	uni.showModal({
		   			content: "检查小程序是否联网给哦",
		   			showCancel: false
		   	});
		   })
	   },
	   //添加数据
	   addData(){
				//上传菜名接口
					upLoad.uploadMenu( this.inputInfo ).then(res => {
					// console.log(res)
					//如果菜名为空返回
					if(this.inputInfo.dishName==''){
						uni.showToast({
							title: '菜名不能为空',
							icon:'none',
							duration: 2000
						});
						return ;
					}

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
					
					this.inputInfo.dishName=''
					this.inputInfo.url=''
					
				})
				.catch(err => {
					// console.log(err)
					uni.showToast({
						title: '添加失败',
						icon:'none',
						duration: 1500
					});
				})	
	   },
	   //显示照片
	   showPicture(imgurl){
		   console.log("showPicture")
		   //让图片置顶
		   this.showpicture = true ;
		   this.imgPath = imgurl;
		    this.inputInfo.url=imgurl;
	   },
		
		imageError: function(e) {
	      console.error('image发生error事件，携带值为' + e.detail.errMsg)
		},
		/**
		 * 删除菜品
		 */
		removeImage: function(e){
		    var idx = e;
			var th=this;
			upLoad.deleteMenu({"ID":idx}).then(res => {
				console.log(res)
				if(res.code == 200){
					uni.showToast({
						title: '删除成功',
						icon:'none',
						duration: 1500
					});
					th.gotMenu();
				}
			})
			.catch(err => {
				uni.showToast({
					title: '删除失败',
					icon:'none',
					duration: 1500
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
		//点击下拉框
	    tap(index){
	   			  this.activeIndex=index;
				  setTimeout(()=>{ this.HiddenClick()}, 100);
				  //设置选择的窗口得显示
				  this.ShowTab = this.windowlist[index].name
				  
				  this.window = this.windowlist[index].name
				  
				  this.gotMenu();
				  //把]不能给inputinfo 因为这是查询得输入
				  // this.inputInfo.window = this.windowlist[index].num 
				  
	    },
		tap1(index){
			//食堂
				  this.activeIndex1=index;
				  setTimeout(()=>{ this.HiddenClick()}, 100);
				
				  this.ShowTab1 = this.windowlist1[index].name
				 
				  this.inputInfo.diningRoom = this.windowlist1[index].name
		},
		tap2(index){
			//楼层
				  this.activeIndex2=index;
				  setTimeout(()=>{ this.HiddenClick()}, 100);
				  this.ShowTab2 = this.windowlist2[index].name 
				  this.inputInfo.floor = this.windowlist2[index].name
		},
		tap3(index){
			//窗口
				  this.activeIndex3=index;
				  
				  setTimeout(()=>{ this.HiddenClick()}, 100);
				  
				  this.ShowTab3= this.windowlist3[index].name 
				  this.inputInfo.window = this.windowlist3[index].name
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
	.tab-view{
		width: 750rpx;
		
	}
	.btn-upload{
		position: fixed;
		display: flex;
		width: 750rpx;
		// height: 70rpx;
		height: 4%;
		z-index: 0;
		bottom: 24rpx;
		left: 0;
		
		
		view{
			
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
		height: 38%;
		
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
			image{
				border-radius: 20rpx;
				width: 260rpx;
				height: 260rpx;
				position: absolute;
				left: 0rpx;
				top: 0rpx;
				z-index: 1;
			}
			// .non-activate{
			// 	border-radius: 20rpx;
			// 	width: 260rpx;
			// 	height: 260rpx;
			// 	position: absolute;
			// 	z-index: 0;
			// }

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
								z-index: 99;
				.sideNavigation1{
									z-index: 99;
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
								z-index: 99;
				.sideNavigation2{
									z-index: 99;
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
									z-index: 99;
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
								top: 36%;
								z-index:22;
				.sideNavigation3{
									
									overflow-y: scroll;
									z-index:22;
									max-height:150rpx ;
									// width: 308rpx;
									width: 73%;
									background-color: #FFFFFF;
									color: rgba(16, 16, 16, 100);
									box-shadow: 4rpx 0rpx 16rpx 5rpx rgba(0, 0, 0, 0.2);
								// 	border: 1rpx solid rgba(187, 187, 187, 100);
								ul{
									z-index:22;
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
		top: 278rpx;
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
		position: relative;
			.q-image-remover {
			    width: 0;
			    height: 0;
			    border-top: 66rpx solid #bfde85;
			    border-left: 66rpx solid transparent;
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
				    border-radius: 20rpx;
				    background-color: #bfde85;
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
		}
	}
	
	//窗口
	.window-choice{
		position: absolute;
		left: 56rpx;
		top: 176rpx;
		width: 238rpx;
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
			width: 240rpx;
					position: absolute;
					top: 228rpx;
					left: 56rpx;
					z-index: 99;
					.sideNavigation{
						overflow-y: scroll;
						// height: 310rpx;
						max-height:310rpx ;
						width: 245rpx;
						background-color: #FFFFFF;
						color: rgba(16, 16, 16, 100);
						box-shadow: -3rpx 5rpx  20rpx rgba(0, 0, 0, 0.1);
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
