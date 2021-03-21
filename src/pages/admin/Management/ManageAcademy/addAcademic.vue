<template>
	<view>
	<view :hidden="userFeedbackHidden" class="popup_content">
				<view class="popup_title">添加学院信息</view>
				<view class="popup_textarea_item">
					<input type="text" maxlength="12" class="popup_textarea" value=""  v-model="feedbackAacedemy" placeholder="输入学院名称"/>
					<input type="text" maxlength="20" class="popup_textarea" value=""  v-model="feedbackProfession" placeholder="输入专业名称"/>
					<input type="text" maxlength="10" class="popup_textarea" value=""  v-model="feedbackGrade" placeholder="输入年级"/>
									
				
				
				<view @click="submitFeedback" class="buttons">
					<text class="popup_button">确定</text>
				</view>
			</view>
		</view>
	<view class="popup_overlay" :hidden="userFeedbackHidden" @click="hideDiv()"></view>
	</view>
</template>

<script>
	import {ManageAcademy} from '@/models/admin/Management/ManageAcademy/manageAcademy.js'
	const manageAcademy = new ManageAcademy()
	export default {
		// props:['message'],
		data() {
			return {
			userFeedbackHidden: false, // 默认隐藏
			feedbackAacedemy: '' ,// 输入学院
			feedbackGrade:'',
			feedbackProfession:''
			};
		},
		
		methods:{
			showDiv() { // 显示输入弹出框
				this.userFeedbackHidden = false;
			},
			hideDiv() { // 隐藏输入弹出框
				this.userFeedbackHidden = true;
			},
			submitFeedback() { // 提交
				var th= this;
				manageAcademy.addCollegeInfo({
				"college":th.feedbackAacedemy,
				"profession":th.feedbackProfession,
				"grade":th.feedbackGrade,
				}).then( res => {
					if(res.code==200){
					
					th.userFeedbackHidden = true;
					
					uni.showToast({
						title: '上传成功',
						// icon:'none',
						duration: 1400
					});
					
					uni.redirectTo({
						url:'./index'
					})
					}
				}).catch(err => {
					th.userFeedbackHidden = true;
					
					uni.showModal({
							content: "添加失败",
							showCancel: false
						});
				})
				
				
				 // 提交内容
			},
		}
	}
</script>

<style scoped>
	page{
		
	}
	.popup_overlay {
			position: fixed;
			top: 0%;
			left: 0%;
			width: 100%;
			height: 100%;
			background-color: black;
			z-index: 1001;
			-moz-opacity: 0.7;
			opacity: .60;
			filter: alpha(opacity=88);
		}
			 
		.popup_content {
			position: fixed;
			top: 48%;
			left: 50%;
			width: 520rpx;
			height: 30%;
			margin-left: -270rpx;
			margin-top: -270rpx;
			border: 20rpx solid white;
			background-color: white;
			z-index: 1002;
			overflow: auto;
		}
			 
		.popup_title {
			padding-top: 5rpx;
			width: 480rpx;
			text-align: center;
			font-size: 36rpx;
			color: rgba(16, 16, 16, 100);
			
		}
			 
		.popup_textarea_item {
			padding-top: 2rpx;
			height: 175rpx;
			line-height: 75rpx;
			width: 440rpx;
			background-color: #F1F1F1;
			
			margin:auto;
			margin-top: 28rpx;
			padding-top: 24rpx;
		}
			 
		.popup_textarea {
			width: 410rpx;
			font-size: 26rpx;
			margin-left: 20rpx;
			display: block;
			border-bottom: 6rpx #000000;
			
		}
			 
		.popup_button {
			padding-top:20rpx ;
			color: #000000;
		}
		.buttons{
			text-align: center;
			font-size: 32rpx;
			margin: auto;
			margin-top: 50rpx;
			width: 80%;
			
			}
</style>
