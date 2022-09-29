<template>
	<view>
		<view class="edgeInsetTop"></view>
		<view class="wanl-refund"> 
			<!-- 头部 -->
			<view class="header">
				<image :src="$wanlshop.appstc('/order/img_detail_bg.png')" class="img-bg"></image>
				<view class="content">
					<view>
						<view class="status-text">{{getStateText(refundData.state)}}</view>
						<view class="reason">
							<text class="reason-text">{{refundData.statetime}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="bg-white padding-bj" v-if="refundData.state != 4">
				{{getStateInfo(refundData.state)}}
			</view>
			<!-- 退款状态:0=申请退款,1=卖家同意,2=卖家拒绝,3=申请平台介入,4=成功退款,5=退款已关闭,6=已提交退货 -->
			<view class="bg-white solid-top padding-bj current" v-if="refundData.state == 0">
				<view class="wanl-gray text-sm">
					<view>
						<text class="wlIcon-dot margin-right-sm"></text>{{$t('refund.details_msg1')}}
					</view>
					<view class="margin-top-xs">
						<text class="wlIcon-dot margin-right-sm"></text>{{$t('refund.details_msg2')}}
					</view>
				</view>
				<view class="flex justify-end margin-top">
					<button class="cu-btn line-black margin-lr-xs" @tap="closeRefund(refundData.id)">{{$t('refund.shut_down_a_refund')}}</button>
					<button class="cu-btn line-orange" @tap="editRefund(refundData.id)">{{$t('refund.details_msg3')}}</button>
				</view>
			</view>
			
			<view v-if="refundData.state == 1">
				<view class="bg-white solid-top padding-bj receipt">
					<view class="icon">
						<text class="wlIcon-guanzhu1"></text>
					</view>
					<view class="content">
						<view class="flex justify-between">
							<text>{{$t('refund.details_msg4')}}：{{refundData.shopConfig.returnName}}</text><text>{{refundData.shopConfig.returnPhoneNum}}</text>
						</view>
						<view class="margin-top-xs">
							<view class="text-cut-2">
								{{refundData.shopConfig.returnAddr}}
							</view>
						</view>
					</view>
				</view>
				<view class="bg-white padding-bj solid-top">
					<view class="wanl-gray text-sm">
						<view>
							<text class="wlIcon-dot margin-right-sm"></text>{{$t('refund.details_msg5')}}
						</view>
						<view class="margin-top-xs">
							<text class="wlIcon-dot margin-right-sm"></text>{{$t('refund.details_msg6')}}
						</view>
					</view>
				</view>
				<view class="cu-form-group margin-top-bj">
					<view class="title">{{$t('refund.details_msg7')}}：</view>
					<input :placeholder="$t('refund.details_msg8')" name="input" v-model="returnData.express_no"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">{{$t('refund.details_msg9')}}：</view>
					<picker @change="kuaidiChange" :range="refundData.kuaidi" range-key="name">
						<view class="picker">
							{{kuaidiKey>-1?refundData.kuaidi[kuaidiKey].name:$t('bank.msg1')}}
						</view>
					</picker>
				</view>
				<view class="bg-white padding-bj current">
					<view class="flex justify-end">
						<button class="cu-btn line-orange margin-lr-xs" @tap="toExpress(refundData.id)">{{$t('refund.details_msg10')}}</button>
					</view>
				</view>
			</view>
			<view class="bg-white current" v-if="refundData.state == 6">
				<view class="bg-white solid-top padding-bj">
					{{$t('refund.details_msg11')}}：<text class="wanl-gray">{{refundData.express_name}}({{refundData.express_no}})</text>
				</view>
				<view class="bg-white solid-top padding-bj current">
					<view class="wanl-gray text-sm">
						<view>
							<text class="wlIcon-dot margin-right-sm"></text>{{$t('refund.details_msg2')}}
						</view>
						<view class="margin-top-xs">
							<text class="wlIcon-dot margin-right-sm"></text>{{$t('refund.details_msg12')}}
						</view>
					</view>
				</view>
			</view>
			<view class="bg-white solid-top padding-bj current " v-if="refundData.state == 2">
				<view class="text-sm">
					{{$t('money.refund_to_reason')}}：<text class="wanl-gray">{{refundData.refuse_content}}</text>
				</view>
				<view class="flex justify-end margin-top">
					<button class="cu-btn line-black" @tap="arbitrationRefund(refundData.id)">{{$t('refund.msg1_4')}}</button>
					<button class="cu-btn line-orange margin-left-xs" @tap="editRefund(refundData.id)">{{$t('refund.details_msg3')}}</button>
				</view>
			</view>
			<view class="bg-white solid-top padding-bj current" v-if="refundData.state == 3">
				<view class="wanl-gray text-sm">
					<view>
						<text class="wlIcon-dot margin-right-sm"></text>{{$t('refund.details_msg13')}}
					</view>
					<view class="margin-top-xs">
						<text class="wlIcon-dot margin-right-sm"></text>{{$t('refund.details_msg14')}}
					</view>
				</view>
			</view>
			<view class="bg-white padding-bj flex justify-between align-center" v-if="refundData.state == 4">
				<text>{{$t('refund.details_msg15')}}</text><text class="text-price wanl-orange">{{refundData.price}}</text>
			</view>
			<view class="bg-white padding-bj margin-top-bj flex justify-between align-center" @tap="refundLog(refundData.id)">
				<text>{{$t('refund.details_msg16')}}</text><text class="wlIcon-fanhui2"></text>
			</view>
			<view class="bg-white padding-bj margin-top-bj">
				{{$t('refund.details_title')}}
			</view>
			<view class="padding-bj flex">
				<view class="cu-avatar xl margin-right-bj" :style="{backgroundImage: 'url('+$wanlshop.oss(refundData.goods.image, 70, 70)+')'}"> </view>
				<view class="text-sm" style="width: calc(100% - 128rpx);">
					<view class="margin-bottom-xs">
						
						<view class="text-cut-2">
							<view v-if="refundData.order_type === 'groups'" class="cu-tag sm margin-right-xs bg-gradual-orange radius">
								<text>{{$t('groups.title')}}</text>
							</view>
							{{refundData.goods.title}}
						</view>
					</view>
					<view class="wanl-gray">
						{{$t('cart.specification')}}：{{refundData.goods.difference}}
					</view>
				</view>
			</view>
			<view class="bg-white padding-bj text-sm">
				<view class="item flex">
					<text class="wanl-gray"> {{$t('money.refund_status')}}： </text> <text> {{refundData.type_text}} </text>
				</view>
				<view class="item flex margin-top-bj">
					<text class="wanl-gray"> {{$t('order.refund_msg4')}}： </text> <text> {{refundData.reason_text}} </text>
				</view>
				<view class="item flex margin-top-bj">
					<text class="wanl-gray"> {{$t('money.refund_money')}}： </text> <text class="text-price"> {{refundData.price}} </text>
				</view>
				<view class="item flex margin-top-bj">
					<text class="wanl-gray"> {{$t('order.refund_msg1')}}： </text> <text> {{refundData.expressType_text}} </text>
				</view>
				<view class="item flex margin-top-bj">
					<text class="wanl-gray"> {{$t('money.refund_time')}}： </text> <text> {{refundData.createtime_text}} </text>
				</view>
			</view>
			<view class="edgeInsetBottom"> </view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			refundData: {
				statetime: '',
				goods:{
					
				}
			},
			returnData:{
				id: 0,
				express_no: '',
				express_name: ''
			},
			kuaidiKey: -1
		};
	},
	onLoad(option) {
		uni.setNavigationBarTitle({
			title:this.$t('refund.details_title')
		})
		this.loadData({id:option.id});
	},
	methods: {
		async loadData(data) {
			this.$api.get({
				url: '/wanlshop/refund/getRefundInfo',
				data: data,
				success: res => {
					this.refundData = res;
					this.returnData.id = res.id;
					// 时间差的毫秒数 
					if(res.state == 0){
						var diff = (res.createtime + res.config.autoagree * 86400) - Date.parse(new Date()) / 1000;
						var days = Math.floor(diff / 86400);
						var hours = Math.floor(diff % 86400 / 3600); 
						var minutes = Math.floor(diff % 86400 % 3600 / 60);
						if (minutes > 0) {
							this.refundData.statetime = this.$t('order.details_msg13') +minutes+ this.$t('refund.details_msg17');
						}
						if (hours > 0) {
							this.refundData.statetime = this.$t('order.details_msg13') +hours+ this.$t('signin.day') +minutes+ this.$t('refund.details_msg17');
						}
						if (days > 0) {
							this.refundData.statetime = this.$t('order.details_msg13') +days+ this.$t('signin.day') +hours+ this.$t('order.details_msg19') +minutes+ this.$t('refund.details_msg17');
						}
					}else if(res.state == 1){
						var diff = (res.agreetime + res.config.returntime * 86400) - Date.parse(new Date()) / 1000;
						var days = Math.floor(diff / 86400);
						var hours = Math.floor(diff % 86400 / 3600); 
						var minutes = Math.floor(diff % 86400 % 3600 / 60);
						if (minutes > 0) {
							this.refundData.statetime = this.$t('order.details_msg13') +minutes+ this.$t('refund.details_msg17');
						}
						if (hours > 0) {
							this.refundData.statetime = this.$t('order.details_msg13') +hours+ this.$t('signin.day') +minutes+ this.$t('refund.details_msg17');
						}
						if (days > 0) {
							this.refundData.statetime = this.$t('order.details_msg13') +days+ this.$t('signin.day') +hours+ this.$t('order.details_msg19') +minutes+ this.$t('refund.details_msg17');
						}
					}else if(res.state == 2){
						this.refundData.statetime = res.rejecttime_text;
					}else if(res.state == 6){
						var diff = (res.returntime + res.config.receivingtime * 86400) - Date.parse(new Date()) / 1000;
						var days = Math.floor(diff / 86400);
						var hours = Math.floor(diff % 86400 / 3600); 
						var minutes = Math.floor(diff % 86400 % 3600 / 60);
						if (minutes > 0) {
							this.refundData.statetime = this.$t('order.details_msg13') +minutes+ this.$t('refund.details_msg17');
						}
						if (hours > 0) {
							this.refundData.statetime = this.$t('order.details_msg13') +hours+ this.$t('signin.day') +minutes+ this.$t('refund.details_msg17');
						}
						if (days > 0) {
							this.refundData.statetime = this.$t('order.details_msg13') +days+ this.$t('signin.day') +hours+ this.$t('order.details_msg19') +minutes+ this.$t('refund.details_msg17');
						}
					}else if(res.state == 3){
						this.refundData.statetime = this.$t('refund.details_msg18');
					}else if(res.state == 4){
						this.refundData.statetime = res.completetime_text;
					}else if(res.state == 5){	
						this.refundData.statetime = res.closingtime_text;
					}
				}
			});
		},
		getStateText(state){
			return [this.$t('refund.msg1_1'), this.$t('refund.msg1_2'), this.$t('refund.msg1_3'), this.$t('refund.msg1_4'), this.$t('refund.msg1_5'), this.$t('refund.msg1_6'), this.$t('refund.details_msg19')][state];
		},
		getStateInfo(state){
			return [this.$t('refund.details_msg20'), this.$t('refund.details_msg21'), this.$t('refund.msg2_3'), this.$t('refund.details_msg22'), this.$t('refund.msg2_5'), this.$t('refund.details_msg23'), this.$t('refund.details_msg24')][state];
		},
		kuaidiChange(e) {
			this.kuaidiKey = e.detail.value;
			this.returnData.express_name = this.refundData.kuaidi[e.detail.value].code;
		},
		// 退款历史
		refundLog(id){
			this.$wanlshop.to(`/pages/user/refund/log?id=${id}`);
		},
		// 平台介入
		async arbitrationRefund(id){
			this.$api.get({
				url: '/wanlshop/refund/arbitrationRefund',
				data: {id:id},
				success: res => {
					this.loadData({id:id});
				}
			});
		},
		// 关闭退款
		async closeRefund(id){
			this.$api.get({
				url: '/wanlshop/refund/closeRefund',
				data: {id:id},
				success: res => {
					this.$store.commit('statistics/order', {
						customer: this.$store.state.statistics.order.customer - 1
					});
					this.loadData({id:id});
				}
			});
		},
		// 提交物流
		async toExpress(){
			if (!this.returnData.express_no) {
				this.$wanlshop.msg(this.$t('refund.details_msg25'));
				return false;
			}
			if (!this.returnData.express_name) {
				this.$wanlshop.msg(this.$t('refund.details_msg26'));
				return false;
			}
			this.$api.post({
				url: '/wanlshop/refund/toExpress',
				data: this.returnData,
				success: res => {
					this.loadData({id:res});
				}
			});
		},
		// 修改退款
		editRefund(id){
			this.$wanlshop.to(`/pages/user/refund/edit?id=${id}`);
		}
		
	}
};
</script>

