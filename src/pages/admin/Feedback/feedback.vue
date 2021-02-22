<template>
	<view class="info-list">
	
		<!-- <uni-swipe-action> -->
	       <view class="info-item" v-for="(item,index) in array" :key="index" >
			   <!-- <uni-swipe-action-item :right-options="options"  @click="bindClick" @change="swipeChange($event, index)"> -->
			
			<view class="touch-list list-touch clearfix" @touchstart="touchS" @touchmove="touchM" @touchend="touchE" :data-index="index" :style="item.txtStyle" ><!-- @click="goDetail(item.id)" -->
			  
			
			<navigator :url="'./inputFeed?id='+item.id" hover-class="navigator-hover"> <!-- hover-class="navigator-hover" -->
			<view class="info-item1">
	            <view class="info_image">


					<image style="width:92rpx; height: 92rpx; background-color:#7094AE ;border-radius: 200rpx;" :src="item.avatarUrl | formatAvatarUrl " @error="imageError"></image>

	            </view>
	            <view class="info_content">
					
				<view class="info_contr">
				<text class="info_nickname">{{item.nickName}}</text>
				<span class="data">{{item.date}}</span>
				</view>
				
				<view class="info_backinfo">{{item.description}}</view>
				</view>
			</view>	
			</navigator>	
				 <!-- </uni-swipe-action-item> -->
	       
		   
			</view>	
		   <view class="touch-list list-delete" :data-userid="item.id" @click= "deleteMember(item.id)" >
		       删除
		   </view>
			</view>	
		<!-- </uni-swipe-action>	 -->
				
			<view v-if="have" class="have"> 暂无反馈信息</view>
			<view>
			<!-- 　　　　　　　// 其中uni-p-b-98是公共样式类名，表示padding-bottom: 98upx;  设置的98upx是和底部导航栏的高度保持一致，页面的内容就不会被底部导航遮挡住啦 -->
			            <view class="uni-p-b-98"></view>
			<!-- 　　　　　　　// 最后引入自定义组件，并传当前栏目对应的pagePath到自定义组件，显示当前栏目的选中样式 -->
			            <tabBar :pagePath="'Feedback/feedback'"></tabBar>
			  </view>
	 </view>		
	
</template>

<script>

	
	import { FeedBack } from '@/models/admin/FeedBack/feedback.js'
	const feedBack = new FeedBack();
	import { mapGetters } from 'vuex'
	
	
	export default{
		
		data() {
		   return {
			   // 控制删除
			delBtnWidth: 70, //删除按钮宽度单位（rpx）
			startX:'',
			// 强制刷新界面
			
		   	have:false,
		   	array: [
				// {
		  //  	        "nickname":"它的昵称",
		  //  	           "image":"头像",
		  //  	           "description":"我觉得食堂很好很好很好很好太好了哈哈哈哈哈哈哈哈哈哈哈哈",
		  //  	           "date": "2021-01-01 10:55:05",
		  //  	        } ,
		   // 	        {
		   // 	        	"nickname":"它的昵称",
		   	        	
		   // 	         "studentId": "2",
		   // 	         "type": "食堂",
		   // 	         "date": "2021-01-01 10:55:05",
		   // 	         "description": "问对方窘境发i就覅覅hi哦佛方窘境发i就覅覅hi哦佛方窘境发i就覅覅hi哦佛方窘境发i就覅覅hi哦佛方窘境发i就覅覅hi哦佛海哦妨害司法",
		   // 	         "id": 100      
		   
		   // 	    },
		   							
		   	],
			options:[
						{
			      text: '取消',
			      style: {
			          backgroundColor: '#007aff'
			      }
			  }, {
			      text: '确认',
			      style: {
			          backgroundColor: '#dd524d'
			      }
			  }
			]
		   	
		   	}     
		},
		
		components:{
			// uniSwipeActionItem,
			// uniSwipeAction
		},
		created() {
				this.checkfeedList();
			},
			methods: {
				
			checkfeedList:function(){
				feedBack.checkFeedbackList().then(res => {
					
					this.array = res.data;
					if(res.code==1005){
						this.have=true;
					}
					
				})
				.catch(err => {
					uni.showModal({
							content: "宝贝 你连网了吗？",
							showCancel: false
					});
				})
			},
				// 删除按钮
			touchS: function (e) {
			              // console.log('touchS')
			              if (e.touches.length == 1) {
			                  //设置触摸起始点水平方向位置
			                  this.startX=e.touches[0].clientX
			                  // console.log(this.startX)
			              }
			 },
			touchM: function (e) {
			     // console.log('touchM')
			    if (e.touches.length == 1) {
			        //手指移动时水平方向位置
			        var moveX = e.touches[0].clientX;
			        //手指起始点位置与移动期间的差值
			        var disX = this.startX - moveX;
			        var delBtnWidth = this.delBtnWidth;
			        var txtStyle = "";
			        if (disX == 0 || disX < 0) {//如果移动距离小于等于0，说明向右滑动，文本层位置不变
			            txtStyle = "left:0px";
			        } else if(disX > 0){//移动距离大于0，文本层left值等于手指移动距离
			            txtStyle = "left:-" + disX + "px";
			            if (disX >= delBtnWidth) {
			                //控制手指移动距离最大值为删除按钮的宽度
			                txtStyle = "left:-" + delBtnWidth + "px";
			            }
			        }
			        //获取手指触摸的是哪一项
			        var index = e.currentTarget.dataset.index;
			        var list = this.array;
			        list[index].txtStyle = txtStyle;
			        // console.log(list[index].txtStyle)
			        //更新列表的状态
			        this.array=list;
			    }
			},         
			touchE: function (e) {
			    // console.log('touchE')
			    if (e.changedTouches.length == 1) {
			        //手指移动结束后水平位置
			        var endX = e.changedTouches[0].clientX;
			        //触摸开始与结束，手指移动的距离
			        var disX = this.startX - endX;
			        var delBtnWidth = this.delBtnWidth;
			        //如果距离小于删除按钮的1/2，不显示删除按钮
			        var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
			        //获取手指触摸的是哪一项
			        var index = e.currentTarget.dataset.index;
			        var list = this.array;
			        list[index].txtStyle = txtStyle;
			        // console.log(list[index].txtStyle)
			        //更新列表的状态{
			        this.array=list
			    }
			},         
			     
			deleteMember: function (e){
				 var th = this;
				feedBack.deleteFeedBackByAdmin(e).then(res => {
					console.log(res)
					if(res.code==200){
					
						th.checkfeedList();
				
					uni.showToast({
					title: '删除成功',
						icon:'none',
						duration: 1300,
						
					});	
					
					}
				})
				.catch(err => {
					uni.showToast({
					title: '删除失败',
						icon:'none',
						duration: 1080
					});	
				})
			},		  
					  
					  
					  
			imageError: function(e) {
			console.error('image发生error事件，携带值为' + e.detail.errMsg)
			},
			},
			computed: {
				...mapGetters([
					'userInfo'
				])
			},
			filters: {
				formatAvatarUrl(val) {
					if (val) {
						return val
					} else {
						return require('../../../static/images/common/default-avatar.png')
					}
				},
				
			},		 
	}
