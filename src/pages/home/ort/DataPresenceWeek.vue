<template>
	<view class="qiun-columns">
		
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">
			
			<picker @change="bindPickerChange_choice" :value="choice_index" :range="choice">
			    <view class="uni-input"> {{choice[choice_index]}}</view>
			</picker>
			
			</view>
			<!-- <view class="uni-title uni-common-pl">时间选择</view> -->
			<!-- <view class="uni-list-cell"> -->
			        <view v-if="flag" class="uni-list-cell-db">
			             <picker  @change="bindPickerChange" :value="index" :range="Ortarray">
			                 <view >{{Ortarray[index]}}  &emsp;&emsp; ⮟</view>
			             </picker>
						<!-- <picker v-else @change="bindPickerChange2" :value="index" :range="Academyarray">
						     <view >{{Academyarray[index]}}&emsp;⮟</view>
						 </picker> -->
			        </view>
			 <!-- </view> -->
		</view>
	
	
	 
		<view class="qiun-charts" >
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
		</view>
		
	</view>
</template>

<script>
	import uCharts from '@/utils/u-charts.min.js';
	import { OrtUpload } from '@/models/admin/Upload/ortUpload.js'
	const ortUpload = new OrtUpload();
	import { ManageAcademy } from '@/models/admin/Management/ManageAcademy/manageAcademy.js'
	const manageAcademy = new ManageAcademy();
	import { Common } from '@/models/admin/Common/common.js'
	const common = new Common();
	
	
	var _self;
	var canvaLineA=null;
	export default {
		name:'DataPresenceWeek',
		data() {
			return {
				index: 0,
				choice_index:0,
				choice:['剩菜量','上传率'],
				flag:true,//判断显示学院还是上传率
				Academyarray:[],
				Ortarray: ['近7日', '近7月'],//剩菜量的选择列表
				
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				chartData: {
					categories: ['7', '6', '5', '4', '3'],
					series: [
					// 	{
					// 	name: '近7日',
					// 	data: [35, 20, 25, 37, 4, 20],
					// 	color: '#000000'
					// }
					// // , {
					// 	name: '近7月',
					// 	data: [170, 140, 165, 100, 144, 168]
					// },
					]
				}
			}
		},
	
		created() {
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			bindPickerChange_choice:function(e){
				 var _self=this;
				 this.choice_index = e.target.value;
				 if(this.choice_index==1){
					 //先获取学院名称
					 manageAcademy.getCollegeNameList().then(res => {
							if(res.code==200){
								
								_self.Academyarray = res.data;
								_self.flag=false;
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
					 
					 //获取每个学院每月得上传比率
					 common.getUploadRatio().then(res1 => {
						 
					 		 
							 let LineA={categories:[],series:[{
							 	name: '',
							 	data:[],
							 	color: '#cd5c5c'
							 	},
							 	]};
						var i=0;		//_self.Academyarray
						var Data=[];
					
						res1.data.forEach(function(item) {
							
							if(item.collegeUploadRatioResult.college==_self.Academyarray[i]){
								
								Data.push(item.uploadRatio);
								if(i ==0){
									// item.collegeUploadRatioResult.year+'/'+
								var time=
									item.collegeUploadRatioResult. month+'/'+
									item.collegeUploadRatioResult.day;
									LineA.categories.push(time);//放入时间
									
								}
								
								
								LineA.series[i].name=item.collegeUploadRatioResult.college;
								// LineA.series.push({
								// 	name: 'eee',
								// 	data:["3",3,34,43],
								// 	color: '#cd5c5c'
								// });
								
							}else{
								i++;
								  for (var j=0, col=''; j<6; j++) {
								        col += (Math.random()*16|0).toString(16);
								    } 
								// LineA.series[i-1].data=Data;
								LineA.series.push({
									 	name: LineA.series[i-1].name,
										data:Data,
										color: '#'+col
								})
								
								Data=[];
								
								Data.push(item.uploadRatio);
								
							}
							
					
						})
						
						_self.showLineA("canvasLineA",LineA);
						
						
					 })		
					 						.catch(err => {
					 						uni.showToast({
					 							title: '网络错误，小程序端请检查合法域名',
					 							icon:'none',
					 							duration: 1420
					 						});
					 						
					 					})	
				 }else if(this.choice_index==0){
					 _self.getServerData
				 }
			},
			 bindPickerChange: function(e) {
				 var _self=this;
			       // console.log('picker发送选择改变，携带值为', e.target.value)
			                 this.index = e.target.value;
					if(e.target.value == 1){
						ortUpload.getSevenYearFood().then(res => {	
							// console.log(res)
							let LineA={categories:[],series:[{
								name: '近7月',
								"data":[],
								color: '#cd5c5c'
								},
								]};
								
						res.data.forEach(function(item) {
								var time=item.year+'-'+item.month;
						        LineA.categories.push(time);
								LineA.series[0].data.push(item.totalWasteFood);
								
						})
						_self.showLineA("canvasLineA",LineA);
									
									
						})		
						.catch(err => {
						
						uni.showToast({
							title: '网络错误，小程序端请检查合法域名',
							icon:'none',
							duration: 1420
						});
						
					})
				}else if(e.target.value == 0){
					_self.getServerData();
				}
							 
		         },
				 
				 
			
			
			getServerData(){
				var _self=this;
				
				ortUpload.getSevenDayWasteFood().then(res => {
					console.log("res");
						console.log(res);
						if(res.code == 200){
						let LineA={categories:[],series:[{
							name: '近7日',
							"data":[],
							color: '#0ea391'
							},
							]};
						// 		//这里我后台返回的是数组，所以用等于，如果后台返回的是单条数据，需要push进去
						
						res.data.forEach(function(item) {
							
						        LineA.categories.push(item.uploadDate);
								LineA.series[0].data.push(item.wasteFood);
								// console.log(LineA)
						})
									_self.showLineA("canvasLineA",LineA);
						// 		LineA.categories=res.data.data.LineA.categories;
						// 		LineA.series=res.data.data.LineA.series;
						}else if(res.code == 1005){
							uni.showToast({
								title: '暂无数据',
								icon:'none',
								duration: 1420
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
				// uni.request({
				// 	url: 'https://www.ucharts.cn/data.json',
				// 	data:{
				// 	},
				// 	success: function(res) {
				// 		console.log(res.data.data)
				// 		let LineA={categories:[],series:[]};
				// 		//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				// 		LineA.categories=res.data.data.LineA.categories;
				// 		LineA.series=res.data.data.LineA.series;
				// 		_self.showLineA("canvasLineA",LineA);
				// 	},
				// 	fail: () => {
				// 		_self.tips="网络错误，小程序端请检查合法域名";
				// 	},
				// });
				
			},
			showLineA(canvasId,chartData){
				canvaLineA=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize:11,
					legend:{show:true},
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type:'grid',
						gridColor:'#CCCCCC',
						gridType:'dash',
						dashLength:8
					},
					yAxis: {
						gridType:'dash',
						// gridColor:'#CCCCCC',
						dashLength:8,
						// splitNumber:5,
						// min:10,
						// max:180,
						// format:(val)=>{
						// 	console.log( typeof(val))
						// 	return val.toFixed(0)+'元'}
						// data:["0","5万","10万","15万","20万","25万","30万"]
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						line:{
							type: 'straight'
						}
					}
				});
				
			},
			touchLineA(e) {
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			}
		},
		filters:{
			
		}
	}
</script>

<style scoped >
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 90%;
		height: 490upx;
		background-color: #FFFFFF;
	}
	
	.charts {
		width: 750upx;
		height: 490upx;
		background-color: #FFFFFF;
	}
	.qiun-common-mt{margin-top:10upx;}
	.qiun-bg-white{background:#FFFFFF; display: flex; flex-direction: row; width: 100%;}
	.qiun-title-bar{width:96%; padding:10upx 2%; flex-wrap:nowrap;}
	.qiun-title-dot-light{border-left: 10upx solid #b5a58c; margin-left: 25upx;padding-left: 20upx;
 padding-bottom: 15upx; font-size: 40upx;color: #000000}
	.uni-common-pl{}
	.uni-list-cell-db{ position: absolute; right: 24rpx; font-size: 32rpx;
	background: -webkit-linear-gradient(left, rgba(180,164,140,1) 0%,rgba(206,191,170,1) 36%,rgba(218,206,183,1) 60%,rgba(224,213,193,1) 70%,rgba(234,225,204,1) 100%);margin-top: 8rpx; color: #FFFFFF; width: 210rpx;
	 text-align: center;border-radius: 20rpx; 
	 border-bottom: 5upx solid #b5a58c;}
</style>
