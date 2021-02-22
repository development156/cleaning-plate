<template>
	<view class="container">
		<view class="tab-view" >
		<!-- <xTab :value="tabList" @changeTab="changeTab" actType="underline" :config="{padding:80,spacing: 200,background:'#1989FA',color:'#666666',actColor:'#C9A65E',size:32,position:0}"></xTab> -->
		<xTab v-if="isShow" :value="colleges" @changeTab="changeTabAcademy" actType="underline" :config="{spacing: 125,background:'#1989FA',color:'#666666',actColor:'#1989FA',size:32,position:0}"></xTab>
		</view>
	
	
	<view class="border">	
	
	<view v-for="(item,index) in array" :key="index">
		<view class="con">
		<image></image>
		
		<view class="item1">
			<text>{{item.professionUploadRationMonth.college}}</text>
			<text>{{item.professionUploadRationMonth.year+'-'+item.professionUploadRationMonth.month}}</text>
		</view>
		<view class="item2">
		{{item.professionUploadRationMonth.profession+item.professionUploadRationMonth.grade}}
		</view>
		<view class="item3">
			<image></image>
			<text>总积分 ：{{item.professionIntegral}}</text>
		</view>
		</view>
		
		
		<view class="line"></view>
	</view> <!-- //  -->
		<view class="hasNoMajor" v-if="hasNoMajor">  该学院尚未添加相关专业 </view>
	</view>	
	
	

	<view class="footer" v-if="isShow">	
		<picker @change="bindPickerChange($event)" :value="index" :range="majors" class="select">
		    <view class="uni-input">{{majors[index]}}</view>
		</picker>
		
		<view style="display: flex;flex-direction: row;justify-content: space-evenly">
		<view class="text">
			<text style=" color: rgba(151, 151, 151, 100);">总积分:</text>
			<text style="color:rgba(201, 166, 94, 100);padding: 4rpx;">{{showProfessionIntegral}}</text>
			<text style=" color: rgba(151, 151, 151, 100);margin-left: 20rpx;">上传率:</text>
			<text style="color:rgba(201, 166, 94, 100);padding: 4rpx;">{{showMonthRation}}</text>
		</view>
		<view class="socreNumber display-flex justify-between">
								<label class="minute" @click="btn_minute(addSocre)">-</label>
								<input class="input"  v-model="addSocre" />
								<label class="add" @click="btn_add(addSocre)">+</label>
		</view>
		</view>
		<button @click="SubmitSocre">提交</button>
	</view>
	
	<view>
	<!-- 　　　　　　　// 其中uni-p-b-98是公共样式类名，表示padding-bottom: 98upx;  设置的98upx是和底部导航栏的高度保持一致，页面的内容就不会被底部导航遮挡住啦 -->
	            <view class="uni-p-b-98"></view>
	<!-- 　　　　　　　// 最后引入自定义组件，并传当前栏目对应的pagePath到自定义组件，显示当前栏目的选中样式 -->
	            <tabBar :pagePath="'AddSocre/addSocre'"></tabBar>
	 </view>
	</view>

</template>

