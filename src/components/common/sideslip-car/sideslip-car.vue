<template>
	<view class="car-count">
		<view class="cart-box" v-if='carts.length>0'>
			<view class="touch-item" v-for='(item,index) in carts' :class="item.isTouchMove == true?'touch-move-active':''" :key='item.id'
			 @touchstart="touchstart" @touchmove="touchmove" :data-index='index'>
				<view class="cartList clearfix">
					<view @click="selectList(index)" class="selBtn centerboth">
						<text class="iconfont" :class="item.selected==true?'icon-xuanzhong_':'icon-2weixuanzhong'"></text>
					</view>
					<view class="gmes">
						<view class='cartImg centerboth'>
							<image :src="imgurl+item.product.url" mode="aspectFit"></image>
						</view>
						<view class="boxCount clearfix">
							<text class="gname line1">{{item.product.name}}</text>
							<view class="gtitle line1">产地 {{item.product.productionPlace}}</view>
							<view class="gprice"><text>￥</text>{{item.product.univalence}}</view>
						</view>
					</view>
					<view class="countBox centerboth">
						<view class="carSub" @click="changeNum(index,item.id,2)">
							<text class="iconfont icon-jianhao" style="font-size: 1.375rem"></text>
						</view>
						<view class="cartNum">{{item.number}}</view>
						<view class="carAdd" @click="changeNum(index,item.id,1)">
							<text class="iconfont icon-tubiaozhizuomoban"  ></text>
						</view>
					</view>
					<text class="dleBtn" @click="deleteList(index,item.id)">删除</text>
				</view>
			</view>
		</view>
		<view class="botomBtn">
			<view @click="allSelBtn"  class="selBtn centerboth">
				<text class="iconfont" :class="selectAll?'icon-xuanzhong_':'icon-2weixuanzhong'"></text>
				<text>全选</text>
			</view>
			<view class="price">合计：<text class="fh">￥</text><text class="num">{{totalPrice}}</text></view>
			<view @click="jiesuan" class="yyBtn">结算({{totalNum}})</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			carts:{//提示信息字体颜色
				type: Array,
				default(){
					return []
				}
			}
		},
		onLoad(){
				this.imgurl = this.imgUrl
				},
		data() {
			return{
				totalPrice: 0, // 总价，初始为0
				selectAll: true, // 全选状态，默认全选
				startX: 0, //开始坐标
				startY: 0,
				totalNum: 0,
				imgurl:''
			}
		},
		mounted() {
			this.allSelBtn();
			this.getTotalPrice();
		},
		created() {

		},
		computed: {
			
		},
		methods: {
			jiesuan:function(){
				var that = this;
				var idArr = [];
				var numArr =[]
				var carId = that.carts;
				for(var i =0;i< carId.length ;i++){
					if(carId[i].selected == true){
						idArr.push(carId[i].pid);
						numArr.push(carId[i].number)
					}
				}
				
				if(idArr.length<=0){
					uni.showToast({
						title:'请选择要结算的商品',
						icon:'none'
					})
					return false;
				}
				// var ids = idArr.toString(',');
				this.$emit('jsBtn',idArr,numArr);
			},
			/**
			 * 修改商品数量
			 */
			changeNum:function(index,id,type) {
				var that = this;
				var carts = that.carts;
				var number = parseInt(carts[index].number);
				if(type==2){
					number = number - 1;
					if(number<=1){
						number = 1;
					}
				}else{
					number = number + 1;
				}
				carts[index].number = number;
				this.$emit('changeNum',carts,id,type);
			},
			/**
			 * 删除购物车当前商品
			 */
			deleteList(index,ids) {
				var that = this;
				let carts = that.carts;
				this.$emit('delBtn',carts,ids,index)
				
			},
			/**
			 * 当前商品选中事件
			 */
			selectList:function(index) {
				var leng = 0;
				var that = this;
				var carts = that.carts;
				var selected = carts[index].selected;
				carts[index].selected = !selected;
			
				for (var i = 0; i < carts.length; i++) {
					if (carts[i].selected == false) {
						that.selectAll = false;
					}
					if (carts[i].selected == true) {
						leng = leng + 1;
					}
				}
				if (leng == carts.length) {
					that.selectAll = true;
				}
				this.$emit('selThis',carts);
			},
			allSelBtn:function(e) {
				var that = this;
				var selectAll = that.selectAll;
				selectAll = !selectAll;
				var carts = that.carts;
			
				for (var i = 0; i < carts.length; i++) {
					carts[i].selected = selectAll;
				}
				that.selectAll = selectAll;
				this.$emit('selAllBtn',carts);
			},
			/**
			 * 计算总价
			 */
			getTotalPrice:function() {
				var that = this;
				var carts = that.carts; // 获取购物车列表
				var total = 0;
				var totalnum = 0;
				for (var i = 0; i < carts.length; i++) { // 循环列表得到每个数据
					if (carts[i].selected) { // 判断选中才会计算价格
						total += carts[i].number * carts[i].product.univalence; // 所有价格加起来
						totalnum = totalnum + parseInt(carts[i].number);
					}
				}
				that.totalNum = totalnum;
				that.totalPrice = total.toFixed(2);
			},
			touchstart: function(e) {
				var that = this;
				var carts = that.carts;
				//开始触摸时 重置所有删除
				carts.forEach(function(v, i) {
					0
					if (v.isTouchMove) //只操作为true的
						v.isTouchMove = false;
				});
				that.startX = e.changedTouches[0].clientX;
				that.startY = e.changedTouches[0].clientY;
				this.$emit('touchEv',carts);
			},
			//滑动事件处理
			touchmove: function(e) {
			
				var that = this;
				var carts = that.carts;
				var index = e.currentTarget.dataset.index, //当前索引
				
					startX = that.startX, //开始X坐标
					startY = that.startY, //开始Y坐标
					touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
					touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
					//获取滑动角度
					angle = that.angle({
						X: startX,
						Y: startY
					}, {
						X: touchMoveX,
						Y: touchMoveY
					});
				carts.forEach(function(v, i) {
					v.isTouchMove = false
					//滑动超过30度角 return
					if (Math.abs(angle) > 30) return;
					if (i == index) {
						if (touchMoveX > startX) //右滑
							v.isTouchMove = false
						else //左滑
							v.isTouchMove = true
					}
				})
				//更新数据
				this.$emit('touchEv',carts);
			},
			angle: function(start, end) {
				var _X = end.X - start.X,
					_Y = end.Y - start.Y
				//返回角度 /Math.atan()返回数字的反正切值
				return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
			}
		}
	}
