<template>
	<view>
		 
		        <view class="content">
		            <view v-if="current === 0">
		                <DataPresenceWeek></DataPresenceWeek>
						<all-ort-data ></all-ort-data>
		            </view>
		        </view>
		
	</view>
</template>

<script>
	import DataPresence from './DataPresence.vue'
	import DataPresenceWeek from './DataPresenceWeek.vue'
	import uniSegmentedControl from "@/components/common/uni-segmented-control.vue"
	import allOrtData from '../../admin/Upload/UploadOrt/allOrtData.vue'
	export default {
	
		 data() {
		        return {
		            items: ['剩菜量','上传率'],
		            current: 0,
					show:false
		        }
		    },
		components:{
			    DataPresence,
				DataPresenceWeek,
				uniSegmentedControl,
				allOrtData 
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
