<template>
	<view>
		    <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#4cd964"></uni-segmented-control>
		        <view class="content">
		            <view v-if="current === 0">
		                <DataPresenceWeek></DataPresenceWeek>
		            </view>
		            <view v-if="current === 1">
		                <DataPresence></DataPresence>
		            </view>
		          
		        </view>
		
		
		
	</view>
</template>

<script>
	import DataPresence from './DataPresence.vue'
	import DataPresenceWeek from './DataPresenceWeek.vue'
	import uniSegmentedControl from "@/components/common/uni-segmented-control.vue"

	export default {
	
		 data() {
		        return {
		            items: ['选项卡1','选项卡2'],
		            current: 0
		        }
		    },
		components:{
			    DataPresence,
				DataPresenceWeek,
				uniSegmentedControl
			},
		  methods: {
		        onClickItem(e) {
		            if (this.current !== e.currentIndex) {
		                this.current = e.currentIndex;
		            }
		        }
		    }
	}
</script>

<style>
</style>
