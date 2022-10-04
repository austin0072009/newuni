<template>
	<view>
		<!-- 收银台 -->
		<view class="edgeInsetTop"></view>
		<view class="wanl-pay">
			<view class="price-box">
				<text class="text-df">{{order_no}}</text>
				<text class="wanl-pip text-price margin-top-sm">{{price}}</text>
			</view>
			<view class="list-box">
				<view class="item" v-for="(item, index) in payList" :key="index">
					<text :class="'wlIcon-'+ item.type +'-pay'"></text>
					<view class="action">
						<text class="title wanl-pip">{{item.name}}</text>
						<view v-if="item.type == 'balance'">
							<text v-if="isbalance">{{$t('money.available_balance')}} ${{user.money}}</text>
							<text v-else>{{$t('order.pay_msg1')}} ${{user.money}}</text>
						</view>
						<view v-else>{{item.describe}}</view>
					</view>
					<view class="radio text-xxl" v-if="item.state" @tap="onSelect(index)">
						<text v-if="item.select" class="wlIcon-xuanze-danxuan wanl-orange"></text>
						<text v-else class="wlIcon-xuanze wanl-gray-light"></text>
					</view>
					<view class="radio text-xxl" v-else>
						<text class="wlIcon-xuanze-danxuan wanl-gray-light"></text>
					</view>
				</view>
			</view>
			<view v-if="disabled">
				<button class="mix-btn wanl-bg-redorange"> <text class="wlIcon-jiazai wlIconfont-spin margin-right-xs"></text>{{$t('order.pay_msg2')}} </button>
			</view>
			<view v-else>
				<button v-if="payNum == 1" class="mix-btn wanl-bg-redorange" @tap="confirm()"> {{$t('order.pay_msg3')}} </button>
				<button v-else class="mix-btn wanl-bg-redorange" @tap="confirm()"> {{$t('order.pay_msg4')}} </button>
			</view>
			<view class="footer text-center">
				<view class="text-sm" v-if="order_pay_no">{{order_type === 'groups' ? $t('index.spell_group'):''}}{{$t('money.transaction_no')}}：{{order_pay_no}}</view>
				<view> © {{$t('money.thousands_of_union_pay')}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				token: '',
				disabled: false,
				price:'0.00',
				isbalance: false,
				order_type: 'goods',
				order_no: '',
				order_pay_no: '',
				payNum: 1, // 支付方式 独立支付-合并支付
				payList: []
			}
		},
		computed: {
			...mapState(['user'])
		},
		watch: {
			price(val, newval) {
				if(val <= parseFloat(this.$store.state.user.money)){
					this.isbalance = true;
					this.getPayment();
				}
			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title:this.$t('order.pay_title')
			})
			this.$api.post({
				url: '/wanlshop/pay/getBalance',
				success: res => {
					this.$store.commit('user/setUserInfo', {money: res});
					// 获取支付列表
					this.getPayment();
				}
			});
			if (option.data) {
				var sum = 0, 
					data = JSON.parse(option.data), 
					order_ids = [];
				if (data.length <= 1) {
					this.price = data[0].price;
					this.order_type = data[0].type;
					this.order_no = `${data[0].type == 'groups' ? this.$t('index.spell_group'):''}${this.$t('money.order_no')}：${data[0].order_no}`;
					this.order_pay_no = data[0].pay_no;
					this.order_id = data[0].order_id;
				}else{
					data.forEach(item => {
						sum = this.$wanlshop.bcadd(sum, item.price);
						order_ids.push(item.order_id);
					});
					this.price = sum;
					this.order_id = order_ids;
					this.payNum = data.length;
					this.order_no = this.$t('order.pay_msg4')+' ' + data.length + this.$t('order.pay_msg5');
				}
				this.token = option.token;
			}else if(option.order_id){
				uni.showLoading({
				    title: this.$t('order.pay_msg6')
				});
				this.$api.post({
					url: '/wanlshop/pay/getPay',
					data: {
						order_id: option.order_id,
						order_type: option.order_type
					},
					success: res => {
						uni.hideLoading();
						this.token = res.token;
						this.price = res.price;
						this.order_type = res.order_type;
						this.order_no = `${res.order_type == 'groups' ? this.$t('index.spell_group'):''}${this.$t('money.order_no')}：${res.order_no}`;
						this.order_pay_no = res.pay_no;
						this.order_id = res.order_id;
					}
				});
			}else{
				console.log('非法访问');
			}
		},
		methods: {
			getPayment(){
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
				this.payList = [{
					name: this.$t('order.pay_msg7'),
					describe: '',
					type: 'balance',
					method: 'balance',
					state: this.isbalance ? true: false, // 是否可用
					select: this.isbalance ? true: false // 是否选中
				}];
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
								this.payList.push({name: this.$t('money.wechat_pay'),describe: this.$t('money.wechat_pay_text'),type: 'wechat',method: method,state: true,select: this.isbalance ? false : true});
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
			//确认支付
			confirm() {
				let data = null;
				if (this.disabled) {
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
					uni.showModal({
					    content: this.$t('money.msg2'),
					    showCancel: false
					});
					return;
				}else{
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
					// 如果是公众号获取code
					this.wanlPay(data);
					// #endif
				}
			},
			async wanlPay(data, code = null){
				this.$api.post({
					url: '/wanlshop/pay/payment',
					data: {
						order_type: this.order_type,
						type: data.type,
						method: data.method,
						code: code,
						order_id: this.order_id,
						token: this.token
					},
					success: res => {
						// 余额支付/小程序支付
						switch (data.type) {
						    case 'balance':
						        this.$store.commit('user/setUserInfo', {
						        	money: this.$wanlshop.bcsub(this.$store.state.user.money, this.price)
						        });
						        this.paySuccess();
						        break;
						    case 'wechat':
								// 微信 H5支付
						        if(data.method == 'wap'){
						        	setTimeout(() => {
						        		uni.showModal({
						        		    content: this.$t('order.pay_msg8'),
						        			confirmText: this.$t('order.complete'),
						        			cancelText: this.$t('order.pay_msg9'),
						        		    success: response=> {
						        		        if (response.confirm) {
						        		            this.paySuccess();
						        		        } else if (response.cancel) {
						        		            this.confirm();
						        		        }
						        		    }
						        		});
						        	}, 2000);
						        	// 异步查询是否支付成功
						        	window.location.href = res;
								// 微信 APP支付
								}else if(data.method == 'app'){
									uni.requestPayment({
									    provider: 'wxpay',
									    orderInfo: res,
									    success: (e) => {
									        console.log("success", e);
									        this.paySuccess();
									    },
									    fail: (e) => {
									        uni.showModal({
									            content: this.$t('money.msg5') + e.errMsg,
									            showCancel: false
									        })
									    },
									    complete: () => {
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
									this.disabled = false;
									if(this.order_type === 'goods'){
										this.$store.commit('statistics/order', {
											pay: this.$wanlshop.bcsub(this.$store.state.statistics.order.pay, this.payNum),
											delive: this.$wanlshop.bcadd(this.$store.state.statistics.order.delive, this.payNum)
										});
									}
									document.write(res);
								}else if(data.method == 'app'){
									uni.requestPayment({
									    provider: 'alipay',
									    orderInfo: res,
									    success: (e) => {
									        console.log("success", e);
									        this.paySuccess();
									    },
									    fail: (e) => {
									        uni.showModal({
									            content: this.$t('money.msg5') + e.errMsg,
									            showCancel: false
									        })
									    },
									    complete: () => {
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
			// 支付成功
			paySuccess(){
				this.disabled = false;
				if(this.order_type === 'goods'){
					this.$store.commit('statistics/order', {
						pay: this.$wanlshop.bcsub(this.$store.state.statistics.order.pay, this.payNum),
						delive: this.$wanlshop.bcadd(this.$store.state.statistics.order.delive, this.payNum)
					});
				}
				this.$wanlshop.to(`/pages/page/success?type=pay&order_type=${this.order_type ? this.order_type:'goods'}`);
			}
		}
	}
</script>

<style>
	page{
		background-color: white;
	}
	radio-group {
	    display: block;
	}
</style>
