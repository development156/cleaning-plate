<template>
	<view>
		<view class="item1">
			<view class="icon" @click="navTo1"></view>
			<view class="con">查看用户</view>
		</view>
		
		<view class="item2" @click="navTo3()">
			<view class="squ" v-for=" item in list">
			<image></image>
			<view class="con2">
				<text>{{item.name}}</text>
				<text>{{item.profession}}</text>
			</view>
			<text @click="deleted(item.id)">删除</text>
			<text @click="updated(item.id,item.name)">修改</text>
			</view>
		
		</view>
		
		
	</view>
	
</template>

<script>
	import {Admin} from '../../../models/superAdmin/admin.js'
	const admin = new Admin()
	export default{
		
	props: {
		list:{//提示信息字体颜色
			type: Array,
			default(){
				return []
			}
		}
	},
	
		methods:{
			
			// 删除
			deleted(id){
				this.$emit('deleted',id);
				admin.deleteAdmin(id).then(res=>{
					console.log(res)
					this.list.splice(id, 1);
				})
			},
			// 修改
			updated(id,name){
				this.$emit('updated',id,name);
				admin.updateAdmin(id,name).then(res=>{
					console.log(res)
				})
			},
			
			navTo3(){
				this.$emit('navTo3');
			},
			navTo1(){
				this.$emit('navTo1');
				
			}
		}
	}
</script>

<style lang="scss">
	page{
			background-color:rgba(249, 249, 249, 0.8); ;
		.item1{
			height: 3.5625rem;
			display: flex;
			
			margin-top: 5%;
			background-color: white;
			justify-content: space-around;
			width: 98%;
			margin: 3% auto;
			border-radius: 0.3125rem;
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
					border: 1px solid red;
				}
				.con2{
					display: flex;
					flex-direction: column;
					margin: 5% 0 5% 2%;
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
