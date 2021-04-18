<template>
	<view>
		<view class="item2" >
			<view class="squ" v-for="item in list">
			<image :src="item.avatarUrl"></image>
			<view class="con2" >
				<view style="color: #C9A65E;">{{item.name}}</view>
				<view>学号{{item.studentId}}</view>
			</view>
			
			</view>
		
		</view>
		
	</view>
	
</template>

<script>
	import {User} from '@/models/superAdmin/user.js'
	const user = new User()
	export default{
		
		data(){
			return{
				list:[]
			}
		},
		onLoad(){
			this.selectUser()
		},
		methods:{
			selectUser(){
				user.selectUser().then(res=>{
					console.log(res)
					this.list = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color:rgba(249, 249, 249, 0.8); 
		
	.item2{
		
		display: flex;
		flex-direction: column;
		background-color: white;
		width: 98%;
		margin: 5% auto;
		border-radius: 0.3125rem;
		.squ{
			
			display: flex;
		
			image{
				height: 3.125rem;
				width: 3.125rem;
				margin: 10% 0 5% 3%;
				border-radius: 100%;
			
			}
			border-bottom: 1px solid gainsboro;
			.con2{
				display: flex;
				flex-direction: column;
				margin: 8% 0 5% 20%;
				justify-content: space-around;
				text:nth-child(1){
					color: #C9A65E;
					
				}
				text{
					margin-top: 20%;
				}
			}
			text{
				margin-top: 15%;
			}
		}
		
	}
	}
	
</style>
