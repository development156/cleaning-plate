<template>
	<view>
		<p>西南石油大学（南充校区）</p>
		<view class="academic-list" v-for="(item,index) in academicList" :key="index">
			<navigator :url="'./showAcademy?collegeName='+item" 
			>
			<view class="academic-item">
				<image></image>
				<view class="item-info1">
					<span>{{item}}</span>
					<!-- <span>{{item.count}}人</span> -->
					
				</view>
				<!-- <p>上传率：{{item.uploadrate}}</p> -->
			</view>
			</navigator>
		</view>
		<button style="background: #FFFFFF;width: 678rpx;
		position: fixed;  bottom: 4%;left: 0;right: 0;margin: auto;
		 box-shadow: 0px 2rpx 6rpx 0px rgba(0, 0, 0, 0.4);
		 font-size: 36rpx; z-index: 99;
		 border-radius: 10rpx;
		 border: 0rpx solid rgba(255, 255, 255, 100);
		 " @click="addAcdmc">添加学院</button>
		 
		<!-- 添加学院表单 -->
		<view v-if="showform">
		<addAcademic />
		</view>
	</view>
</template>

<script>
	import addAcademic from './addAcademic.vue'
	import {ManageAcademy} from '@/models/admin/Management/ManageAcademy/manageAcademy.js'
	const manageAcademy = new ManageAcademy()
	export default{
		data(){
			return{
				academicList:[],
				showform:false
			}
		},
		created() {
			this.getCollegeNameList();
		},
		
		components:{
			addAcademic
		},
		methods:{
			getCollegeNameList(){
				var th=this;
				manageAcademy.getCollegeNameList().then( res => {
					if(res.code==200){
						console.log(res.data)
						th.academicList = res.data
					}
				}).catch(err => {
					uni.showModal({
							content: "error",
							showCancel: false
						});
				})
			},
			addAcdmc(){
				this.showform=true;
				this.getCollegeNameList();
			},
		}
	}
</script>

<style scoped lang="scss">
	page{
		background: #F5F5F5 ;
		display: flex;///
		flex-direction: column;
		
		p:nth-child(1){
			position: absolute;
			left: 42rpx;
			top: 36rpx;
			color: rgba(16, 16, 16, 100);
			font-size: 36rpx;
			font-family: 方正兰亭黑-标准;
			box-shadow: 0px 2rpx 2rpx 0px rgba(0, 0, 0, 0.4);
		}
		.academic-list{
			width: 678rpx;
			margin: auto;////
			position: relative;///
			top: 114rpx;
			
			
			.academic-item{
				background: rgba(	188,143,143,0.1);
				display: flex;
				flex-direction: row;
				height: 200rpx;
				width: 678rpx;
				border-radius: 10rpx;
				margin-bottom: 36rpx;
				border: 2rpx solid rgba(255, 255, 255, 100);
				// background: #FFFFFF;
				box-shadow: -1px 2rpx 2rpx 1px rgba(0, 0, 0, 0.1);
				image{
					margin: 0% 4% 0% 5%;
					width: 128rpx;
					height: 128rpx;
					line-height: 40rpx;
					color: #FFAF3E;
			
					position: relative;
					top: 50%; /*偏移*/
					transform: translateY(-50%);
					background-color: rgba(140, 110, 138, 100);
					
					border: 2rpx solid rgba(255, 255, 255, 100);
					border-radius: 100%;            
				}
				.item-info1{
					display: flex;
					flex-direction: column;
					color: rgba(16, 16, 16, 100);
					font-size: 32rpx;
					font-weight: 500;
					font-family: 方正兰亭黑-标准;
					justify-content: space-evenly;
					
				
					span:nth-child(1){
						font-weight: 600;
						
					}
					span:nth-child(2){
						color: rgba(16, 16, 16, 0.9);
						font-size: 30rpx;
						
					}
				}
				p{
					position: absolute;
					right: 5%;
					bottom: 20%;
					color: rgba(151, 151, 151, 100);
					font-size: 32rpx;
				}
			}
			// button{
				
			// 	height: 98rpx;
				
			// 	line-height: 40rpx;
			// 	font-size: 36rpx;
			// 	border-radius: 10rpx;
			// 	text-align: center;
			// 	box-shadow: 0px 2rpx 6rpx 0px rgba(0, 0, 0, 0.4);
			// 	border: 2rpx solid rgba(255, 255, 255, 100);
			// }
		}
	}
</style>
