<template>
	<view class="wanl-money-log">
		<view class="edgeInsetTop"> </view>
		<!-- 交易 -->
		<block v-if="moneyData.type == 'pay' && data">
			<view class="bg-white padding-xl margin-bottom-bj" v-for="(item, index) in data" :key="item.id">
				<view class="text-center solid-bottom title">
					<text>{{item.shop.shopname}}</text>
					<view class="wanl-black"> -{{item.pay.price}} </view>
				</view>
				<view class="goods">
					<view class="item solid-bottom" v-for="(goods, indexs) in item.goods" :key="indexs">
						<image :src="$wanlshop.oss(goods.image, 125, 125)"></image>
						<view class="info">
							<view>
								<text class="text-cut-2">{{goods.title}}</text>
							</view>
							<view class="wanl-gray">
								{{goods.difference}} x {{goods.number}}
							</view>
						</view>
						<view class="text-price">
							{{goods.price}}
						</view>
					</view>
				</view>
				<view class="list margin-top-xl text-sm">
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.order_no')}} </view>
						<view class="info"> {{item.pay.order_no}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.transaction_no')}} </view>
						<view class="info"> {{item.pay.pay_no}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.order_money')}} </view>
						<view class="info text-price"> {{item.pay.order_price}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.pay_type')}} </view>
						<view class="info"> {{moneyData.memo}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.transaction_order_no')}} </view>
						<view class="info"> {{item.pay.trade_no}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.actual_payment')}} </view>
						<view class="info text-price"> {{item.pay.actual_payment}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.pay_time')}} </view>
						<view class="info"> {{item.paymenttime_text}} </view>
					</view>
					
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.courier_fees')}} </view>
						<view class="info text-price"> {{item.pay.freight_price}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.discount_amount')}} </view>
						<view class="info text-price"> {{item.pay.discount_price}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.total_money')}} </view>
						<view class="info text-price"> {{item.pay.total_amount}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.transaction_time')}} </view>
						<view class="info"> {{item.createtime_text}} </view>
					</view>
					
				</view>
			</view>
		</block>
		<!-- 拼团 -->
		<block v-else-if="moneyData.type == 'groups' && data">
			<view class="bg-white padding-xl margin-bottom-bj" v-for="(item, index) in data" :key="item.id">
				<view class="text-center solid-bottom title">
					<text>{{item.shop.shopname}}</text>
					<view class="wanl-black"> -{{item.pay.price}} </view>
				</view>
				<view class="goods">
					<view class="item solid-bottom" v-for="(goods, indexs) in item.goods" :key="indexs">
						<image :src="$wanlshop.oss(goods.image, 125, 125)"></image>
						<view class="info">
							<view>
								<text class="text-cut-2">{{goods.title}}</text>
							</view>
							<view class="wanl-gray">
								{{goods.difference}} x {{goods.number}}
							</view>
						</view>
						<view class="text-price">
							{{goods.price}}
						</view>
					</view>
				</view>
				<view class="list margin-top-xl text-sm">
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.order_no')}} </view>
						<view class="info"> {{item.pay.order_no}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.transaction_no')}} </view>
						<view class="info"> {{item.pay.pay_no}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.order_money')}} </view>
						<view class="info text-price"> {{item.pay.order_price}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.pay_type')}} </view>
						<view class="info"> {{moneyData.memo}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.transaction_order_no')}} </view>
						<view class="info"> {{item.pay.trade_no}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.actual_payment')}} </view>
						<view class="info text-price"> {{item.pay.actual_payment}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.pay_time')}} </view>
						<view class="info"> {{item.paymenttime_text}} </view>
					</view>
					
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.courier_fees')}} </view>
						<view class="info text-price"> {{item.pay.freight_price}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.discount_amount')}} </view>
						<view class="info text-price"> {{item.pay.discount_price}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.total_money')}} </view>
						<view class="info text-price"> {{item.pay.total_amount}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.transaction_time')}} </view>
						<view class="info"> {{item.createtime_text}} </view>
					</view>
					
				</view>
			</view>
		</block>
		<!-- 用户充值 -->
		<block v-else-if="moneyData.type == 'recharge' && data">
			<view class="bg-white padding-xl margin-bottom-bj">
				<view class="text-center solid-bottom title">
					<text>{{moneyData.memo}}</text>
					<view class="wanl-black"> +{{moneyData.money}} </view>
				</view>
				<view class="list margin-top-xl text-sm">
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.status')}} </view>
						<view class="info"> {{$t('money.top_up_success')}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.order_no')}} </view>
						<view class="info"> {{data.orderid}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.pay_status')}} </view>
						<view class="info"> {{bankList[data.paytype]}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.transaction_no')}} </view>
						<view class="info"> {{data.memo}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.after_the_change')}} </view>
						<view class="info text-price"> {{moneyData.after}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.before_the_change')}} </view>
						<view class="info text-price"> {{moneyData.before}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.top_up_time')}} </view>
						<view class="info"> {{$wanlshop.timeFormat(moneyData.createtime,'yyyy-mm-dd hh:MM:ss')}} </view>
					</view>
				</view>
			</view>
		</block>
		
		<!-- 用户提现 -->
		<block v-else-if="moneyData.type == 'withdraw' && data">
			<view class="bg-white padding-xl margin-bottom-bj">
				<view class="text-center solid-bottom title">
					<text>{{moneyData.memo}}</text>
					<view class="wanl-black"> {{moneyData.money}} </view>
				</view>
				<view class="list margin-top-xl text-sm">
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.status')}} </view>
						<view class="info"> {{$t('money.withdrawal')}}{{withdrawStatus[data.status]}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.withdrawal_amount')}} </view>
						<view class="info text-price"> {{data.money}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.the_service_fee')}} </view>
						<view class="info text-price"> {{data.handingfee}} </view>
					</view>
					<view class="flex" v-if="data.status == 'successed' && data.transfertime">
						<view class="type wanl-gray"> {{$t('money.transfer_time')}} </view>
						<view class="info"> {{$wanlshop.timeFormat(data.transfertime,'yyyy-mm-dd hh:MM:ss')}} </view>
					</view>
					<view class="flex" v-if="data.status == 'rejected' && data.memo">
						<view class="type wanl-gray"> {{$t('money.refund_to_reason')}} </view>
						<view class="info"> {{data.memo}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.type')}} </view>
						<view class="info"> {{bankList[data.type]}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.account')}} </view>
						<view class="info"> {{data.account}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.transaction_no')}} </view>
						<view class="info"> {{data.orderid}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.after_the_change')}} </view>
						<view class="info text-price"> {{moneyData.after}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.before_the_change')}} </view>
						<view class="info text-price"> {{moneyData.before}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.submit_time')}} </view>
						<view class="info"> {{$wanlshop.timeFormat(moneyData.createtime,'yyyy-mm-dd hh:MM:ss')}} </view>
					</view>
				</view>
			</view>
		</block>
		<!-- 退款 -->
		<block v-else-if="moneyData.type == 'refund' && data">
			<view class="bg-white padding-xl margin-bottom-bj">
				<view class="text-center solid-bottom title">
					<text>{{moneyData.memo}}</text>
					<view class="wanl-black"> {{moneyData.money > 0 ? '+'+moneyData.money:moneyData.money}} </view>
					<view @tap="$wanlshop.to(`/pages/user/refund/details?id=${data.refund.id}`)">
						<button class="cu-btn sm radius-bock"> {{$t('money.to_see_a_refund')}} </button>
					</view>
				</view>
				<view class="list margin-top-xl text-sm">
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.merchants')}} </view>
						<view class="info"> {{data.shop.shopname}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.order_no')}} </view>
						<view class="info"> {{data.order_no}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.order_time')}} </view>
						<view class="info"> {{data.createtime_text}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.pay_time')}} </view>
						<view class="info"> {{data.paymenttime_text}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.refund_money')}} </view>
						<view class="info text-price"> {{data.refund.price}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.refund_status')}} </view>
						<view class="info"> {{getType(data.refund.type)}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.refund_to_reason')}} </view>
						<view class="info"> {{getReason(data.refund.reason)}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.creation_time')}} </view>
						<view class="info"> {{$wanlshop.timeFormat(data.refund.createtime,'yyyy-mm-dd hh:MM:ss')}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.refund_time')}} </view>
						<view class="info"> {{$wanlshop.timeFormat(data.refund.completetime,'yyyy-mm-dd hh:MM:ss')}} </view>
					</view>
				</view>
			</view>
		</block>
		<!-- 系统 -->
		<block v-else>
			<view class="bg-white padding-xl margin-bottom-bj">
				<view class="text-center solid-bottom title">
					<text>{{moneyData.memo}}</text>
					<view class="wanl-black"> {{moneyData.money > 0 ? '+'+moneyData.money:moneyData.money}} </view>
				</view>
				<view class="list margin-top-xl text-sm">
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.after_the_change')}} </view>
						<view class="info text-price"> {{moneyData.after}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.before_the_change')}} </view>
						<view class="info text-price"> {{moneyData.before}} </view>
					</view>
					<view class="flex">
						<view class="type wanl-gray"> {{$t('money.time')}} </view>
						<view class="info"> {{$wanlshop.timeFormat(moneyData.createtime,'yyyy-mm-dd hh:MM:ss')}} </view>
					</view>
				</view>
			</view>
		</block>
		<view class="edgeInsetBottom"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				moneyData: {},
				data: null,
				bankList: {
					alipay: '支付宝',
					wechat: '微信',
					jssdk: '微信公众平台',
					ALIPAY: '支付宝',
					WECHAT: '微信',
					ICBC: '工商银行',
					ABC: '农业银行',
					PSBC: '邮储银行',
					CCB: '建设银行',
					CMB: '招商银行',
					BOC: '中国银行',
					COMM: '交通银行',
					SPDB: '浦发银行',
					GDB: '广发银行',
					CMBC: '民生银行',
					PAB: '平安银行',
					CEB: '光大银行',
					CIB: '兴业银行',
					CITIC: '中信银行'
				},
				withdrawStatus: {
					created: this.$t('money.msg1_1'),
					successed: this.$t('money.msg1_2'),
					rejected: this.$t('money.msg1_3'),
				}
			};
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title:this.$t('money.details_title')
			})
			this.moneyData = JSON.parse(option.data);
			this.loadData();
		},
		methods: {
			async loadData() {
				let moneyData = this.moneyData;
				this.$api.get({
					url: '/wanlshop/pay/details',
					data: {
						id: moneyData.service_ids,
						type: moneyData.type
					},
					success: res => {
						this.data = res;
					}
				});
			},
			getType(e){
				return [this.$t('money.msg2_1'),this.$t('money.msg2_2')][e];
			},
			getReason(e){
				return [this.$t('money.msg3_1'),this.$t('money.msg3_2'),this.$t('money.msg3_3'),this.$t('money.msg3_4'),this.$t('money.msg3_5'),this.$t('money.msg3_6'),this.$t('money.msg3_7')][e];
			}
		}
	}
</script>

<style>
	.wanl-money-log .title{
		padding: 20rpx 0 50rpx 0;
	}
	.wanl-money-log .title>view{
		font-size: 70rpx;
		font-weight: 600;
		margin-top: 14rpx;
	}
	.wanl-money-log .list .flex {
		margin-bottom: 25rpx;
	}
	.wanl-money-log .list .flex .type{
		width: 150rpx;
	}
	.wanl-money-log .list .flex .info{
		flex-grow: 1;
	}
	
	.wanl-money-log .goods .item{
		display: flex;
		align-items: center;
		margin: 25rpx 0;
		padding-bottom: 25rpx;
	}
	
	.wanl-money-log .goods .item image{
		width: 100rpx;
		height: 100rpx;
		margin-right: 25rpx;
	}
	.wanl-money-log .goods .item .info{
		flex: 1;
	}
</style>