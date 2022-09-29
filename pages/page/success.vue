<template>
	<view class="wanl-success">
		<!-- 导航条 -->
		<view class="cu-custom" :style="{ height: $wanlshop.wanlsys().height + 'px' }">
			<view
				class="cu-bar bg-bgcolor fixed"
				:style="{
					height: $wanlshop.wanlsys().height + 'px',
					paddingTop: $wanlshop.wanlsys().top + 'px'
				}"
			>
				<view class="action" @tap="onBackUser"><text class="wlIcon-fanhui1"></text></view>
				<view class="content" :style="{ top: $wanlshop.wanlsys().top + 'px' }">
					<text>{{ title }}{{$t('gg.msg1')}}</text>
				</view>
			</view>
		</view>

		<view class="content">
			<text class="icon wlIcon-pintuantuangouchenggong"></text>
			<text class="text-lg margin-tb">{{ title }}{{$t('gg.msg2')}}</text>
			<view class="button padding-xl margin-top-lg">
				<button
					class="cu-btn block wanl-bg-orange margin-tb-sm lg"
					v-if="type == 'comment'"
					@tap="$wanlshop.to('/pages/user/comment/comment')"
				>
					{{$t('gg.btn1')}}
				</button>
				<button
					v-if="type == 'pay'"
					class="cu-btn block wanl-bg-orange margin-tb-sm lg"
					@tap="$wanlshop.on('/pages/user')"
				>
					{{$t('gg.btn2')}}
				</button>
				<button
					class="cu-btn block wanl-bg-orange margin-tb-sm lg"
					v-if="type == 'feedback'"
					@tap="$wanlshop.to('/pages/user/feedback/lists')"
				>
					{{$t('gg.btn3')}}
				</button>
				<button
					class="cu-btn block wanl-bg-orange margin-tb-sm lg"
					v-if="type == 'complaint'"
					@tap="$wanlshop.to('/pages/user/complaint/lists')"
				>
					{{$t('gg.btn4')}}
				</button>
				<button
					class="cu-btn block wanl-bg-orange margin-tb-sm lg"
					v-if="type == 'withdraw'"
					@tap="$wanlshop.to('/pages/user/money/witlist')"
				>
					{{$t('gg.btn5')}}
				</button>
				<button
					class="cu-btn block bg-red margin-tb-sm lg"
					v-if="type == 'find'"
					@tap="$wanlshop.to('/pages/apps/find/user')"
				>
					{{$t('gg.btn6')}}
				</button>
				<button
					class="cu-btn block wanl-bg-orange margin-tb-sm lg"
					v-if="type == 'recharge'"
					@tap="$wanlshop.to('/pages/user/money/money')"
				>
					{{$t('gg.btn7')}}
				</button>
				<button class="cu-btn block line-gray margin-tb-sm lg" @tap="onIndex">
					{{$t('gg.btn8')}}
				</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			type: '',
			title: ''
		};
	},
	onLoad(options) {
		if (options.type == 'pay') {
			this.title = this.$t('gg.msg3');
		} else if (options.type == 'comment') {
			this.title = this.$t('gg.msg4');
		} else if (options.type == 'feedback') {
			this.title = this.$t('gg.msg5');
		} else if (options.type == 'withdraw') {
			this.title = this.$t('gg.msg6');
		} else if (options.type == 'recharge') {
			this.title = this.$t('gg.msg7');
		} else if (options.type == 'complaint') {
			this.title = this.$t('gg.msg8');
		} else if (options.type == 'find') {
			this.title = this.$t('gg.msg9');
		}
		this.type = options.type;
	},
	methods: {
		onIndex() {
			uni.setTabBarStyle({
				backgroundColor: '#ffffff',
				borderStyle: 'white'
			});
			uni.switchTab({
				url: '/pages/index'
			});
		},
		onBackUser() {
			uni.setTabBarStyle({
				backgroundColor: '#ffffff',
				borderStyle: 'white'
			});
			uni.switchTab({
				url: '/pages/user'
			});
		}
	}
};
</script>

<style>
.wanl-success .content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.wanl-success .content .icon {
	font-size: 180rpx;
	color: #3aa112;
	margin-top: 150rpx;
}
.wanl-success .content .button {
	width: 100%;
}
</style>