</script>
<style>
	page{
		background-color: #f5f5f5;
	}
</style>
<style scoped>
	
	/*有商品时*/
	.car-count{
		width: 100%;
	}
	.cart-box {
		width: 100%;
		overflow: hidden;
		
	}
	
	.cartList {
		width: 100%;
		position: relative;
		padding: 20rpx 20rpx 20rpx 50rpx;
		font-size: 26rpx;
		-webkit-transition: all 0.4s;
		transition: all 0.4s;
		-webkit-transform: translateX(60px);
		transform: translateX(60px);
		margin-left: -60px;
		background: #fff;
		margin-top: 30rpx;
	}
	
	.boxCount {
		float: left;
	}
	
	.boxCount .gname {
		font-size: 32rpx;
		color: #333333;
	}
	
	.boxCount .gtitle {
		margin: 5rpx 0 15rpx 0;
		font-size: 24rpx;
		color: #999999;
	}
	
	.gprice {
		color: #e60012;
		font-size: 34rpx;
	}
	
	.gprice text {
		font-size: 24rpx;
	}
	
	.cartList .selBtn {
		position: absolute;
		left: 0;
		width: 50rpx;
		height: 100%;
		top: 0;
	}
	
	.cartList .selBtn image {
		width: 32rpx;
		height: 32rpx;
	}
	
	.cartList .cartImg {
		float: left;
		width: 145rpx;
		height: 145rpx;
		background: #f5f5f5;
		border-radius: 5rpx;
		overflow: hidden;
		margin-right: 20rpx;
	}

	.countBox {
		position: absolute;
		right: 140rpx;
		bottom: 25rpx;
		right: 10rpx;
		bottom: 20rpx;
	}
	
	.countBox .iconfont{
		font-size: 46rpx;
	}
	
	.cartNum {
		width: 80rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		font-size: 32rpx;
		color: #1a256a;
	}
	
	.dleBtn {
		position: absolute;
		right: 0;
		top: 0;
		width: 120rpx;
		height: 100%;
		text-align: center;
		background: #F13430;
		color: #ffffff;
		font-size: 30rpx;
		line-height: 164rpx;
		z-index: 9999;
		-webkit-transition: all 0.4s;
		transition: all 0.4s;
		-webkit-transform: translateX(70px);
		transform: translateX(70px);
	}
	
	.touch-move-active .cartList,
	.touch-move-active .dleBtn {
		-webkit-transform: translateX(0);
		transform: translateX(0);
	}
	
	.touch-move-active .dleBtn {
		right: -120rpx;
	}
	
	.botomBtn {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		background: #FFFFFF;
		box-shadow: #f3f3f3 0rpx -5rpx 10rpx;
		height: 98rpx;
		padding: 0 300rpx 0 30rpx;
		z-index: 99;
	}
	
	.botomBtn .price {
		float: right;
		line-height: 98rpx;
		font-size: 28rpx;
		color: #333333;
	}
	
	.botomBtn .price text {
		font-size: 24rpx;
		color: #e60012;
	}
	
	.botomBtn .price .num {
		font-size: 30rpx;
		font-weight: bold;
	}
	
	.botomBtn .yyBtn {
		position: absolute;
		right: 30rpx;
		width: 240rpx;
		height: 89rpx;
		font-size: 32rpx;
		background: -webkit-linear-gradient(-45deg, rgba(167,147,123,1) 0%,rgba(176,158,134,1) 14%,rgba(181,165,140,1) 30%,rgba(205,190,169,1) 76%,rgba(213,201,179,1) 98%,rgba(213,201,179,1) 100%,rgba(240,240,240,1) 100%,rgba(240,240,240,1) 100%);
		color: #FFFFFF;
		text-align: center;
		border-radius: 40rpx;
		line-height: 89rpx;
		
		top: 5rpx;
	}
	
	.botomBtn .selBtn {
		position: absolute;
		height: 100%;
		float: left;
	}
	
	.botomBtn .selBtn image {
		width: 32rpx;
		height: 32rpx;
		margin: 0 10rpx;
	}

	page{
	  background: #f5f5f5;
	}
	view,textarea,input,text,button{
	  padding: 0;
	  margin: 0;
	  box-sizing:border-box;
	 font-size: 30rpx;
	  font-family: "微软雅黑";
	}
	.uni-checkbox-input{
	    border-radius: 50% !important;
	}
	.container {
	    height: 100%;
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    justify-content: space-between;
	    box-sizing: border-box;
	    background: #f5f5f5;
	    overflow: hidden;
	}
	.line1{
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: box;
	    display: -webkit-box;
	    line-clamp: 1;
	    box-orient: vertical;
	    -webkit-line-clamp: 1;
	    -webkit-box-orient: vertical;
	    word-break: break-all; /* 英文换行问题 */
	}
	.line2 {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: box;
	    display: -webkit-box;
	    line-clamp: 2;
	    box-orient: vertical;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	    word-break: break-all; /* 英文换行问题 */
	}
	.centerboth {
	    display:flex;
	    display: -webkit-flex;
	    align-items:center;
	    -webkit-align-items:center;
	    justify-content: center;
	    -webkit-justify-content: center;
	}
	.clearfix:after {
	    content: "";
	    display: block;
	    visibility: hidden;
	    height: 0;
	    clear: both;
	}
	
	.clearfix {
	    zoom: 1;
	}
	image{
	  padding: 0;
	  margin: 0;
	}
	textarea {
	  width:300rpx;
	  height:75rpx;
	  display:block;
	  position:relative;
	 font-size: 30rpx;
	}
	button::after{ border: none; }
	input:-ms-input-placeholder {
	    color: #808080;
	}
	car-list{
	    width: 100%;
	}
</style>
