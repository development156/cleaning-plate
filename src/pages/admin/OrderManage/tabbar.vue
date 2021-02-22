<template>
	<view>
	<!--index.wxml-->
	  <view id="Vue">
	
	            <view class="top">
	                <view class="topbar">
	                    <view :class="[index == status ? 'bechoice':'nochoice']" v-for="(item,index) in list" :key="index">
	                        <view class="xuan"><span @click="choicePrice(index,item.option,item.id)">{{item.option}}</span></view>
	                    </view>
	                </view>
	            </view>
	      
	    </view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
		 //数据
		            status: 0,
		            id: 1,
		            list: [
		                {
		                    option: "待处理",
		                    id: 1
		                },
		                {
		                    option: "已处理",
		                    id: 2
		                },
		               
		            ],
					}
		 },
		    methods: {
		              //事件
		  
		              choicePrice(index, option, id) {
		                  let that = this
		                  that.status = index
		                  that.id = id
		                  // console.log("that.id")
						  this.$emit("state",that.id)
		              }
		          },
		          created() {
		              //加载事件
		              if (status == 0) {
		                  console.log(this.id)
		              }
		  
		          }
		 
		 
	}
</script>

<style scoped>

	        .top {
	            width: 750rpx;
				height:100%;
				
	        }
	
	        .topbar {
				
	            display: flex;
	            flex-direction: row;
				
	            width: 100%;
	            height: 86rpx;
	            /* margin-left: 10%; */
	            overflow: hidden;
	            
				background: #FFFFFF;
				
	        }
	
	        .bechoice {
				
				font-size: 36rpx !important;
	            display: flex;
	            align-items: center;
	            justify-content: center;
	            /* font-size: 1rem; */
	            /* background: #FCD844 !important; */
				color: rgba(201, 166, 94, 100);
	            width: 100%;
	            height: 100%;
	        }
	
	        .nochoice {
				font-size: 36rpx !important;
	            display: flex;
	            align-items: center;
	            justify-content: center;
	            /* font-size: 1rem; */
				color: rgba(16, 16, 16, 100);
	            /* background: #78CDB0; */
	            width: 100%;
	            height: 100%;
	            /* font-weight: bold; */
	        }
	
	        .xuan span{
	            font-weight: 500;
	            /* font-size: 0.8rem; */
	        }
	
	        p {
	            padding: 0;
	            margin: 0;
	        }
	    </style>

</style>
