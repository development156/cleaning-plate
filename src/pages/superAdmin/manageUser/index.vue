<template>
	<view>
		
		<view class="item2" >
			<view class="squ" v-for="(item,index) in rolelist">
			<image :src="item.avatarUrl"></image>
			<view class="con2" @click="navTo(item)">
				<view style="color: #C9A65E;">{{item.name}}</view>
				<view>{{item.applyDate}}</view>
			</view>
			
			</view>
		
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
				add(id,index){
					
					this.$emit('add',id,index);
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
	.item2{
		
		display: flex;
		flex-direction: column;
		background-color: white;
		width: 98%;
		margin: 5% auto;
		border-radius: 0.3125rem;
		.squ{
			
			display: flex;
			justify-content: space-around;
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
				margin: 5% 0 5% 2%;
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
