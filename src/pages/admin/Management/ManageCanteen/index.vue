<template>
	<view>
		<view class="tab-view" >
		<xTab :value="halls" @changeTab="changeHallTab"  :config="{padding:80,spacing: 200,color:'#666666',actColor:'#C9A65E',size:32,position:0}"></xTab>
		<xTab  :value="floors" @changeTab="changeFloorTab" actType="underline" :config="{spacing: 125,background:'#1989FA',color:'#666666',actColor:'#1989FA',size:32,position:0}"></xTab>
		</view>

		<p class="p">窗口</p>
		<view class="list-zone">
			<view class="list" v-for="(item,index) in windowList" :key="item.id" >
			<p  class="list-item" ><span>{{item.id}}</span>{{item.name}}</p>
			</view>
		</view>

		<view class="footer">

			<!-- <select  v-model="option" class="select">
			      <option v-for="(item,index) in options" @click="changeTab" :value='item.name' :key="item.id" class="option">{{item.name}}</option>
			</select> -->
			<picker  :value="index1" :range="options"  @change="changeTab" class="select" :range-key="'name'">
				<view class="option" >{{options[index1].name}}</view>
			</picker>
			<picker  :value="index2" :range="halls"  @change="changeTabHall" class="select" :range-key="'name'">
				<view class="option" >{{halls[index2].name}}</view>
			</picker>
			<picker  :value="index3" :range="floors"  @change="changeTabFloor" class="select" :range-key="'name'">
				<view class="option" >{{floors[index3].name}}</view>
			</picker>
	
			<view class="input" >
			<input maxlength="10"  v-model="window" placeholder="输入窗口" />
			</view>
			<view class="button" >
			<button style="font-family: Microsoft Yahei;width: 296px;
			height: 70rpx; margin: 0 auto; 
			border-radius: 40rpx;
			background-color: rgba(201, 166, 94, 100);
			color: rgba(255, 255, 255, 100);
			font-size: 28rpx;" @click="addCanteenInfo">添加</button>
			</view>
			 
		</view>
	</view>
</template>

