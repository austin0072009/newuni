<template>
	<view>
		<view class="auth">
			<view class="wanl-title">{{$t('login.msg21')}}</view>
			<form @submit="formSubmit">
				<view class="avatar">
					<image :src="$wanlshop.oss(userInfo.avatarUrl, 50, 50)" mode="aspectFit"></image>
				</view>
				<view class="auth-group radius-bock bg-gray wlian-grey-light">
					<input :placeholder="$t('setting.msg6')" confirm-type="next" placeholder-class="placeholder" name="nickName"
						v-model="userInfo.nickName"></input>
				</view>
				<view class="auth-button flex flex-direction">
					<button class="cu-btn bg-orange sl radius-bock" formType="submit">{{$t('login.msg22')}}</button>
				</view>
			</form>
		</view>
		<uni-popup ref="authPopup">
			<view class="wanl-auth-popup bg-white radius-bock text-center">
				<view class="avatar">
					<image :src="$wanlshop.appstc('/common/logo.png')" mode="aspectFill"></image>
				</view>
				<view class="margin-tb-lg text-sm wanl-gray">
					{{$t('login.msg23')}}
				</view>
				<!-- 1.0.7 升级 -->
				<button v-if="canIUseGetUserProfile" type="primary" class="cu-btn sl radius-bock bg-no margin-bottom"
					@tap="getUserProfile">{{$t('login.msg24')}}</button>
				<button v-else type="primary" class="cu-btn sl radius-bock bg-no margin-bottom" open-type="getUserInfo"
					@tap="getUserInfo">{{$t('login.msg25')}}</button>
				<button class="cu-btn sl radius-bock" @tap="refuseUserInfo">{{$t('login.msg26')}}</button>
			</view>
		</uni-popup>

	</view>
</template>
<script>
	import graceChecker from '@/common/graceChecker';
	export default {
		data() {
			return {
				userInfo: {
					avatarUrl: '',
					nickName: null,
					gender: 0
				},
				pageroute: '',
				provider: null,
				timer: null,
				third_id: 0,
				canIUseGetUserProfile: false // 1.0.7 升级
			};
		},
		onLoad(option) {
			this.pageroute = option.url;
			this.third_id = option.third_id;
			if (option.platform == 'mp_weixin' || option.platform == 'app_weixin') {
				this.provider = 'weixin'
			} else if (option.platform == 'mp_qq' || option.platform == 'app_qq') {
				this.provider = 'qq'
			} else if (option.platform == 'app_weibo') {
				this.provider = 'sinaweibo'
			} else if (option.platform == 'app_xiaomi') {
				this.provider = 'xiaomi'
			} else if (option.platform == 'apple') {
				this.provider = 'apple'
			}
			// 1.0.7 升级
			if (uni.getUserProfile) {
				this.canIUseGetUserProfile = true
			} else {
				this.getUserInfo()
			}
			// 获取用户信息
			// #ifdef MP-WEIXIN || MP-QQ
			setTimeout(() => {
				// 获取用户信息
				if (!this.userInfo.nickName) {
					this.$refs.authPopup.open();
				} else {
					// 获取手机号avatarUrl  gender nickName
					// 后续版本升级
				}
			}, 100);
			// #endif
		},
		onUnload() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		methods: {
			getUserInfo() {
				uni.showLoading({
					title: this.$t('login.msg27')
				});
				this.$refs.authPopup.close();
				if (this.timer) {
					clearInterval(this.timer);
				} else {
					// 1.0.7 升级
					this.timer = setInterval(() => {
						this.setUserInfo();
					}, 1000);
				}
			},
			// 1.0.7 升级
			getUserProfile() {
				uni.showLoading({
					title: this.$t('login.msg27')
				});
				this.$refs.authPopup.close();
				uni.getUserProfile({
					desc: this.$t('login.msg28'),
					success: (infoRes) => {
						this.userInfo = infoRes.userInfo;
						uni.hideLoading();
					}
				})
			},
			// 获取用户信息
			setUserInfo() {
				uni.getUserInfo({
					provider: this.provider,
					success: (infoRes) => {
						this.userInfo = infoRes.userInfo;
						uni.hideLoading();
					}
				});
				// 如果存在，终止进程
				if (this.userInfo.nickName) {
					if (this.timer) {
						clearInterval(this.timer);
						this.timer = null;
					}
				}
			},
			formSubmit(e) {
				//定义表单规则
				let rule = [{
					name: 'nickName',
					checkType: 'string',
					checkRule: "1,20",
					errorMsg: this.$t('login.msg29')
				}];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					this.$api.post({
						url: '/wanlshop/user/perfect',
						data: {
							third_id: this.third_id,
							avatarUrl: this.userInfo.avatarUrl,
							nickName: this.userInfo.nickName,
							gender: this.userInfo.gender
						},
						success: res => {
							this.$store.dispatch('user/login', res);
							this.$store.dispatch('cart/login');
							this.$store.dispatch('chat/get');
							uni.reLaunch({
								url: decodeURIComponent(this.pageroute)
							});
						}
					});
				} else {
					this.$wanlshop.msg(this.$t('login.msg30'));
				}
			},
			refuseUserInfo() {
				this.$wanlshop.back(1);
			},
		}
	};
</script>

<style>
	@import url("auth.css");

	.avatar {
		display: flex;
		justify-content: center;
		flex: 1;
		margin-bottom: 80rpx;
	}

	.avatar image {
		border-radius: 9999px;
		overflow: hidden;
		height: 200rpx;
		width: 200rpx;
	}

	.wanl-auth-popup {
		position: fixed;
		right: 60rpx;
		left: 60rpx;
		top: 100rpx;
		bottom: 200rpx;
		padding: 50rpx;
	}

	.wanl-auth-popup .avatar {
		margin-top: 80rpx;
		margin-bottom: 100rpx;
	}

	.wanl-auth-popup .cu-btn {
		height: 90rpx;
		width: 100%;
	}
</style>