</script>

<style scoped lang="scss">
	page{
		display: flex;
	.info-list{
		
		top:0;
		overflow: hidden;
		// overflow-y: scroll;
		background: #FFFFFF;
		width: 100%;
		margin: 0 auto;
		padding-bottom: 98upx;
		.have{
			color: #808080;
			text-align: center;
			margin: 480rpx auto;
		}
		.info-item{
			position: relative;
			
			
		.touch-list{
	    position: absolute; 
	    top:0; 
	    // padding: 10px 10px 10px;
	    
		// background-color: #007AFF;
	    
	    overflow: hidden;
		}
		.list-touch{
		    position: relative;
		    width: 100%;   
		    z-index: 1;    
		    transition: left 0.3s ease-in-out;   
		    white-space:nowrap;   
		    overflow:hidden;   
		    text-overflow:ellipsis; 
		}
		
		.list-delete{
			
		    right: 0; 
		    float: left;
		    width: 140rpx;
		    height: 100%;
			line-height:208rpx;
		    background-color: #EA5863;
			
			
		    border-radius: 0 20rpx 20rpx 0;
		    color: #fff;
		    font-size: 34rpx;
		    font-weight: lighter;
		    text-align: center;
			
		}
	
	
		.info-item1{
			background-color: #FFFFFF;
			display: flex;
			justify-content: space-evenly;
			flex-flow: row  nowrap;
			
			height:208rpx;
			// border: 2rpx solid rgba(255, 255, 255, 100);
			
			
			
			.info_image{
				
				// margin-left: 5rpx;
				margin-top:34rpx;
				
				// border: 2rpx solid rgba(255, 255, 255, 100);
			}
			.info_content{
				flex-flow:column;
				margin-left:25rpx;
				margin-top: 32rpx;
			    border-bottom:1px solid rgba(	192,192,192,0.4);
				.info_contr{
					  display: flex;
					  flex-flow:  row nowrap;
					  justify-content: space-between;

				.info_nickname{
					color: rgba(16, 16, 16, 100);
					font-size: 16px;
					
				}
				.data{
					color: rgba(119, 118, 114, 100);
					font-size: 14px;
					
					// margin-left:270rpx;
				}
				}
				.info_backinfo{
					margin-top: 18rpx;
					width: 508rpx;
					// height: 78rpx;
					color: rgba(119, 118, 114, 100);
					font-size: 14px;
					
					 overflow: hidden;
					-webkit-line-clamp: 2; 
					-webkit-box-orient: vertical;
					display: -webkit-box;
			
					  
				}
				
			}
		}
		}
		}
	}
</style>
