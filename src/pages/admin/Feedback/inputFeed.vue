<template>
	<view>
		<span>{{info.nickName}}</span>
		
		<p>{{info.description}} </p>
	</view>
	
</template>

<script>
	import { FeedBack } from '@/models/admin/FeedBack/feedback.js'
	const feedBack = new FeedBack();
	export default {
	  name: 'InputFeedback',
	  data(){
		  return{
			  info:''
		  }
	  },
	  onLoad(option) {
		  
		  // this.getInfo(this.$route.query.id)
		  this.getInfo(option.id)
	  },
	   methods: {
	      getInfo(id) {
			feedBack.checkFeedback(id).then(res => {
				console.log("res")
				console.log(res)
				// this.array = res.data;
				this.info = res.data[0]
				console.log(this.info )
			})
			.catch(err => {
				console.log(err)
			})	  
			}
		}
	  }
</script>

<style scoped lang="scss">
	page{
		// display: flex;
		align-items: center;
		background: #FFFFFF;
		span{
			height: 148rpx;
			line-height: 246rpx;
			display: block;
			margin-left: 29rpx;
			// margin-top: 220rpx;
			padding-bottom: 28rpx;
			color: rgba(201, 166, 94, 100);
			font-size: 33rpx;
			border-bottom: 2rpx solid #EBEBEB ;
		}
		p{
			text-indent : 40rpx;
			letter-spacing:3rpx;
			line-height: 56rpx;
			margin: 0 auto;
			margin-top: 36rpx;
			width: 686rpx;
			color: rgba(16, 16, 16, 100);
			font-size: 33rpx;
		}
	}
</style>
