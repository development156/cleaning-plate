<template>
	<view>
		<p>{{collegeName}}</p>
		<view class="academic-list" v-for="(item,index) in professionList" :key="index">
		
			<view class="academic-item">
				<image></image>
				<view class="item-info1">
					<span>{{item.profession+item.grade}}</span>
					<!-- <span>{{item.count}}人</span> -->
					<!-- 移除菜品的按钮  -->
					<view class="q-image-remover" @tap="removeProfession(item.id)"> <!-- :data-idx="idx" -->
					    <text>x</text>
					</view>
				</view>
				
			</view>
			
		</view>
	
	
	</view>
</template>

<script>
	import {ManageAcademy} from '@/models/admin/Management/ManageAcademy/manageAcademy.js'
	const manageAcademy = new ManageAcademy();
	export default{
		onLoad(option) {
			this.collegeName = option.collegeName;
			this.getAllProfession(this.collegeName);
		},
		data(){
			return{
				professionList:'',
				collegeName:''
			}
		},
		created() {
			
		},
		methods:{
			getAllProfession(collegeName){
				var th=this;
				manageAcademy.getAllProfession({"college":collegeName}).then( res => {
					if(res.code==200){
						console.log(res.data)
						th.professionList = res.data
					}
				}).catch(err => {
					uni.showModal({
							content: "error",
							showCancel: false
						});
				})
			},
		removeProfession: function(index){
		   
		   var idx=[];
		   idx.push(index)
			var that = this;
			manageAcademy.deleteCollegeInfo( {"ID":idx}).then(res => {
				
				if(res.code==200){
					console.log(that.professionList.length)
					if(that.professionList.length-1 != 0){
					that.getAllProfession(that.collegeName);
					}else if(that.professionList.length-1 == 0){
						uni.navigateTo({
							url:'./index'
						})
					}
					uni.showToast({
						title: '删除成功',
						icon:'none',
						duration: 1500
					});
					
				
				}
			})
			.catch(err => {
				uni.showToast({
					title: '删除失败',
					icon:'none',
					duration: 1500
				});
			})
			
		    // var photoFiles = this.photoFiles;
		    // photoFiles.splice(idx, 1);
		    // // this.setData({
		    // //     photoFiles: photoFiles
		    // // })
						// this.photoFiles=photoFiles;
						// this.notice.productionImgList=photoFiles;
					
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
				box-shadow: 0px 3rpx 4rpx 0px rgba(0, 0, 0, 0.1);
			}
			.academic-list{
				width: 678rpx;
				margin: auto;////
				position: relative;///
				top: 114rpx;
				
				
				.academic-item{
					display: flex;
					flex-direction: row;
					height: 200rpx;
					width: 678rpx;
					border-radius: 10rpx;
					margin-bottom: 36rpx;
					border: 2rpx solid rgba(255, 255, 255, 100);
					
					box-shadow: -1px 2rpx 4rpx 0px rgba(0, 0, 0, 0.1);
					image{
						margin: 0% 4% 0% 5%;
						width: 128rpx;
						height: 128rpx;
						line-height: 40rpx;
						color: #3F536E;
				
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
						
							.q-image-remover {
							    width: 0;
							    height: 0;
							    border-top: 66rpx solid #3F536E;
							    border-left: 66rpx solid transparent;
							    position: absolute;
							    top: 0;
							    right: 0;
								text{
								    width: 30rpx;
								    display: block;
								    height: 30rpx;
								    color: #FFFFFF;
								    text-align: center;
								    line-height: 30rpx;
								    font-size: 30rpx;
								    border-radius: 20rpx;
								    background-color: #3F536E;
								    position: absolute;
								    top: -60rpx;
								    right: 2rpx;
								}
								image {
								    width: 24rpx;
								    height: 24rpx;
								    position: absolute;
								    top: -60rpx;
								    right: 4rpx;
								}
							}
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