<script>
	import { OrderManager } from '@/models/admin/OrderMangae/orderManager.js'
	const orderMangae = new OrderManager();
	import { ManageAcademy } from '@/models/admin/Management/ManageAcademy/manageAcademy.js'
	const manageAcademy = new ManageAcademy();
	import { Common } from '@/models/admin/Common/common.js'
	const common = new Common();	
	import { AddScocre } from '@/models/admin/AddSocre/addSocre.js'
	const addScocre = new AddScocre();	

 import xTab from '@/components/common/poiuy-xTab/xTab.vue';
	export default{
		name:"addSocre",
		
		components:{
			xTab
		},
		onLoad(){
			// 获取动态高度
			 this.setSwiperHeight();
		},
		data(){
			return{
				index: 0,
				currentCollege:'',
				currentMajors:'', //被选择的专业年级
				currentProfession:'',
				currentGrade:'',
				showProfessionIntegral:'',//选择的专业年级积分
				showMonthRation:'',//选择的每天上传的比率
				hasNoMajor:false,
				tabList: [{
					name:'已处理',
					id:0
					},
					{
						name:'待处理',
					id:1
					},
				],
				colleges:[
					{
					name:'信息学院',
					id:0
					},
					{
						name:'工程学院',
					id:1
					},
					{
						name:'财经学院',
					id:2
					},
				],
				// major:"信息管理与信息系统",
				majors:['信息管理与信息系统','数字媒体技术','酒店管理'],
				//swiper当前位置
				swiperCurrIndex:0,
				//swiper动态高度
				swiperHegiht:300, 
				isShow:true,
				addSocre:0,
				array:[
					{
					"professionUploadRationMonth": {
					"college": "信息学院",
					"profession": "信管",
					"grade": "2019",
					"year": "2021",
					"month": "2",
					"uploadNumber": 3
					            },
					"monthRation": "3.34%",
					"professionIntegral": 56
					        },

				]
			}
		},
		created() {
			this.getCollegeNameList();
		},
		methods:{
			//提交
			SubmitSocre(){
				var _self=this;
				
				addScocre.awardIntegrateByAdmin({
					"college": _self.currentCollege,
					"profession":_self.currentProfession,
					"grade":_self.currentGrade,
					"integrate":_self.addSocre
				}).then(res => {
					
					if(res.code == 200){
					_self.TEXT( this.currentCollege );
					uni.showToast({
						title: '操作成功',
						// icon:'none',
						duration: 1420
					});
					}
				}).catch(err => {
						
									uni.showToast({
										title: '网络错误，小程序端请检查合法域名',
										icon:'none',
										duration: 1420
									});
									
								})	
							
			},
			//顶部选择
			bindPickerChange(e){
				
				this.index = e.detail.value;
				// this.getAcademyNameList( this.currentCollege );
				 this.TEXT( this.currentCollege );
				
			},
			
			TEXT(colleg){
				var _self=this;
				// console.log(colleg)
				common.getProfessionUploadRationMonth({"college":colleg}).then(res => {
								
								res.data.forEach( item1 =>{
														 
														 var name = item1.professionUploadRationMonth.profession+
														  item1.professionUploadRationMonth.grade;
														  //如果当前的专业年级等于当前点中的 那么就搜索他的上传率积分
														 
								if(_self.majors[_self.index]== name  && _self.currentCollege==item1.professionUploadRationMonth.college){
													   _self.showMonthRation = item1.monthRation;
													   
													   _self.showProfessionIntegral = item1.professionIntegral;
													   _self.currentGrade = item1.professionUploadRationMonth.grade;
													   _self.currentProfession =item1.professionUploadRationMonth.profession; 
													   
								}
													})
							})
							.catch(err => {
								
									uni.showToast({
										title: '网络错误，小程序端请检查合法域名',
										icon:'none',
										duration: 1420
									});
									
								})	
			},
			// changeTab(e){
			  
			//   this.swiperCurrIndex = e.index;
			// 	if(e.index==1){
			// 		this.isShow=true
			// 	}
			// 	else{
			// 		this.isShow=true
			// 	}
			//  },
			 changeTabAcademy(e){		
				this.showProfessionIntegral='';
				 this.showMonthRation='';
			   var colleg=this.colleges[e.index].name;
			    this.currentCollege = colleg;
				this.getAcademyNameList(colleg)
			  },
			//swiper组件的切换返回值（执行其他的方法只需要在这里执行即可。）
			            swiperChange(e) {
			                this.swiperCurrIndex = e.detail.current;
			                this.setSwiperHeight(); //例如动态获取高
			            },
			 //动态设置swiper高度
			            setSwiperHeight() {
			                const that = this;
			                let obj = uni.createSelectorQuery().in(this).select("#swiper_id_" + (this.swiperCurrIndex));
			                obj.boundingClientRect(function(data) { //data - 各种参数
			                    if (data) {
			//得到px单位的高度，通过px转换rpx的单位换算(加上底部的间距或者存在底部按钮高度合成最后的rpx高度)
			                        that.swiperHegiht = data.height * 2 + 110; 
			                    }
			                }).exec();
			            },
		  //获得学院对应的年级专业
		  getAcademyNameList(colleg){
			  var _self=this;
			  
			  common.getProfessionUploadRationMonth({"college":colleg}).then(res => { 
				  _self.array = res.data;
				  
				  var majors=[];
				  if(res.data != null){
					_self.hasNoMajor=false;
				  res.data.forEach( item =>{
					 var name = item.professionUploadRationMonth.profession+
					  item.professionUploadRationMonth.grade;
					  majors.push(name);
					  
					  
				  })
				  _self.majors=majors;
				  
				  _self.TEXT( _self.currentCollege );
					 
					
				  }else {
					  _self.hasNoMajor=true;
				  }
			})																	
			.catch(err => {
				console.log(err)
					uni.showToast({
						title: '网络错误，小程序端请检查合法域名',
						icon:'none',
						duration: 1420
					});
					
				})	
		  },
		 //获得学院的名字
		  getCollegeNameList(){
				var _self=this;
				 manageAcademy.getCollegeNameList().then(res => { 
					if(res.code==200){
						// _self.Academyarray = res.data;
						var i=0; var Colleges=[];
						res.data.forEach( item =>{
							Colleges.push({
								"name":item,
								"id":i
							})
							i++;
						})
					
						_self.colleges=Colleges;
						_self.currentCollege=Colleges[0].name;
						
						_self.getAcademyNameList(_self.colleges[0].name);
							
						}else if (res.code==1005){
						uni.showModal({
						content: "尚未添加学院",
						showCancel: false
						});
						}
						})																	
				.catch(err => {
					uni.showToast({
						title: '网络错误，小程序端请检查合法域名',
						icon:'none',
						duration: 1420
					});
					
				})	
			},
		 
		 btn_minute:function(num){
			 if(num > 0.5) {
			 		num = num - 1;
					this.addSocre=num
			 	//商品数量<1时,商品数量不可减
			 }else{
					this.addSocre=0
			 }
		 },
		 btn_add: function(num){
				num =num + 1;
				this.addSocre=num
		 }
			
		}
		
	}
