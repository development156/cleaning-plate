<template>
	<view>
		<view class="tab">
			<text>上传次数</text>
			<text>{{list.length}}</text>
		</view>
		
		<view class="content" v-for="item in  list">
			<image :src="imgUrl+item.url"></image>
			<view class="tip">
				<view class="top">
					<text>相似度</text> 
				<text >
					 {{item.similarity.toFixed(5)}}
				</text>
				</view>
				<view class="bottom">{{item.date}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import {UploadHistory} from '@/models/MyModel/uploadHistory.js'
const uploadHistory = new UploadHistory()
 export default{
	 onLoad(){
		 this.getuploadHistory()
	 },
	 data(){
		 return{
			 // 临时设置的学号
			 studentId:1,
			 list:[]
		 }
	 },
	 methods:{
		 getuploadHistory(){
			 uploadHistory.uploadHistory(this.studentId).then(res=>{
				 console.log(res)
				 this.list = res.data
				
			 })
		 }
		 
	 }
	 
	 
	 
 }

</script>

<style lang="scss">
	page{
		background-color: rgba(249, 249, 249, 0.8);
		.tab{
			display: flex;
			
			font-size: 1.25rem;
			margin: 5% 0 0 5%;
			text{
				&:nth-child(2){
					color:#C9A65E  ;
					font-weight: bold;
					margin-left: 5%;
				}
			}
		}
		.content{
			height: 5.9375rem;
			width: 98%;
			margin: 5% auto;
			background-color: white;
			border-radius: 0.625rem;
			display: flex;
			box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
			image{
				margin: 2% 0 0 5%;
				width: 30%;
				height: 90%;
				border-radius: 0.625rem;
			}
			.tip{
				margin-left: 5%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.top{
					display: flex;
					justify-content: space-between;
					text{
						&:nth-child(2){
							color:#C9A65E  ;
						}
					}
					
				}
				.bottom{
					color: gray;
					font-size: 0.75rem;
				}
			}
		}
		
	}
	
</style>
