<template>
	<view class="contnet">
		<view class="item">
		<image :src="Item.avatarUrl"></image>
		<view class="info">
			<text style="font-weight: bold; font-size: 1rem">他的账户</text>
			<view class="item">
				<text>昵称：</text>
				<text style="color: #999999;">{{Item.name}}</text>
			</view>
		
			<view class="item">
				<text>学号：</text>
				<text style="color: #999999;">{{Item.studentId}}</text>
			</view>
			
			<view class="item">
				<text>申请时间:</text>
				<text style="color: #999999;">{{Item.applyDate}}</text>
			</view>
			
			<view class="item">
				<text>批准时间：</text>
				<text style="color: #999999;">{{Item.approvalDate}}</text>
			</view>
		
		
		</view>
		</view>
		
	</view>
	
	
</template>

<script>
	import {User} from '../../../../models/superAdmin/user.js'
	const user = new User()
	
	export default{
		data(){
			return {
				Item:[]
			}
		},
			onLoad(e){
				this.Item = JSON.parse(decodeURIComponent(e.item));
				console.log(this.Item)
			},
		
		methods:{
			selectUser(){
				user.selectUser().then(res=>{
					console.log(res)
					
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
				
			
			
		}
	}
	
</style>
