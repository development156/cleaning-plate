<template>
	<view class="contnet">
		<view class="item">
		<image></image>
		<view class="info">
			<text style="font-weight: bold; font-size: 1rem">他的账户</text>
			<view class="item">
				<text>昵称：</text>
				<text style="color: #999999;">{{Item.name}}</text>
			</view>
		
			<view class="item">
				<text>学院：</text>
				<text style="color: #999999;">{{Item.college}}</text>
			</view>
			
			<view class="item">
				<text>专业:</text>
				<text style="color: #999999;">{{Item.profession}}</text>
			</view>
			
			<view class="item">
				<text>电话：</text>
				<text style="color: #999999;">{{Item.phone}}</text>
			</view>
		
		</view>
		</view>
		<button @click="deleted">删除</button>
	</view>
	
	
</template>

<script>
	import {Admin} from '@/models/superAdmin/admin.js'
	const admin = new Admin()
	
	export default{
		onLoad(e){
			this.Item = JSON.parse(decodeURIComponent(e.item));
			console.log(this.Item)
		},
		data(){
			return{
				Item:[]
			}
		},
		methods:{
			// 删除管理员
			deleted(){
				admin.deleteAdmin(Item.id).then(res=>{
					console.log(res)
					uni.showToast({
					  title:res.msg,
					  icon: "none"
					});
				})
			}
		}
	}
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
					
					text{
						margin-top: 10%;
					}
			}
			}
				
				button{
					height: 3rem;
					font-size: 1.125rem;
					text-align: center;
					margin-top: 10%;
					color: white;
					background-color: #C9A65E;
				}
			
			
		}
	}
</style>
