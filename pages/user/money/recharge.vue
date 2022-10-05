<template>
	<view class="recharge">
		<!-- 收银台 -->
		<view class="edgeInsetTop"></view>
		<view class="wanl-pay">
			<view class="money bg-white">
				<text class="title">{{$t('money.top_up_amount')}}</text>
				<view class="margin-top price">
					<view class="symbol">
						<text>$</text>
					</view>
					<input type="digit" maxlength="5" focus v-model="money" :placeholder="$t('money.top_up_amount')" />
					<view class="text-lg wanl-gray-light" @tap="emptyInput" v-if="money">
						<text class="wlIcon-shibai"></text>
					</view>
				</view>
			</view>
			<view class="list-box">
				<view class="item" v-for="(item, index) in payList" :key="index">
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
			</view>
			<button class="mix-btn wanl-bg-redorange" @tap="confirm()" :loading="loading"> {{$t('money.top_up')}}</button>
			<!-- <view class="footer text-center">
				<view> © {{$t('money.thousands_of_union_pay')}} </view>
			</view> -->
			<view class="tips_mode">
				<view class="tips_content">
					<view class="tips_title">
						<span>{{$t('money.payment_tip_title')}}</span>
					</view>
					<view>
						{{$t('money.payment_tip_1')}}
					</view>
					<view>
						{{$t('money.payment_tip_2')}}
					</view>
					<view>
						{{$t('money.payment_tip_3')}}
					</view>
					<view>
						{{$t('money.payment_tip_4')}}
					</view>
				</view>
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
				payList: [],
				payMethods: [
					{
						value: 'union',
						name: 'UnionPay',
						checked: 'true'
					},
					{
						value: 'usdt',
						name: 'USDT'
					},
				],
				payment: 0
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
			// if(this.$jssdk.isWechat()){
			// 	this.payList.push({
			// 		name: this.$t('money.oa_pay'),
			// 		describe: this.$t('money.oa_pay_text'),
			// 		type: 'wechat',
			// 		method: 'mp',
			// 		state: true,
			// 		select: this.isbalance ? false : true
			// 	});
			// }else{
				this.payList.push({
					name: this.$t('money.union_pay'),
					describe: '',
					type: 'unionpay',
					method: method,
					state: true,
					select: true
				}, {
					name: this.$t('money.usdt_pay'),
					describe: '',
					type: 'usdt',
					method: method,
					state: true,
					select: false
				});
			// }
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
			// changePayment(evt) {
			// 	for (let i = 0; i < this.payMethods.length; i++) {
			// 		if (this.payMethods[i].value === evt.detail.value) {
			// 			alert(i);
			// 			this.payment = i;
			// 			break;
			// 		}
			// 	}
			// },
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
				switch (data.type) {
				    case 'unionpay':
						this.$wanlshop.to('/pages/user/money/bank-recharge?amount='+this.money);
						break;
				    case 'usdt':
				        this.$wanlshop.to('/pages/user/money/usdt-recharge?amount='+this.money);
						break;
						
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
						    case 'unionpay':
								alert('union')
								break;
						    case 'usdt':
						       alert('usdt');
								break;
						} 
					}
				});
			},
			onSelect(key){
				this.payList.map((value,index,array) => {
					this.payment = key;
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
	.list-box {
		padding: 0 16px;
	}
    .label_mode {
	    width: 100%;
	    margin-top: 9px;
	}
	.label_mode .label_item {
	    width: 100%;
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	    padding: 12px 0;
	}
	radio-group {
	    display: block;
	}
	.wanl-pay .money{
		padding: 25rpx 40rpx 25rpx 40rpx;
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
		font-size: 50rpx;
	}
	
	.tips_mode {
	    width: 100%;
	    margin-top: 9px;
	}
	
	.tips_mode .tips_content {
	    width: 90%;
	    margin: 0 auto;
	    color: #fa436a;
	    padding: 9px 0;
	    line-height: 21px;
	}
</style>
