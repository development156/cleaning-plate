<template>
	<view>
		<view class="tip">
			<text class="iconfont icon-shuangyinhao">
				
			</text>
			<text>
				同学意见多多提
			</text>
			<text>
				食堂改善快快快
			</text>
		</view>
		
		
		 <view class="cart">
		 		<view class="bullet">
		 			<canvas style="width:750rpx;height:300rpx" canvas-id="bulletCanvas"></canvas>
		 		</view>
		 	</view>
		
		
		
		<view class="content">
			
			<input 
			placeholder="想说点啥" 
			maxlength="30"
			focus
			v-model="description"
			@input="onKeyInput"
			
			></input>
			<view class="line">
			<view class="item1"></view>
			<view class="text">{{length}}/30</view>
			<view class="item2"></view>
		
			</view>
			<button type="submit" @click="getFeedBack()">提交</button>
		</view>
	</view>
</template>

<script>
	import {MyFeedBack} from '../../../../models/MyModel/feedBack.js'
	const myFeedBack = new MyFeedBack()
	export default{
		onLoad(){
			this.feedBackList()
						
			this.draw()
					
		},
		onReady() {
				
				},
		methods:{
			 onKeyInput: function(event) {
			        this.length =  event.target.value.length
			        },
		getFeedBack(){
		
			console.log(this.description)
			myFeedBack.postFeedback(this.studentId,this.description).then(res=>{
				console.log(res)
					let _this = this
				uni.showToast({
				  title:res.msg,
				  icon: "none",
				  success(){
					  _this.description=''
				  }
				});
			})
			
		},
		feedBackList(){
			myFeedBack.feedbackList().then(res=>{
				console.log(res)
				
				for(var i=0;i<res.data.length;i++){
					this.bullet[i] ={
						bullet:res.data[i].description,
						speed:Math.random()*1+1,
						x: 750,
						y: Math.random()*250+20
					}
				
				}
				console.log(this.bullet)
			})
		},
					draw(){
						const ctx = uni.createCanvasContext("bulletCanvas")
						ctx.font = 'italic bold 20px cursive'
						
						function anim(){
							ctx.setFontSize(15)
							// 擦除整个画布
							ctx.setFillStyle('#ffffff')
							ctx.setGlobalAlpha(0.5)
							ctx.clearRect(0,0,850,2000)
							// 循环绘制
							this.bullet.forEach(item=>{
								ctx.fillText(item.bullet,item.x,item.y)
								item.x -= item.speed
								// 调用measureText()来获取TextMertics对象
								let textMertics = ctx.measureText(item.bullet)
								// 根据TextMertics对象获取文字宽度
								let textWidth = textMertics.width
							})
							ctx.draw()
							var lastFrameTime = 0;
							var doAnimationFrame = function (callback) {
							    var currTime = new Date().getTime();
							    var timeToCall = Math.max(0, 500 - (currTime - lastFrameTime));
							    var id = setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
							    lastFrameTime = currTime + timeToCall;
							    return id;
							};
							doAnimationFrame(anim.bind(this))
						}
						
						anim.call(this)
					}
				},
		    
		
		
	
		data(){
			return{
				
				// 临时设置的学号
				studentId:1,
				description:'',
				length:0,
				
				
			bullet:[]
			}
		}
		
		
	}
</script>

<style lang="scss">
	page{
		background: linear-gradient(to bottom, #475f69 0%,#415d68 19%,#3e5c66 24%,#3b5c65 25%,#395b65 32%,#355a63 35%,#335964 42%,#315961 43%,#2b5760 54%,#28575f 54%,#2a5661 56%,#275660 56%,#27565e 58%,#22545f 68%,#1f545c 68%,#1f535e 71%,#1d535d 76%,#1a535c 77%,#1c525c 78%,#19525b 78%,#19525d 80%,#1b515b 80%,#18535b 82%,#115059 100%);
		.tip{
			color: #FFFFFF;
			display: flex;
			flex-direction: column;
			letter-spacing: 0.625rem;
			font-style: italic;
			font-size: 1.25rem;
			margin-left:1.25rem;
			 background-image: -webkit-linear-gradient(bottom, rgb(255, 255, 255), rgb(0, 0, 0));
			            -webkit-background-clip: text;
			            -webkit-text-fill-color: transparent;
			text{
				&:nth-child(1) {
					font-size: 3.125rem;
				}
			}
			
		}
		.cart{
			height: 11.25rem;
		}
		.content{
			float: center;
			margin: 5% auto;
			width: 95%;
			height: 21rem;
			background-color: rgba(255, 255, 255, 0.5);
			font-family: "Microsoft Yahei";
			color: gray;
			font-size: 0.875rem;
			border-radius: 1.25rem;
			position: relative;
			input{
				width: 80%;
				height: 20%;
				position: absolute;
				top: 5%;
				left: 5%;
			}
			.line{
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				
				.item1,.item2{
					height: 0.0625rem;
					background-color:gainsboro ;
					margin: 0% 5% 0 5%;
				}
				.item1{
					margin-top: 20%;
				}
				
				.text{
					margin: 30% 5% 2% 85%;
				}
				
				
			}
			button{
				color: #FFFFFF;
				width: 80%;
				height: 44px;
				bottom: 15%;
				left: 10%;
				position: absolute;
				border-radius: 20px;
				
				background-color: rgba(176, 131, 103, 100);
				text-align: center;
				
			}
		}
	}
</style>
