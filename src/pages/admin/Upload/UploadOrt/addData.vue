<template>
	<view class="container">
 <input class="uni-input"  type="number" v-model="inputAcount" style="font-size: 56rpx;padding: 34rpx; color: rgba(16, 16, 16, 100); border-bottom: 2rpx solid rgba(187, 187, 187, 1);" maxlength="10" placeholder="输入剩菜量" />
	
	<view class="data" style="padding: 34rpx; border-bottom: 2rpx solid rgba(187, 187, 187, 1);">{{Data}}</view>

	<GodenButton style="margin-left: -18rpx;" :delivery="btn"></GodenButton>
	</view>
</template>

<script>
	import GodenButton from '../../../../components/common/gode-button.vue'

	  
	export default{
		name:'addData',
		btn:{
			url:'',
			content:'保存'
		},
		data(){
			return{
				btn:{
					url:'',
					content:'保存'
				},
				Data:'33',
				inputAcount:''
			}
		},
		components:{
			
			GodenButton
			
		},
		created() {
			this.getTime();
		},
		methods:{
		// Listeningfocus: function(event) {
		//             var value = event.target.value;
		//             var value=value+"kg";
		// 			this.inputAcount=value;
					
					
		//         },
		getTime:function(){
		
		var date = new Date(),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate();

		month >= 1 && month <= 9 ? (month = "0" + month) : "";
		day >= 0 && day <= 9 ? (day = "0" + day) : "";
		
		let timer = year + '-' + month + '-' + day ;
		this.Data=timer;
		},
		// addData(){
		// 	uni.showToast({
		// 	    title: '保存成功',
		// 	    duration: 2000
		// 	});

		
		// }
		}
	}
</script>

<style scoped lang="scss">
	.container{
		position: relative;
		top: 186rpx;
		width: 664rpx;
		vertical-align: middle;
		font-size: 56rpx;
		font-weight: 500;
		margin: 0 auto;
		// left:50%;
		// transform:translate(-50%);
		
		
		// .add-buttom{
		// 	position: fixed;
		// 	display: flex;
		// 	width: 750rpx;
		// 	height: 116rpx;
			
		// 	bottom: 0;
		// 	left: 0;
		// 	background: #FFFFFF;
			
		// 	view{
				
		// 		align-self: center;
		// 		margin: 0 auto;
		// 		width: 694rpx;
		// 		height: 88rpx;
		// 		line-height: 88rpx;
		// 		border-radius: 40rpx;
		// 		color: rgba(255, 255, 255, 100);
		// 		font-size: 40rpx;
		// 		font-weight: 600;
		// 		background-color: rgba(201, 166, 94, 100);
		// 		text-align: center;
		// 		border: 2rpx solid rgba(187, 187, 187, 100);
		// 	}
		// }
		
	}
</style>
