<template>
	<view>
		<view class="item1">
			<view class="icon"></view>
			<view class="con">新增管理员</view>
		</view>
		
		<view class="item2">
			<view class="squ">
			<image></image>
			<view class="con2">
				<text>昵称</text>
				<text>547567</text>
			</view>
			</view>
			<view class="line"></view>
		</view>
		
		
	</view>
	
</template>

<script>
</script>

<style lang="scss">
	page{
		background-color: gainsboro;
		.item1{
			height: 3.5625rem;
			display: flex;
			border: 1px solid red;
			margin-top: 5%;
			background-color: white;
			.icon{
				margin: 5% 0 10% 10%;
				height: 1.3125rem;
				width: 1.3125rem;
				border: 1px solid red;
			}
			.con{
					margin: 6% 0 10% 10%;
					font-size: 0.75rem;
			}
		}
		.item2{
			margin-top: 10%;
			border: 1px solid red;
			display: flex;
			flex-direction: column;
			background-color: white;
			.squ{
				display: flex;
				image{
					height: 3.125rem;
					width: 3.125rem;
					margin: 10% 0 5% 10%;
					border-radius: 100%;
					border: 1px solid red;
				}
				.con2{
					display: flex;
					flex-direction: column;
					margin: 5% 0 5% 10%;
					text:nth-child(1){
						color: #C9A65E;
						
					}
					text{
						margin-top: 20%;
					}
				}
			}
			.line{
				margin: 1% 10% 10% 10%;
				height: 0.0625rem;
				background-color:gainsboro ;
			}
			
		}
		
		
	}
</style>
