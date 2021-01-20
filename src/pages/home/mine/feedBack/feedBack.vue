<template>
	<view>
		<view class="tip">
			<text>
				"
			</text>
			<text>
				同学意见多多提
			</text>
			<text>
				食堂改善快快快
			</text>
		</view>
		
		<view class="content">
			<view class="input">
			<text>多行输入</text>
			<text>2021/1/12</text>
			</view>
			<button type="submit">提交</button>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	page{
		background-color: #7094AE;
		.tip{
			color: #FFFFFF;
			display: flex;
			flex-direction: column;
			letter-spacing: 0.625rem;
			font-style: italic;
			font-size: 1.25rem;
			margin-left:1.25rem;
			text{
				&:nth-child(1) {
					font-size: 3.125rem;
				}
			}
			
		}
		.content{
			float: center;
			margin: 12.625rem 0.75rem 0 0.5rem;
			width: 22.375rem;
			height: 21rem;
			background-color: #FFFFFF;
			font-family: "Microsoft Yahei";
			color: gray;
			font-size: 0.875rem;
			.input{
				display: flex;
				flex-direction: column;
				text{
				&:nth-child(2) {
					padding: 10.75rem 1.5625rem 3.3125rem  17.1875rem;
				}
			}
			}
			button{
				color: #FFFFFF;
				width: 326px;
				height: 44px;
				
				border-radius: 20px;
				background-color: rgba(176, 131, 103, 100);
				text-align: center;
				border: 1px solid rgba(255, 255, 255, 100);
			}
		}
	}
</style>
