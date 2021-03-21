<template>
	<view>
		<view class="xTab">
			<xTab :value="tabList" @changeTab="changeTab" actType="underline" :config="{padding:70,spacing: 150,background:'white',color:'#666666',actColor:'#C9A65E',actSize:40,size:40,position:0}"></xTab>
		</view>	
		<manage-admin v-if="index==0" :list="list" @navTo1="navTo1" @navTo3="navTo3" @updated="updated" @deleted="deleted"></manage-admin>
		<manage-user v-if="index==1" :rolelist="rolelist" @add="add" @navTo="navTo" ></manage-user>
		
	</view>
</template>

<script>
	import xTab from '@/components/common/poiuy-xTab/xTab.vue';
	import manageUser from './manageUser/index.vue'
	import manageAdmin from './manageAdmin/index.vue'
	// 审核列表
	import {RoleList} from '@/models/superAdmin/RoleList.js'
	// 管理员
	import {Admin } from '@/models/superAdmin/admin.js'
	const admin = new Admin()
	const roleList  = new RoleList()
	
	export default{
		components: {
			xTab,
			manageUser,
			manageAdmin
			
		},
		data(){
			return{
				tabList: [{
					name:'权益部',
					id:0
					},
					{
					name:'用户',
					id:1
					},
					
				],
				index:0,
				rolelist:[],
				list:[]
			}
		},
		onLoad(){
			this.getRoleList()
			this.selectAdmin()
		},
		methods:{
			// 监听切换
			changeTab(e){
			     console.log(e);
				this.index = e.index
			 },
			 //审核列表
			 	getRoleList(){
			 		roleList.getRoleList().then(res=>{
			 			console.log(res)
			 			this.rolelist = res.data
			 		})
			 	},
			// 查询
			selectAdmin(){
				admin.selectAdmin().then(res=>{
					console.log(res)
					this.list = res.data
				
				})
			},
			//添加管理员
			add(id,index){
				admin.addAdmin(id).then(res=>{
					if(res.code==200){
						uni.showToast({
						  title: res.msg,
						  icon: "none"
						});
						this.rolelist.splice(index,1)
					}
					
				})
			},
			// 跳转到用户详情
			navTo(item){
				uni.navigateTo({
				url:`./manageUser/userDetails/userDetails?item=`+ encodeURIComponent(JSON.stringify(item))
				})
			},
			
			// 管理员信息详情
			navTo3(item){
				uni.navigateTo({
				url:`./manageAdmin/managerDetails/managerDetails?item=`+ encodeURIComponent(JSON.stringify(item))
				})
			},
			
			// 删除管理员
			deleted(id){
				admin.deleteAdmin(id).then(res=>{
					console.log(res)
					this.list.splice(id, 1);
					uni.showToast({
					  title: '删除成功',
					  icon: "none"
					});
				})
			},
			// 查看用户
			navTo1(){
				uni.navigateTo({
				url:`./manageUser/userList`
				})
			}
			
			
		}
	}
</script>

<style>
	.xTab{
		border-bottom: 1px solid gray;
		background-color: white;
	}
</style>
