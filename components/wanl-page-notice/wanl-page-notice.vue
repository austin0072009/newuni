<template>
	<view class="wanlpage-notice" :style="[pageData.style]" v-if="pageData.params.show">
		<view @tap="$wanlshop.on(pageData.data[0].link)">
			<image src="../../static/images/announcement.png" style="width: 56rpx;height: 56rpx;"></image>
			<text>{{pageData.data[0].content}}</text>
		</view>
	</view>
</template>
<script>
	export default {
		name: "WanlPageNotice",
		props: {
			pageData: {
				type: Object,
				default: function() {
					return {
						name: '公告栏',
						type: 'notice',
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
	.wanlpage-notice {
		width: 100%;
		height: 48px;
		background: #fff;
		border-radius: 9px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
