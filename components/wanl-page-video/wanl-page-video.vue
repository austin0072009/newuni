<template>
	<view class="wanlpage-video" :style="[pageData.style]">
		<video :poster="$wanlshop.oss(pageData.data[0].image, 414, 0, 1, 'transparent', 'png')" :src="$wanlshop.oss(pageData.data[0].video)" object-fit="cover"></video>
	</view>
</template>
<script>
	export default {
		name: "WanlPageVideo",
		props: {
			pageData: {
				type: Object,
				default: function() {
					return {
						name: '视频组件',
						type: 'video',
						params: [],
						style: [],
						data: []
					}
				}
			}
		}
	}
</script>
<style>
	.wanlpage-video{
		overflow: hidden;
	}
	.wanlpage-video video{
		width: 100%;
		height: 136px;
	}
</style>
