<template>
	<view>
		<!-- <xTab :value="tabList" @changeTab="changeTab" actType="underline" :config="{padding:10,spacing:120,background:'#1989FA',color:'#666666',actColor:'#1989FA',size:32,actWeight:'Bold',position:0}" class="tab"></xTab>
	
	 -->
	
		<!-- 下拉框 -->
		<!-- <select  v-model="marjor" class="select">
		      <option v-for="(item,index) in marjors" @click="changeTab" :value='item.id' :key="index" class="option">{{item.name}}</option>
		 </select> -->
		<view class="person" v-for="item in list">
			<image></image>
			<view class="left">
				<view>{{item.name}}</view>
				<view>{{item.applyDate}}</view>
			</view>
			<view @click="add(item.studentId)">添加</view>
		</view>
		
		
	</view>
</template>

<script>
	import {RoleList} from '../../../models/superAdmin/RoleList.js'
	import {Admin } from '../../../models/superAdmin/admin.js'
	const admin = new Admin()
	const roleList  = new RoleList()
	 import xTab from '@/components/common/poiuy-xTab/xTab.vue';
	 export default{
	 	components: {
	 		xTab
	 	},
	 	data(){
	 		return{
	 			tabList: [{
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
	 				}
	 			],
				marjors:[{
						name:'信息管理',
						id:0
						},
						{
							name:'数据媒体',
					
						id:1
						},
						{
							name:'酒店管理',
						id:2
							
						},
						{
							name:'财务管理',
						id:3
							
						}
					],
					marjor:'信息管理',
				
	 			  //swiper当前位置
	 			swiperCurrIndex:0,
	 			//swiper动态高度
	 			swiperHegiht:300, 
				list:[]
	 			            
	 		}
	 		
	 	},
		onLoad(){
			this.getRoleList()
		},
		methods:{
			
			//   changeTab(e){
			//                  console.log(e);
			//                  this.swiperCurrIndex = e.index;
			// 				 this.type=e.name;
								
			//              },
			// //swiper组件的切换返回值（执行其他的方法只需要在这里执行即可。）
			//             swiperChange(e) {
			//                 this.swiperCurrIndex = e.detail.current;
			//                 this.setSwiperHeight(); //例如动态获取高
			//             },
			//  //动态设置swiper高度
			//             setSwiperHeight() {
			//                 const that = this;
			//                 let obj = uni.createSelectorQuery().in(this).select("#swiper_id_" + (this.swiperCurrIndex));
			//                 obj.boundingClientRect(function(data) { //data - 各种参数
			//                     if (data) {
			// //得到px单位的高度，通过px转换rpx的单位换算(加上底部的间距或者存在底部按钮高度合成最后的rpx高度)
			//                         that.swiperHegiht = data.height * 2 + 110; 
			//                     }
			//                 }).exec();
			//             },
			
			
				getRoleList(){
					roleList.getRoleList().then(res=>{
						console.log(res)
						this.list = res.data
					})
				},
				add(id){
					admin.addAdmin(id).then(res=>{
						console.log(res)
					})
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
