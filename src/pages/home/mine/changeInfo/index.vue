<template>
	<view>
	<view class="content">
	
		<view class="item" >
			<text>学院</text>
			
			<picker mode="selector" :value="index1"  :range="colleges" @change="bindPickerChange1">
			      <view>{{colleges[index1]}}</view>
			 </picker>
		</view>
		
		<view class="item" >
			<text>专业</text>
			<picker @change="bindPickerChange2" :value="index2" :range="profession" >
				<view >{{profession[index2]}}</view>
			</picker>
		</view>
		<view class="item" >
			<text>年级</text>
			<picker @change="bindPickerChange3" :value="index3" :range="grade" >
				<view class="uni-input">{{grade[index3]}}</view>
			</picker>
		</view>
	<view class="item" >
		<text>学号</text>
		<input placeholder="请输入学号" />
	</view>
	<view class="item" >
		<text>姓名</text>
		<input placeholder="请输入姓名" />
	</view>
	
		<button style="color: white; width: 95%; margin: 10% auto; background: -webkit-linear-gradient(-45deg, rgba(167,147,123,1) 0%,rgba(176,158,134,1) 14%,rgba(181,165,140,1) 30%,rgba(205,190,169,1) 76%,rgba(213,201,179,1) 98%,rgba(213,201,179,1) 100%,rgba(240,240,240,1) 100%,rgba(240,240,240,1) 100%);;" @click="register">立即修改</button>
		
	</view>
	</view>
</template>

<script>
	import {ManageAcademy} from '@/models/admin/Management/ManageAcademy/manageAcademy.js'
	const manageAcademy = new ManageAcademy();
	import {register} from '@/models/MyModel/register.js'
	const Register = new register()
	import { mapGetters } from 'vuex'
	export default{
		onLoad(){
			this.getAllProfession()
			this.getProfession()
		},
		computed: {
			...mapGetters([
				'userInfo'
			])
		},
		methods:{
			getAllProfession(){
					manageAcademy.getAllProfession().then( res => {
						// console.log(res)
						for(var i=0;i<res.data.length;i++){
								this.colleges.push(res.data[i].college)
						}
					
					// 	console.log(this.colleges)
					})
				},
			
			getProfession(){
				manageAcademy.getAllProfession({"college":this.college}).then( res => {
					// console.log(res)
					if(res.code==200){
						console.log(res.data)
						for(var i=0;i<res.data.length;i++){
								this.profession.push(res.data[i].profession) 
								this.grade.push( res.data[i].grade)
						}
						
					}
					// console.log(this.grade)
				})
			},
			bindPickerChange1(e){
				// console.log(e)
				this.index1 = e.detail.value
				this.college = this.colleges[this.index1]
				this.getProfession()
			},
			bindPickerChange2(e){
				// console.log(e)
				this.index2 = e.detail.value
				this.pro = this.profession[this.index2]
			},
			bindPickerChange3(e){
				// console.log(e)
				this.index3 = e.detail.value
				this.grd = this.grade[this.index3]
			},
			register(){
				let studentInfo ={
					college:this.college,
					profession:this.pro,
					grade:this.grd
				}
				// console.log(this.userInfo)
				Register.registerStudent(studentInfo,this.userInfo).then(res=>{
					console.log(res)
						uni.showToast({
							title: '修改成功',
							icon:'none',
							duration: 1500
						});
					
				})
			}
		},
		data(){
			return{
			
				index1: 0,
				index2:0,
				index3:0,
				college:'信息学院',
				pro:'信息管理与信息系统',
				grd:'2020',
				colleges:[],
				profession:[],
				grade:[]
			}
		}
	}
</script>

<style>
	page{
			background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);

	}
</style>
<style lang="scss" scoped>
	.content{
		margin-top: 2.3125rem;
		font-size: 30rpx;
		.top{
			position: absolute;
			top:1.25rem;
			left: 80%;
			width: 4.125rem;
			height: 2rem;
			border-radius: 1.25rem;
			text-align: center;
			background-color: rgba(250,250,250,0.3);
			color: black;
			font-size: 30rpx;
			
		}
		.item{
			picker{
				
				height: 1.875rem;
				
			font-size: 30rpx;
				color:blcak;
				
			}
			color: black;
			display:flex;
			margin: 4.25rem 1.25rem 0px 1.25rem;
			text{
				margin-bottom: 4%;
			}
			input{
				border: none;
				width: 25%;
			}
			border-bottom: 1px solid lightgray;
			justify-content: space-between;
		}
		
	}
</style>
