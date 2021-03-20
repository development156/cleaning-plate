<template>
	<view>
		
		<view class="person" v-for="item in rolelist" >
			<image></image>
			<view class="left" @click="navTo(item)">
				<view>{{item.name}}</view>
				<view>{{item.applyDate}}</view>
			</view>
			<view @click="add(item.studentId)" class="iconfont icon-jia " style="font-size: 1.875rem;"></view>
		</view>
		
		
	</view>
</template>

<script>
	
	// 管理员
	import {Admin } from '@/models/superAdmin/admin.js'
	const admin = new Admin()
	
	 import xTab from '@/components/common/poiuy-xTab/xTab.vue';
	 export default{
	 	components: {
	 		xTab
	 	},
		props: {
			rolelist:{//提示信息字体颜色
				type: Array,
				default(){
					return []
				}
			}
		},
	 	
		
		methods:{
			
			//添加管理员
				add(id){
					
					this.$emit('add',id);
				},
				navTo(item){
					this.$emit('navTo',item);
					
				}
				
				
				
				
		}
		}
</script>

<style lang="scss">
	page{
		background-color:rgba(249, 249, 249, 0.8); 
		.select{
			height: 2.125rem;
			width: 90%;
			margin:10% 10% 10% 4% ;
			font-size: 0.875rem;
		}
		.person{
			background-color: white;
			border-radius: 0.3125rem;
			
			width: 98%;
			margin: 5% auto;
			height: 5.625rem;
			display: flex;
			justify-content: space-around;
			.left{
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				margin: 1% 0 0 5%;
				view{
					&:nth-child(2){
						font-size: 0.625rem;
					}
				}
			}
		
			image{
				height: 2.375rem;
				width: 2.375rem;
				border-radius: 100%;
				border: 1px solid red;
				margin: 10% 0 0 5%;
			}
			view{
				&:nth-child(3){
					margin-top: 10%;
				}
			}
		}
	}
	
	
</style>
