<template>
	<view :style="{padding:'0 '+conf.padding+'rpx',height:conf.height+'rpx'}" class="view-scroll">
		<view class="scroll-view" scroll-with-animation :scroll-x="!adaptation" :scroll-into-view="'sv_'+currAct"
		 :style="{height:(conf.height)+'rpx'}">
			<view :class="adaptation?'adaptation':''" id="adapta">
				<view :id="'sv_'+item[setField.id]" @click="select(i)" v-for="(item,i) of tabList" :key="i" class="view-content"
				 :style="{'font-size':conf.size+'rpx',color:conf.color,'margin-right':adaptation?0:conf.spacing+'rpx',height:conf.height+'rpx','line-height':conf.height+'rpx'}">
					<label :id="'txt_'+item[setField.id]" class="txt" :style="{color:currAct===item[setField.id]?(conf.actColor):(conf.color),'font-size':(currAct===item[setField.id]?conf.actSize+'rpx':conf.size+'rpx'),'font-weight':(currAct===item.id?conf.actWeight:'initial')}">{{item[setField.name]}}</label>
				</view>
				<text  v-if="actType =='triangle'" :style="{color:conf.actColor,left:moves+'px',top:((conf.height)-20)+'rpx'}" class="iconfont icon_act">&#xe6b5;</text>
				<text v-if="actType =='underline'" :style="{width:lineWidth+'px',left:moves+'px',top:(conf.height-conf.height1)+'rpx'}"
				
				 class="underline"></text>
				 <!-- background:conf.background, -->
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: 'tab',
		props: {
			config: {
				type: Object,
				default: () => {
					return {}
				}
			},
			value: {
				type: Array,
				default: () => {
					return []
				}
			},
			actValue: {
				type: Number,
				default: 0
			},
			setField: { //设置字段
				type: Object,
				default: () => {
					return {
						id: 'id',
						name: 'name'
					}
				}
			},
			adaptation: { //是否自适应显示
				type: Boolean,
				default: true
			},
			actType: {
				type: String,
				default: 'underline' //选中类型： triangle (三角形)| underline (下划线)
			}
		},
		data() {
			return {
				conf: {
					height: 80,
					height1: 4,
					
					padding: 0,
					size: 38,
					color: '#333333',
					actColor: '#1D5397',
					actSize:34,
					spacing: 60,
					position: 0,
					actWeight: '100',
					background: '#7094AE'
				},
				currAct: null,
				moves: 0,
				lineWidth: 0,
				tabList: [],
				screenWidth: null,
				isClick: null,
			}
		},
		created() {
			const that = this;
			uni.getSystemInfo({
				success: (res) => {
					that.screenWidth = res.screenWidth;
				}
			});
			this.init();
		},
		watch: {
			actValue(n, o) {
				if (this.value.length) {
					this.currAct = this.value[n][this.setField.id];
					if (!this.isClick) {
						this.emit(n);
						this.operate(n);
					}
					this.isClick = false;
				}
			},
			value() {
				this.init();
			}
		},
		methods: {
			init() {
				const that = this;
				//数据初始化
				if (this.value.length) {
					this.tabList = JSON.parse(JSON.stringify(this.value));
					this.conf = Object.assign(this.conf, this.config);
					this.currAct = this.value[this.actValue][this.setField.id];
					this.$nextTick(function() {
						that.setLineWidth();
					})
				}
			},
			select(i) {
				this.emit(i,'no');
				this.operate(i);
				this.isClick = true;
			},
			operate(curr) {
				curr = Number(curr);
				let item = this.tabList[curr];
				if (this.actType === "underline") {
					this.lineWidth = item[this.setField.name].length*(this.conf.actSize/2) || 0;
					this.lineWidth -= this.conf.position * 2;
				}
				let sizeGap = (this.conf.actSize-this.conf.size)*2;
				if (curr > 0) {
					this.deal(curr,sizeGap);
				} else {
					//第一个位置
					this.moves = this.conf.position
				}
			},
			deal(index,sizeGap) {
				let leng = 0;
				
				for (let i = 0; i < index; i++) {
					
					leng += this.tabList[i].width+uni.upx2px(this.conf.spacing)
					
				}
				this.moves = leng + this.conf.position-sizeGap;
				
			},

			emit(i,val) {
				let e = this.value[i];
				this.currAct = e[this.setField.id];
				e.index = i;
				if(val){
					e.bool=true
				}
				this.$emit("changeTab", e);
			},
			setLineWidth() {
				const that = this;
				let w = null;
				this.tabList.map((item, index) => {
					let obj = uni.createSelectorQuery().in(this).select("#txt_" + item[this.setField.id]);
					obj.boundingClientRect(function(data) { //data - 各种参数
						if (data) {
							item.width = data.width;
							w += data.width;
							if (index == that.tabList.length - 1) {
								if (that.adaptation) {
									if (w >= that.screenWidth) {
										that.conf.spacing = 0;
									} else {
										let space = that.screenWidth - that.conf.padding - w;
										that.conf.spacing = Number(space / index) * 2;
									}
								}
								that.operate(that.actValue);
							}
						}
					}).exec();
				});
			}
		}
	}
</script>

<style scoped >
	
	.scroll-view {
		position: fixed;
			
		width: 100%;
		white-space: nowrap;
		/* margin-left: 1.25rem; */
		transition: all .5s;
		position: -webkit-sticky;
		position: sticky;
			 top: var(--window-top);
			  z-index: 99;
		/* overflow-x: scroll; */
		
	}

	.scroll-view>view {
	
	/* #adapta{ */
		height: 100%;
		display: flex;
		justify-content: space-around;
	}

	.view-content {	
		
		display: inline-block;
		
	}

	.txt {
		transition: color .3s;
	}

	.view-content>text {

		position: absolute;
		bottom: -10rpx;
		left: 15%;
		font-size: 28rpx;
		color: white;
	}

	.icon_act {
		position: absolute;
		font-size: 28rpx;
		color: white;
		transition: all .4s;
	}

	.underline {
		position: absolute;
		bottom: 0;
		/* height: 86rpx; */
		transition: all .4s;
	}

	.adaptation {
		
		display: flex;
		justify-content: space-between;
	}
</style>
