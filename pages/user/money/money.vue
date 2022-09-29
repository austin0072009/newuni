<template>
	<view class="wanl-money">
		<view class="bg-orange padding-bj">
			<text class="title">{{$t('money.balance')}}</text>
			<view class="margin-top margin-bottom-xs">
				<text class="text-sl">{{user.money}}</text>
			</view>
		</view>
		<!-- 功能 -->
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow" @tap="$wanlshop.to('/pages/user/money/recharge')">
				<view class="content">
					<text class="wlIcon-chongzhichenggong text-blue"></text>
					<text>{{$t('money.top_up')}}</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="$wanlshop.to('/pages/user/money/withdraw')">
				<view class="content">
					<text class="wlIcon-tixianjilu text-orange"></text>
					<text>{{$t('money.withdrawal')}}</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow" @tap="$wanlshop.to('/pages/user/bank/bank')">
				<view class="content">
					<text class="wlIcon-yinhangka text-blue"></text>
					<text>{{$t('money.account')}}</text>
				</view>
				<view class="action">
					<text class="text-sm wanl-gray">{{$t('money.for_withdrawal_to_a_third_party_account')}}</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="$wanlshop.to('/pages/user/money/list')">
				<view class="content">
					<text class="wlIcon-yue1 text-orange"></text>
					<text>{{$t('money.billing_details')}}</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="$wanlshop.to('/pages/user/money/witlist')">
				<view class="content">
					<text class="wlIcon-jinbitixian text-orange"></text>
					<text>{{$t('money.withdrawal_log')}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			
		};
	},
	computed: {
		...mapState(['user'])
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title:this.$t('money.title')
		})
		this.loadData();
	},
	methods: {
		async loadData() {
			this.$api.post({
				url: '/wanlshop/pay/getBalance',
				success: res => {
					this.$store.commit('user/setUserInfo', {money: res});
				}
			});
		}
	}
};
</script>

<style>
.wanl-money .title{
	color: rgba(255, 255, 255, .7);
}
</style>