</script>

<style lang="scss" scoped>
	page{
	
	.container{
		display: flex;
		flex-direction: column;
	}
	.border{
		display: flex;
		flex-direction: column;
		
		height: 40%;
		
		position: fixed;
		min-height: 45%;
		overflow-y:scroll ;
		
		top: 4rem;
		bottom: 1rem;
		width: 95%;
		margin: 0 auto;
		align-self: center;
		// border-bottom: 2rpx solid #C8C7CC;
		
		.hasNoMajor{
			color: #555555;
			text-align: center;
			margin-top: 100rpx;
		}
		.con{
			
			display: flex;
			justify-content: space-around;
			image{
				margin: 7% 0 0 2%;
				width: 96rpx;
				height: 96rpx;
				line-height: 40rpx;
				background-color: rgba(140, 110, 138, 100);
				text-align: center;
				border: 2rpx solid rgba(255, 255, 255, 100);
				border-radius: 100%;
			}
			.item1{
				display: flex;
				flex-direction: column;
				font-size: 0.6rem;
				justify-content: space-evenly;
				text:nth-child(2){
					color: rgba(151, 151, 151, 100);
					font-size: 24rpx;
				}
			}
			.item2{
				font-weight: bold;
				color: #C9A65E;
				margin-top: 6%;
				font-size: 0.71rem;
			}
			.item3{
				display: flex;
				flex-direction: column;
			
				image{
					width: 130rpx;
					height: 130rpx;
					border-radius: 10rpx;
					margin-top: 10%;
				}
				text{
					margin-top: 18rpx;
					height: 34rpx;
					color: rgba(16, 16, 16, 100);
					font-size: 28rpx;
				}
			}
		}
		.line{
			
			height: 0.0625rem;
			margin: 5% 5% 5% 20%;
			background-color: #C8C7CC;
			opacity: 0.91;
		}
	}
		
	.footer{
		background-color: rgba(255, 252, 235, 100);
		height:35%;
		box-shadow: 0px 2rpx 8rpx 0px rgba(0, 0, 0, 0.4);
		display: flex;
		font-family: Arial;
		// border: 2rpx solid rgba(255, 255, 255, 100);
		justify-content: space-around;
		flex-direction: column;
		// position: absolute;
		position: fixed;
		width: 100%;
		bottom: 2.5rem;
		
		.select{
			width: 80%;
			height: 16%;
			margin: 3% auto;
			margin-bottom: 0%;
			color: #808080;
			text-shadow: 15rpx 4rpx 12rpx #C0C0C0;
			font-size: 28rpx;
			font-family: Microsoft Yahei;
			border: 2rpx solid rgba(255, 255, 255, 100);
			background: #FFFFFF;
			display: flex;
			align-items: center;
	
			
		}
		.text{
			display: flex;
			
			justify-content: space-between;
			margin-top: 1%;
			font-size: 32rpx;
			
		}
		/* 数量加减 */
		.socreNumber{
			width: 27%;
			height: 54rpx;
			border: 2rpx solid rgba(216, 220, 230, 100);
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			background-color: rgba(255, 255, 255, 100);
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: rgba(151, 151, 151, 100);
			/* 减去数 */
			.minute {
				width: 23%;
				text-align: center;
				line-height: 58upx;
				font-size: 18px;
				border-right: 2rpx solid rgba(216, 220, 230, 100);
				background-color: rgba(245, 247, 250, 100)
			}
			.input {
				width: 80upx;
				text-align: center;
				font-size: 30rpx;
				color: #000000;
			}
			/* 增加 */
			.add {
				width: 23%;
				border-left: 2rpx solid rgba(216, 220, 230, 100);
				line-height: 58upx;
				text-align: center;
				font-size: 18px;
				background-color: rgba(245, 247, 250, 100)
			}
		}
		.socreNumber input{
			text-align: center;
		}
		
		button{
			height: 15%;
			// height: 1.6875rem;
			line-height: 2.1rem;
			
			width: 80%;
			border-radius: 20px;
			margin: 2% auto;
			margin-bottom: 6%;
			text-align: center;
			background-color: #C9A65E;
			color: white;
			
		}
	}	
		
		
	}
	
	
	
</style>
