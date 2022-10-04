<template>
	<view>
		<!-- 收银台 -->
		<view class="edgeInsetTop"></view>
		<view class="wanl-pay">
			<view class="money bg-white">
				<text class="title">{{$t('money.top_up_amount')}}</text>
				<view class="margin-top price">
					<view class="symbol">
						<text>$</text>
					</view>
					<input type="digit" maxlength="5" focus v-model="money"/>
					<view class="text-lg wanl-gray-light" @tap="emptyInput" v-if="money">
						<text class="wlIcon-shibai"></text>
					</view>
				</view>
			</view>
		<!-- 	<view class="list-box">
				<view class="item" v-for="(item, index) in payList" :key="index">
					<text :class="'wlIcon-'+ item.type +'-pay'"></text>
					<view class="action">
						<text class="title wanl-pip">{{item.name}}</text>
						<view>{{item.describe}}</view>
					</view>
					<view class="radio text-xxl" v-if="item.state" @tap="onSelect(index)">
						<text v-if="item.select" class="wlIcon-xuanze-danxuan wanl-orange"></text>
						<text v-else class="wlIcon-xuanze wanl-gray-light"></text>
					</view>
					<view class="radio text-xxl" v-else>
						<text class="wlIcon-xuanze-danxuan wanl-gray-light"></text>
					</view>
				</view>
			</view> -->
			<button class="mix-btn wanl-bg-redorange" @tap="confirm()" :loading="loading"> {{$t('money.top_up')}}</button>
			<view class="footer text-center">
				<view> © {{$t('money.thousands_of_union_pay')}} </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				disabled: false,
				money: null,
				payList: []
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('money.recharge_title')
			})
			uni.setNavigationBarColor({
			    frontColor: '#ffffff',
			    backgroundColor: 'rgb(250, 67, 106)',
			    animation: {
			        duration: 400,
			        timingFunc: 'easeIn'
			    }
			})
			// 支付列表
			let method = 'wap';
			// #ifdef APP-PLUS
			method = 'app';
			// #endif
			// #ifdef MP-BAIDU
			method = 'mini';
			// #endif
			// #ifdef MP-WEIXIN
			method = 'miniapp';
			// #endif
			// #ifdef MP-ALIPAY
			method = 'mini';
			// #endif
			// #ifdef MP-QQ
			method = 'mini';
			// #endif
			
			// #ifdef H5
			if(this.$jssdk.isWechat()){
				this.payList.push({
					name: this.$t('money.oa_pay'),
					describe: this.$t('money.oa_pay_text'),
					type: 'wechat',
					method: 'mp',
					state: true,
					select: this.isbalance ? false : true
				});
			}else{
				this.payList.push({
					name: this.$t('money.ail_pay'),
					describe: '',
					type: 'alipay',
					method: method,
					state: true,
					select: false
				}, {
					name: this.$t('money.wechat_pay'),
					describe: this.$t('money.wechat_pay_text'),
					type: 'wechat',
					method: method,
					state: true,
					select: this.isbalance ? false : true
				});
			}
			// #endif
			
			// #ifndef H5
			uni.getProvider({
			    service: "payment",
			    success: (e) => {
			        e.provider.map((value) => {
						if (value == 'alipay') {
							this.payList.push({name: this.$t('money.ail_pay'),describe: '',type: value,method: method,state: true,select: false});
						}else if(value == 'wxpay'){
							this.payList.push({name: this.$t('money.wechat_pay'),describe: this.$t('money.wechat_pay_text'),type: 'wechat',method: method,state: true,select: false});
						}else if(value == 'baidu'){
							this.payList.push({name: this.$t('money.baidu_pay'),describe: '',type: value,method: method,state: true,select: false});
						}else if(value == 'appleiap'){
							this.payList.push({name: this.$t('money.apple_pay'),describe: '',type: 'apple',method: method,state: true,select: false});
						}
			        })
			    }
			});
			// #endif
		},
		methods: {
			//确认支付
			confirm() {
				let data = null;
				if (this.disabled) {
					return;
				}
				if(this.money <= 0){
					this.$wanlshop.msg(this.$t('money.msg1'));
					return;
				}
				this.payList.map((value,index,array) => {
				　　if(value.select){
						data = value;
					}else{
						return;
					}
				});
				// 判断支付是否存在
				if (!data) {
					this.$wanlshop.msg(this.$t('money.msg2'));
					return;
				}else{
					this.loading = true;
					this.disabled = true;
					// 获取小程序code
					// #ifdef MP
					uni.login({
					    success: (e) => {
							this.wanlPay(data, e.code);
					    },
					    fail: (e) => {
					        uni.showModal({
					            content: this.$t('money.msg3') + e.errMsg,
					            showCancel: false
					        })
					    }
					})
					// #endif
					// #ifndef MP
					this.wanlPay(data);
					// #endif
				}
			},
			async wanlPay(data, code = null){
				this.$api.post({
					url: '/wanlshop/pay/recharge',
					data: {
						type: data.type,
						method: data.method,
						code: code,
						money: this.money
					},
					success: res => {
						switch (data.type) {
						    case 'wechat':
								// 微信 H5支付
						        if(data.method == 'wap'){
						        	// 关闭loading
						        	this.loading = false;
						        	uni.showModal({
						        	    title: this.$t('money.wechat_pay'),
						        	    content: this.$t('money.msg4'),
										confirmText: this.$t('cart.determine'),
										cancelText:this.$t('cart.cancel'),
						        	    success: (res) => {
						        	        if (res.confirm) {
						        	            this.paySuccess();
						        	        } else if (res.cancel) {
						        	            console.log('用户点击取消');
						        	        }
						        	    }
						        	});
						        	// 异步查询是否支付成功
						        	window.location.href = res;
								// 微信 APP支付
								}else if(data.method == 'app'){
									uni.requestPayment({
									    provider: 'wxpay',
									    orderInfo: res,
									    success: (e) => {
									        this.paySuccess();
									    },
									    fail: (e) => {
									        uni.showModal({
									            content: this.$t('money.msg5') + e.errMsg,
									            showCancel: false
									        })
									    },
									    complete: () => {
											this.loading = false;
											this.disabled = false;
									    }
									})
								// 微信 小程序支付
						        }else if(data.method == 'miniapp'){
									uni.requestPayment({
									    appId: res.appId,
									    nonceStr: res.nonceStr,
									    package: res.package,
									    paySign: res.paySign,
										signType: res.signType,
										timeStamp: res.timeStamp,
									    success: (e) => {
									        this.paySuccess();
									    },
									    fail: (e) => {
									        uni.showModal({
									            content: this.$t('money.msg5') + e.errMsg,
									            showCancel: false
									        })
									    },
										complete: () => {
											this.loading = false;
											this.disabled = false;
										}
									})
								// 微信 公众平台支付
								}else if(data.method == 'mp'){
									this.$jssdk.wxpay({
										data: res,
										success: e => {
											this.paySuccess();
										},
										fail: err => {
											if (err.errMsg == "chooseWXPay:ok") {
												this.$wanlshop.msg(this.$t('money.msg6'));
											}else if (err.errMsg == "chooseWXPay:cancel") {
												this.$wanlshop.msg(this.$t('money.msg7'));
											}else if (err.errMsg == "chooseWXPay:fail") {
												this.$wanlshop.msg(this.$t('money.msg8'));
											}
										}
									})
								}
						        break;
						    case 'alipay':
						        if(data.method == 'wap'){
									// 关闭loading
									this.loading = false;
									document.write(res);
								}else if(data.method == 'app'){
									uni.requestPayment({
									    provider: 'alipay',
									    orderInfo: res,
									    success: (e) => {
									        this.paySuccess();
									    },
									    fail: (e) => {
									        uni.showModal({
									            content: this.$t('money.msg5') + e.errMsg,
									            showCancel: false
									        })
									    },
									    complete: () => {
											this.loading = false;
											this.disabled = false;
									    }
									})
								}
								break;
						} 
					}
				});
			},
			onSelect(key){
				this.payList.map((value,index,array) => {
				　　if(index == key){
						value.select = !value.select;
					}else{
						value.select = false;
					}
				});
			},
			emptyInput(){
				this.money = null;
			},
			// 支付成功
			paySuccess(){
				this.loading = false;
				this.$store.commit('user/setUserInfo', {
					money: this.$wanlshop.bcadd(this.$store.state.user.money, this.money)
				});
				this.$wanlshop.to('/pages/page/success?type=recharge');
			}
		}
	}
</script>

<style>
	radio-group {
	    display: block;
	}
	.wanl-pay .money{
		padding: 25rpx 40rpx 25rpx 60rpx;
	}
	
	.wanl-pay .money .symbol{
		font-size: 60rpx;
		margin-right: 20rpx;
	}
	
	.wanl-pay .money .price{
		display: flex;
		align-items: center;
	}
	.wanl-pay .money .price input{
		/* #ifdef MP */
		height: 100rpx;
		min-height: 100rpx;
		/* #endif */
		width: 100%;
		font-size: 100rpx;
	}
</style>