<style>
	.wanl-refund .header {
		width: 100%;
		height: 180rpx;
		position: relative;
		background-color: #f72b36;
	}
	
	.wanl-refund .header .img-bg {
		width: 100%;
		height: 180rpx;
	}
	
	.wanl-refund .header .content {
		width: 100%;
		height: 180rpx;
		position: absolute;
		z-index: 10;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 60rpx;
		box-sizing: border-box;
	}
	
	.wanl-refund .header .status-text {
		font-size: 34rpx;
		line-height: 34rpx;
		color: #FEFEFE;
	}
	
	.wanl-refund .header .reason {
		font-size: 24rpx;
		line-height: 24rpx;
		color: rgba(254, 254, 254, 0.75);
		padding-top: 15rpx;
		display: flex;
		align-items: center;
	}
	
	.wanl-refund .header .reason-text {
		padding-right: 12rpx;
	}
	
	.wanl-refund .header .status-img {
		width: 100rpx;
		height: 100rpx;
		display: block;
	}
	
	.wanl-refund .current .cu-btn{
		width: 140rpx;
		font-size: 26rpx;
		padding: 0 12rpx;
	}
	.wanl-refund .receipt{
		display: flex;
		align-items: center;
	}
	
	.wanl-refund .receipt .icon{
		margin-right: 25rpx;
		font-weight: bold;
	}
	.wanl-refund .receipt .content{
		flex: 1;
	}
	
	.wanl-refund .cu-form-group .title{
		padding-right: 25rpx;
		font-size: 28rpx;
		height: 55rpx;
		line-height: 55rpx;
	}
	.wanl-refund .cu-form-group input{
		font-size: 28rpx;
		color: #555;
		padding-right: 10rpx;
	}
	
	
</style>
