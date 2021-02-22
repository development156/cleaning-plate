<template>
<view class="member-list-li clearfix" v-for="(item,index) in result" >
  <view class="touch-list list-touch clearfix" @touchstart="touchS" @touchmove="touchM" @touchend="touchE" :data-index="index" :style="item.txtStyle" @click="goDetail(item.user_id)">
      
	  
	  
	  <view class="member-box clearfix">
          <view class="member-title name">{{item.name}}</view>
          <view class="member-title phone">{{item.mobile}}</view>
      </view>
     <view class="member-box"> 
          <view class="member-cardno">{{item.member_cz_card_info.card_no}}</view>
      </view>
     <!-- <view class="member-box clearfix"> -->
          <!-- <button class="btn-unbind" @click="deleteMember(item.user_id)" @click.stop>删除</button> -->
         <!-- <button class="btn-unbind" v-if="item.user_wechat!=null" @click="unBind(item.user_id)" @click.stop>解绑</button>
  
      </view> -->
  </view>
  <view class="touch-list list-delete" :data-userid="item.user_id" @click= "deleteMember(item.user_id)" >
      删除
  </view>
        </view>
</template>

<script>

	export default{
	data(){
	    return {
	                    // 前台用户标志
	                    result:[{"name":'22',"mobile":'mobile',"user_id":2},
						{"name":'33',"mobile":'mofsdf',"user_id":3},
						{"name":'243',"mobile":'mo34',"user_id":4},
						{"name":'32',"mobile":'mobile',"user_id":5}],
	                    delBtnWidth: 70, //删除按钮宽度单位（rpx）
	                    startX:'',
	                };
	  },
	  components:{
		  // uniSwipeActionItem,
		  // uniSwipeAction
	  },
	  methods:{
	      touchS: function (e) {
	                    // console.log('touchS')
	                    if (e.touches.length == 1) {
	                        //设置触摸起始点水平方向位置
	                        this.startX=e.touches[0].clientX
	                        // console.log(this.startX)
	                    }
	                },
	                touchM: function (e) {
	                     // console.log('touchM')
	                    if (e.touches.length == 1) {
	                        //手指移动时水平方向位置
	                        var moveX = e.touches[0].clientX;
	                        //手指起始点位置与移动期间的差值
	                        var disX = this.startX - moveX;
	                        var delBtnWidth = this.delBtnWidth;
	                        var txtStyle = "";
	                        if (disX == 0 || disX < 0) {//如果移动距离小于等于0，说明向右滑动，文本层位置不变
	                            txtStyle = "left:0px";
	                        } else if(disX > 0){//移动距离大于0，文本层left值等于手指移动距离
	                            txtStyle = "left:-" + disX + "px";
	                            if (disX >= delBtnWidth) {
	                                //控制手指移动距离最大值为删除按钮的宽度
	                                txtStyle = "left:-" + delBtnWidth + "px";
	                            }
	                        }
	                        //获取手指触摸的是哪一项
	                        var index = e.currentTarget.dataset.index;
	                        var list = this.result;
	                        list[index].txtStyle = txtStyle;
	                        // console.log(list[index].txtStyle)
	                        //更新列表的状态
	                        this.result=list;
	                    }
	                },
	                touchE: function (e) {
	                    // console.log('touchE')
	                    if (e.changedTouches.length == 1) {
	                        //手指移动结束后水平位置
	                        var endX = e.changedTouches[0].clientX;
	                        //触摸开始与结束，手指移动的距离
	                        var disX = this.startX - endX;
	                        var delBtnWidth = this.delBtnWidth;
	                        //如果距离小于删除按钮的1/2，不显示删除按钮
	                        var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
	                        //获取手指触摸的是哪一项
	                        var index = e.currentTarget.dataset.index;
	                        var list = this.result;
	                        list[index].txtStyle = txtStyle;
	                        // console.log(list[index].txtStyle)
	                        //更新列表的状态{
	                        this.result=list
	                    }
	                },
	                //点击删除按钮事件
	                delItem: function (e) {
	                    //获取列表中要删除项的下标
	                    var userid = e.currentTarget.dataset.userid;
	                    this.deleteMember(userid);
	                },
	},
	}
</script>

<style scoped>
	.member-list-li{
	    position: relative; 
	    overflow: hidden;
	    margin: 15px 0;
	    border: 1px solid #EEEEEE;
	    border-radius: 10px;
	    color: #fff;
	}
	.touch-list{
	    position: absolute; 
	    top:0; 
	    padding: 10px 10px 10px;
	    /* background-color: #697082; */
		background-color: #007AFF;
	    border-radius: 10px;
	    overflow: hidden;
	}
	.list-touch{
	    position: relative;
	    width: 100%;   
	    z-index: 5;    
	    transition: left 0.2s ease-in-out;   
	    white-space:nowrap;   
	    overflow:hidden;   
	    text-overflow:ellipsis; 
	}
	.list-delete{
	    right: 0; 
	    float: left;
	    width: 140rpx;
	    height: 242rpx;
	/*    line-height: 242rpx; */
	    background-color: #EA5863;
		vertical-align: middle;
	    border-radius: 0 20rpx 20rpx 0;
	    color: #fff;
	    font-size: 34rpx;
	    font-weight: lighter;
	    text-align: right;
	}
</style>
