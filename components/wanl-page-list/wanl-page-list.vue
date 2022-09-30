<template>
	<view class="list-mode">
		<view class="item_mode">
			<view>
				<image src="../../static/images/merchant.png" style="width: 48px;height: 38px;"></image>
			</view>
			<text>
				{{ $t('index.merchant') }}
			</text>
		</view>
		<view class="item_mode" @tap="$wanlshop.auth('/pages/user/service')">
			<view>
				<image src="../../static/images/cs.png" style="width: 48px;height: 38px;"></image>
			</view>
			<text>
				{{ $t('index.cs') }}
			</text>
		</view>
		<view class="item_mode" @tap="$wanlshop.auth('/pages/article/help')">
			<view>
				<image src="../../static/images/help.png" style="width: 48px;height: 38px;"></image>
			</view>
			<text>
				{{ $t('index.help') }}
			</text>
		</view>
		<view class="item_mode" @tap="$wanlshop.auth('/pages/article/about')">
			<view>
				<image src="../../static/images/about.png" style="width: 48px;height: 38px;"></image>
			</view>
			<text>
				{{ $t('index.about') }}
			</text>
		</view>
	</view>
</template>
<script>
	export default {
		name: "WanlPageList",
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
	.list-mode {
		width: 100%;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}
	.item_mode {
		text-align: center;
		width: 20%;
	}
	.item_mode uni-view {
		width: 76rpx;
		height: 76rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		margin: 0 auto;
	}
	.item_mode uni-text {
	    display: block;
	    height: 48rpx;
	    margin-top: 14rpx;
		line-height: 1;
	}
</style>
