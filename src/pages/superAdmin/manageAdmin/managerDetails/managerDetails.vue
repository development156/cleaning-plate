<template>
	<view class="contnet">
		<view class="item">
		<image></image>
		<view class="info">
			<text>昵称</text>
			<text>账户：</text>
			<text>创建时间</text>	
		</view>
		</view>
		<button>删除</button>
	</view>
</template>

<script>
</script>

<style lang="scss">
	page{
		.contnet{
			
			.item{
				display: flex;
				
				image{
					height: 3.625rem;
					width: 3.625rem;
					margin: 1.625rem 0 0 1.25rem ;
					border-radius: 100%;
					border: 1px solid red;
					
				}
				.info{
					display: flex;
					flex-direction: column;
					font-size: 0.875rem;
					margin-left: 10%;
					text:nth-child(1){
						font-size: 1rem;
						font-weight: bold;
					}
					text{
						margin-top: 0.625rem;
					}
			}
			}
				
				button{
					height: 3.25rem;
					text-align: center;
					margin-top: 20%;
					color: white;
					background-color: #C9A65E;
				}
			
			
		}
	}
	
	
</style>