<script>
	import xTab from '@/components/common/poiuy-xTab/xTab.vue';
	import {ManageCanteen} from '../../../../models/admin/Management/ManageCanteen/manageCanteen.js'
	const manageCanteen = new ManageCanteen()
	 
	export default{
		data(){
			return{
				index1:0,
				index2:0,
				index3:0,
				// options:["食堂","窗口","楼层"],
				options:[{name:'食堂',id:'0'},{name:'窗口',id:'1'},{name:'楼层',id:'2'}],
				option:'食堂',
				halls:[
					
					],
				// halls:['学生食堂','教工食堂','小食堂'],
				optionhall:'', //select已选择
				idhall:'',
				floors:[
					// {name:'一楼',id:'0'},{name:'二楼',id:'1'},{name:'三楼',id:'2'},
					],
				// floors:['一楼','二楼','三楼'],
				optionfloor:'', //select已选择
				window:'', 
				windowList:[
					// {name:'清真',id:'0'},
					// {name:'冒菜',id:'1'},
					
					],
				allWindowList:[],//最初获得的所有窗口 需要筛选
				tabList: [{
					name:'已处理',
					id:0
					},
					{
					name:'待处理',
					id:1
					},
				],
			}
		},
		created() {
			this.getCanteeName();
			
		},
		components:{
			xTab
		},
		methods:{
			//添加食堂信息
			addCanteenInfo(){
				var th=this;
				console.log(th.optionhall)
				console.log(th.optionfloor)
				console.log(th.window)
				manageCanteen.addCanteenInfo({
				"ID":"",
				"diningRoom":th.optionhall,
				"floor":th.optionfloor,
				"windows":th.window

				}).then( res => {
					if(res.code==200){
					uni.showToast({
						title: '上传成功',
						// icon:'none',
						duration: 1360
					});
					th.getCanteeInfo({name: th.optionhall})
					th.optionhall="";
					th.optionfloor="";
					th.window="";
					
					}
				}).catch(err => {
					uni.showModal({
							content: "添加失败",
							showCancel: false
						});
				})
			},
			//获取相应食堂的楼层及窗口信息
			getCanteeInfo(CanteenName){
				var th=this;
				// console.log("CanteenName.name")
				// console.log(CanteenName.name)
				var i=0;
				manageCanteen.getCanteenInfo({"CanteenName":CanteenName.name}).then( res => {
					th.allWindowList=[];
					th.windowList=[];
					
					if(res.code==200){
						var id=0;
					
						//导入楼层
						res.data.forEach(function(element) {
							
							th.floors.push({
								name:element.floor,id:id,
							})
							
							
							
							id++;		
							
						element.windowsList.forEach(function(element2){	
							console.log(element2)
							th.allWindowList.push({
								name:element2.windows,id:element2.id,belong:element.floor
							})
							
						})		
						i++;
						
					// console.log(th.windowList)	
					})
					th.optionfloor=th.floors[0].name
					}
						
				}).catch(err => {
					uni.showModal({
							content: "error",
							showCancel: false
						});
				})
			},
			//获取所有食堂的名称
			getCanteeName(){
				var th=this;
				manageCanteen.getCanteenName().then( res => {
					
					if(res.code == 200){
						var id=0;
						res.data.forEach(function(element) {
						  th.halls.push({
							  name:element,id:id,
						  })
						  // th.halls.push(element)
						  id++;
						});
						th.optionhall=th.halls[0].name
						
						th.getCanteeInfo(th.halls[0]);
					}
				}).catch(err => {
					uni.showModal({
							content: "error",
							showCancel: false
						});
				})
			},
			changeTabHall(e){
				console.log(e)
				// this.optionhall = e.target.value
				
				this.index2 = e.detail.value;
				this.optionhall =this.halls[this.index2]
				console.log("this.optionhall")
				console.log(this.optionhall)
				this.getCanteeInfo(this.optionhall)
			
			},
			changeTabFloor(e){
				console.log(e);
				// this.optionfloor= e.target.value
				this.index3 = e.detail.value;
				this.optionfloor=this.optionfloor[this.index3]
			},
			//顶部
			changeFloorTab(e){
				// this.allWindowList=[];
				this.windowList=[];
				console.log(e);
				console.log(this.optionhall);
				manageCanteen.getCanteenWindows({
					"canteenName": "第三食堂",
					"floor": "3楼"
				}).then( res => {
				console.log("res")
				console.log(res)
					}).catch(err => {
					uni.showModal({
							content: "error",
							showCancel: false
						});
				})
				// 2021/3/20
// 				this.allWindowList.forEach(item =>{
// 					if(item.belong == e.name){
// 						this.windowList.push(item)
// 					}
// 				})
			},
			changeHallTab(e){
				this.getCanteeInfo({CanteenName: e.name});
			},
			changeTab(e){
				
			  console.log(e);
			   // this.option = e.target.value
			   this.index1 = e.target.value;
			   this.option=this.options[this.index1]
			 
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
		}
	}
</script>

<style scoped lang="scss">
	page{
		.p{
			margin-top: 20rpx;
			height: 70rpx;
			line-height: 70rpx;
			border-radius: 10rpx;
			text-align: left;
			padding-left: 54rpx;
			font-size: 32rpx;
			background-color: rgba(245, 245, 245, 100);
			
		}
		.list-zone{
			display: flex;
			flex-direction: column;
			margin: 0 auto;
			// height: 240rpx;
			
			position: fixed;
			max-height: 32%;
			overflow-y:scroll ;
			width: 90%;
			left: 0 ;
			right: 0;
			
			.list{
				
				.list-item{
					padding-left: 0rpx;
					margin: 18rpx;
					margin-bottom: 0rpx;
					margin-top: 8rpx;
					color: rgba(16, 16, 16, 100);
					font-size: 36rpx;
					background: #FFFFFF;
					span{
						
						font-weight: 500;
						padding-right: 8%;
						color: rgba(201, 166, 94, 100);
						font-size: 40rpx;
					}
				}
			}
		}
		.footer{
			width: 100%;
			height:42%;
			background-color: rgba(245, 245, 245, 100);
			color: rgba(16, 16, 16, 100);
			font-family: Arial;
			box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.4);
			display: flex;
			justify-content: space-evenly;
			flex-direction: column;
			// position: absolute;
			position: fixed;
			bottom: 0;
			.input{
				margin:0 auto;
				width: 80%;
				
			input{
				
				width: 95%;
				
				height: 68rpx;
				padding-left: 15rpx;
				padding-right: 15rpx;
				
				
				
				background-color:#FFFFFF;
				color: rgba(136, 136, 136, 100);
				font-size: 28rpx;
				text-align: left;
				font-family: Microsoft Yahei;
				
			}
			}
			.select{
				background: #FFFFFF;
				width: 80%;
				height: 56rpx;
				line-height: 56rpx;
				overflow: hidden;
				margin: 0% auto;
				margin-bottom: 0%;
				color: rgba(16, 16, 16, 100);
				font-size: 28rpx;
				font-family: Microsoft Yahei;
				border: 2rpx solid rgba(255, 255, 255, 100);
				.option{
					color: rgba(151, 151, 151, 100);
					
				
				}
				
			}
			
		
		}
	}
</style>
