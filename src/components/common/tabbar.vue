<template>
    <view class="uni-tabbar">
		
        <view class="uni-tabbar__item" v-for="(item,index) in tabbar" :key="index" @tap="changeTab(item)">
            <view class="icon" :class="[item.fontIcon , item.pagePath == pagePath?'uni-active':'']"></view>
            <!-- 上面使用的是字体图标，解决切换页面的时候图标会闪的效果，毕竟每切换一个页面都会闪一下不太好看，可以切换使用下面的图片方式 -->
            <view v-if="false" class="uni-tabbar__bd">
                <view class="uni-tabbar__icon">
					
                    <image v-if="item.pagePath == pagePath" class="uni-w-42 uni-h-42" mode="aspectFit" :src="item.iconPath"></image>
                    <image v-else class="uni-w-42 uni-h-42" mode="aspectFit" :src="item.iconPath"></image>
                </view>
				
            </view>
            <view class="uni-tabbar__label" :class="{'active': item.pagePath == pagePath}">
                {{item.text}}
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            pagePath: ''
        },
        data() {
            return {
                page: 'contact',
                showPage: false,
                containerHeight: 400,
                tabbar: [
                    {
                        "pagePath": "Upload/index",
                        "iconPath": "/static/images/tabbar/upload",
                        "selectedIconPath": "/static/tabBar/home_col.png",
                        "text": "上传",
                        "fontIcon": "icon-web-icon-"
                    },
　　　　　　　　　　　　// 这里是要动态切换的栏目，先隐藏，动态追加
                    // {
                    //     "pagePath": "/pages/tabBar/manage/manage",
                    //     "iconPath": "/static/tabBar/home.png",
                    //     "selectedIconPath": "/static/tabBar/home_col.png",
                    //     "text": "管理",
                    //     "fontIcon": "icon-guanli"
                    // },
                    {
                        "pagePath": "Feedback/feedback",
                        "iconPath": "/static/images/tabbar/feedback",
                        "selectedIconPath": "/static/tabBar/person_col.png",
                        "text": "反馈信息",
                        "fontIcon": "icon-tuya-"
                    },
					{
					    "pagePath": "OrderManage/index",
					    "iconPath": "/static/images/tabbar/ordermanage",
					    "selectedIconPath": "/static/tabBar/person_col.png",
					    "text": "订单管理",
					    "fontIcon": "icon-dingdanguanli"
					},
					{
						"pagePath": "",
						"iconPath": "/static/images/tabbar/addscore",
						"selectedIconPath": "/static/tabBar/person_col.png",
						"text": "加分",
						"fontIcon": "icon-tianjiafenzu"
					}
                ]
            };
        },
        mounted() {
            // true为判断条件，根据实际的需求替换即可
            // if(false) {
            //     this.tabbar.splice(1,0,
            //         {
            //             "pagePath": "/pages/tabBar/manage/manage",
            //             "iconPath": "/static/tabBar/home.png",
            //             "selectedIconPath": "/static/tabBar/home_col.png",
            //             "text": "管理",
            //             "fontIcon": "icon-guanli"
            //         }
            //     )
            // }
        },
        methods: {
            changeTab(item) {
				console.log(item.pagePath)
                this.page = item.pagePath;
　　　　　　　　　　// 这里使用reLaunch关闭所有的页面，打开新的栏目页面	
				uni.reLaunch({
				    url: '/pages/admin/'+ this.page ,
					success: res => {},fail: (e) => {
								console.log(e)
							},complete: () => {}
				});
            },
        }
    }
</script>

<style lang="scss" scoped>

    [nvue] uni-scroll-view, [nvue] uni-swiper-item, [nvue] uni-view {
        flex-direction: unset;
    }
    [nvue-dir-column] uni-swiper-item, [nvue-dir-column] uni-view {
        flex-direction: unset;
    }
	
    .uni-tabbar {
        position: fixed;
		left: 0;
        bottom: 0;
        z-index: 999;
        width: 100%;
        display: flex;
        justify-content: space-around;
        height: 112rpx;
        padding: 16upx 0;
        box-sizing: border-box;
        border-top: solid 1upx #ccc;
        background-color: #fff;
        box-shadow: 0px 0px 17upx 1upx rgba(206, 206, 206, 0.32);
        .uni-tabbar__item {
            display: block;
            line-height: 24upx;
            font-size: 20upx;
            text-align: center;
			
        }
        .uni-tabbar__icon {
            height: 42upx;
            line-height: 42upx;
            text-align: center;
		
        }
		.uni-active{
			color: #000000;
			box-shadow: 4rpx 2rpx 10rpx #888888;
		}
        .icon {
            display: inline-block;
        }
        .uni-tabbar__label {
            line-height: 39upx;
            font-size: 24upx;
            color: #999;
            &.active {
                // color: #1ca6ec;
				color: #000000;
				font-size: 27upx;
            }
        }
    }
	</style>