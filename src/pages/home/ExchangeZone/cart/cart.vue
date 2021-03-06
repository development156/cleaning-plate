<template>
	<view class="container">
		<!-- 	从购物车列表接口获取所有的商品 -->


		<sideslip-car ref="mycar" @selAllBtn="selAllBtn" @delBtn="delBtn" @touchEv="touchEv" class="sideslip-car" @selThis="selThis"
		 @jsBtn="jsBtn" @changeNum="changeNum" :carts="carts"></sideslip-car>
	</view>
</template>

<script>
	import {
		CartList
	} from '../../../../models/exchangezone/cart/cartList.js'
	const cartList = new CartList()
	import sideslipCar from '@/components/common/sideslip-car/sideslip-car.vue'
	import {
		exchangeCredit
	} from '@/models/exchangezone/creditsExchange/exchangeCredit'
	const Exchange = new exchangeCredit()
	export default {
		components: {
			sideslipCar
		},
		data() {
			return {
				carts: [
					// {
					// 	id: 236,
					// 	gid: 47,
					// 	name: "毛巾（厚）",
					// 	img: "https://xthotel.palmbly.com/uploads/images/20201020/fb54b8d699c646908fde0af12def5a5b.png",
					// 	gsId: 72,
					// 	spec_key_name: "尺寸:M 颜色:黑色",
					// 	spec: [{name: "尺寸", value: "M"}, {name: "颜色", value: "黑色"}],
					// 	price: 19,
					// 	number: 1,
					// 	stock: 193,
					// 	isTouchMove:false,
					// 	selected:true,
					// },
					// {

					// 	id: 237,
					// 	gid: 45,
					// 	name: "盆栽",
					// 	img: "https://xthotel.palmbly.com/uploads/images/20201020/741ff4736f32e9bde91b30f04aff86e5.png",
					// 	gsId: 65,
					// 	spec_key_name: "件装:1件居家必备:枕头",
					// 	spec: [{name: "件装", value: "1件"}, {name: "居家必备", value: "枕头"}],
					// 	price: 6001,
					// 	number: 1,
					// 	stock: 77,
					// 	selected:true,
					// 	isTouchMove:false,

					// }
				], // 购物车列表
				// 临时设置的学号
				studentID: 1,
				idList: []



			}
		},
		onLoad() {
			this.getCartList()

		},

		methods: {
			jsBtn: function(idArr, numArr) {
				console.log(idArr)
				console.log(numArr)
				let PIdList = []
				for (var i = 0; i < idArr.length; i++) {
					console.log(idArr[i])
					PIdList[i] = {
						number: numArr[i],
						pId: idArr[i]
					}

				}
				console.log(PIdList)
				// // 之后注册后在获取学号
				let studentId = 1

				// // 进行生成订单
				Exchange.pay(studentId, PIdList).then(res => {
					console.log(res)
					uni.showToast({
						title: res.msg,
						icon: "none"
					})
					if (res.code == 200) {
						uni.navigateTo({
							url: `../acquireExchange/payAcquireExchange?item=` + encodeURIComponent(JSON.stringify(res.data))
						})
					}

				}).catch(error => {
					uni.showToast({
						title: "提交订单失败",
						icon: "none"
					});
				})
			},
			changeNum: function(carts, id, type) {
				console.log(type)
				this.carts = carts;
				this.$refs.mycar.getTotalPrice();
				cartList.changeNum(id, type).then(res => {
					console.log(res)
				})
			},
			selThis: function(carts) {
				this.carts = carts;
				this.$refs.mycar.getTotalPrice();
			},
			selAllBtn: function(carts) {
				this.carts = carts;
				this.$refs.mycar.getTotalPrice();
			},
			touchEv: function(carts) {
				this.carts = carts;
			},
			delBtn: function(carts, ids, index) {

				carts.splice(index, 1);
				this.carts = carts;
				this.$refs.mycar.getTotalPrice();
				this.idList = ids
				console.log(this.idList)
				cartList.delCartList(this.idList).then(res => {
					uni.showToast({
						title: "删除成功",
						icon: "none"
					});
				})


			},
			// 获取购物车列表
			getCartList() {
				cartList.getCartList(this.studentID).then(res => {
					console.log(res.data)
					this.carts = res.data
					for (var i = 0; i < this.carts.length; i++) {
						this.carts[i].selected = false
						this.carts[i].isTouchMove = false
					}
					console.log(this.carts)
				})
			},


		}
	}
</script>

<style lang="scss">



</style>
