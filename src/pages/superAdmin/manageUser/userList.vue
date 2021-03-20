<template>
	<view>
		<view class="person" v-for="item in list" >
			
			<view class="left" @click="navTo(item)">
				<view>{{item.name}}</view>
				<view>学号{{item.studentId}}</view>
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
		
		.person{
			background-color: white;
			border-radius: 0.3125rem;
			
			width: 98%;
			margin: 5% auto;
			height: 5.625rem;
			display: flex;
		
			.left{
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				margin: 0 0 0 5%;
				view{
					&:nth-child(2){
						font-size: 0.625rem;
					}
				}
			}
		
			
			view{
				&:nth-child(3){
					margin-top: 10%;
				}
			}
		}
	}
	
</style>
