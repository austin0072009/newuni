<template>
	<view>
		<view class="edgeInsetTop"></view>
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow" @tap="$wanlshop.auth(`/pages/user/auth/validcode?event=resetpwd&mobile=${user.mobile}`)">
				<view class="content">
					<text>{{$t('setting.btn9')}}</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="noMobile">
				<view class="content">
					<text>{{$t('setting.btn10')}}</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="noPay">
				<view class="content">
					<text>{{$t('setting.btn11')}}</text>
				</view>
			</view>
		</view>
		
		<!-- <view class="cu-list menu sm-border">
			<view class="cu-item arrow">
				<view class="content">
					<text>安全中心</text>
				</view>
			</view>
		</view> -->
		
		<view class="cu-list menu sm-border" @tap="noUser">
			<view class="cu-item arrow">
				<view class="content">
					<text>{{$t('setting.btn12')}}</text>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import { mapState} from 'vuex';
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('setting.btn2')
			})
		},
		computed: {
			...mapState(['user'])
		},
		methods: {
			noPay(){
				this.$wanlshop.msg(this.$t('setting.msg13'))
			},
			noUser(){
				this.$wanlshop.msg(this.$t('setting.msg14'))
			},
			noMobile(){
				this.$wanlshop.msg(this.$t('setting.msg15'))
			}
		}
	}
</script>

<style>
	
</style>
