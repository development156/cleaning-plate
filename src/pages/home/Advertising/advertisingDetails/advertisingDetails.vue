<template>
	<view class="all">
	<view>
		{{List.title}}
	</view>
	
	<view class="tab">
		<view>{{List.type}}</view>
		<view>{{List.date}}</view>
	</view>
	
	<view class="image">
		<image :src="List.url"></image>
	</view>
	
	<view class="foo">
		{{List.article}}
	</view>
	
	</view>
	
</template>

<script>
	import {getAdvertiseList} from '@/models/advertising/advertisingList/advertiseList.js'
	const GetAdvertiseList = new getAdvertiseList()
	export default{
		data(){
			return{
				id:'',
				List:[]
			}
		},
		onLoad(e){
			const id = JSON.parse(decodeURIComponent(e.item));
			this.id = id;
			console.log(this.id)
			this.getDetails()
			
		},
		methods:{
			getDetails(){
				GetAdvertiseList.getDetails(this.id).then(res=>{
					this.List = res.data
					console.log(this.List)
				})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.all{
		display: flex;
		flex-direction: column;
		margin: 10% 1.0625rem 0 1.0625rem;
		font-size: 40rpx;
		.tab{
			display: flex;
			justify-content: space-between;
			margin-top: 10%;
			color: #979797;
			font-size: 0.75rem;
		}
		.image{
			width: 85%;
			height: 14.125rem;
			margin: 10% auto;
			
		}
		.foo{
			font-size: 30rpx;
		}
	}
</style>
