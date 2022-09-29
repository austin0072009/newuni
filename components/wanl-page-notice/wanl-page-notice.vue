<template>
	<view class="wanlpage-notice">
		<!-- :style="[pageData.style]" v-if="pageData.params.show"> -->
		<!-- 		<view @tap="$wanlshop.on(pageData.data[0].link)">
			<image src="../../static/images/announcement.png" style="width: 56rpx;height: 56rpx;"></image>
			<text>{{pageData.data[0].content}}</text>
		</view> -->
		<view style="    width: 50px;
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;">
			<image src="../../static/images/announcement.png" style="width: 30px;height: 30px; "></image>
		</view>
		<view style="    width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;">
			<view style="    width: 100%;
			display: flex;
			align-items: center;">
				<view style="    background: linear-gradient(90deg,red,#b91084);
						color: #fff;
						font-size: 11px;
						padding: 1px 5px;
						border-radius: 5px;
						flex-shrink: 0;">
					Hot item
				</view>
				<view style="    width: 200px;
						font-size: 12px;
						margin-left: 5px;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						word-break: break-all;">
					Shopee
				</view>

			</view>

		</view>
		<view>
			<image src="../../static/images/logo2.png" style="width: 50px; height: 50px;"></image>
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
