<template>
  <div class="hm-cover-card" :class="index?'active':''">
    <div class="box">
      <div class="body"><image class="entryPic" :src="options.entryPic" mode="widthFix"/></div>
      <div class="ft">
        <div class="wrap">
          <text class="title" >{{ options.text }}</text>
        </div>
       
      </div>
	  <text class="text" v-if="options.title">- {{ options.title }} -</text>
	 
    </div>
          
  </div>
</template>
<script>
export default {
  name: 'HmCoverCard',
  props: {
    dataId: {
      type: String,
      default: 'hm-cover-card'
    },
	inits: {
	  type: Boolean,
	  default: false
	},
	index:{
		type: Boolean,
		default: false
	},
	idx:{
		type: Number,
		default: 0
	},
    options: {
      type: Object,
      default: function() {
        return {
          entryPic:
            './images/img_25361_0_1.png',
          title: 'loading...',
          text: 'loading...',
          shoucang:
            './images/img_25361_0_0.png'
        };
      }
    }
  },
 
};
</script>
<style>
@import './index.response.css';
</style>
