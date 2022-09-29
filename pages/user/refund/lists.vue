<template>
	<view class="wanl-order-list">
		<view class="edgeInsetTop"> </view>
		<view class="order-item radius-bock" v-for="(item, index) in dataList" :key="item.id">
			<view class="head">
				<view class="shop wanl-gray" @tap="onShop(item.shop.id)">
					<text class="wlIcon-dianpu1 wanl-black"></text>
					<text class="wanl-black margin-lr-xs text-30">{{item.shop.shopname}}</text>
					<text class="wlIcon-fanhuigengduo text-sm"></text>
				</view>
				<view class="margin-right-bj text-lg">
					<text class="wanl-orange wlIcon-tuikuan margin-right-xs text-bold"></text>
					<text class="text-sm">{{item.type_text}}</text>
				</view>
			</view>
			<!-- 商品 -->
			<view class="goods-box" @tap="onRefund(item.id)">
				<view class="cu-avatar xl margin-right-bj radius" :style="{backgroundImage: 'url('+$wanlshop.oss(item.goods.image, 70, 70)+')'}"> </view>
				<view class="content margin-right-bj">
					<view class="describe">
						<view class="text-cut-2 wanl-black">
							{{item.goods.title}}
						</view>
						<view class="text-sm margin-top-xs wanl-gray-light">
							{{item.goods.difference}}
						</view>
						<view class="text-sm margin-top-xs wanl-black">
							{{$t('order.refund')}}：<text class="text-price">{{item.price}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 底部 -->
			<view class="bg-bgcolor padding-bj margin-tb-bj margin-right-bj radius text-cente wanl-gray-light">
				<text class="margin-lr-bj wanl-black">{{getStateText(item.state)}}</text> {{getStateInfo(item.state)}}
			</view>
			<!-- 1.0.2升级 售后列表完成退款项目显示关闭按钮 -->
			<view class="action-box padding-bottom-bj">
				<button class="cu-btn round line-black" v-if="item.state == 0 || item.state == 1 || item.state == 2 || item.state == 3 || item.state == 6" @tap="closeRefund(index)">{{$t('refund.shut_down_a_refund')}}</button>
				<button class="cu-btn round margin-lr-bj line-orange" @tap="onRefund(item.id)">{{$t('refund.check_the_details')}}</button>
			</view>
		</view>
		
		<view v-if="dataList.length == 0">
			<wanl-empty :text="$t('refund.empty')"/>
		</view>
		<view class="edgeInsetBottom"></view> 
		<uni-load-more :status="status" :content-text="contentText" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			dataList: [],
			reload: false, //判断是否上拉
			total: 0, //数据量
			current_page: 1, //当前页码
			last_page: 1, //总页码
			status: 'more',
			contentText: {
				contentdown: ' ',
				contentrefresh: '加载中',
				contentnomore: ''
			}
		};
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title:this.$t('refund.title')
		})
		this.loadData();
	},
	onPullDownRefresh() {
		this.current_page = 1;
		this.reload = true;
		this.loadData();
	},
	onReachBottom() {
		//判断是否最后一页
		if (this.current_page >= this.last_page) {
			this.status = 'noMore';
		} else {
			this.reload = false;
			this.current_page = this.current_page + 1; //页码+1
			this.status = 'loading';
			this.loadData();
		}
	},
	methods: {
		async loadData() {
			this.$api.post({
				url: '/wanlshop/refund/refundList',
				data: {
					page: this.current_page
				},
				success: res => {
					uni.stopPullDownRefresh();
					this.dataList = this.reload ? res.data : this.dataList.concat(res.data); //数据 追加
					this.total = res.total; //数据量
					this.current_page = res.current_page; //当前页码
					this.last_page = res.last_page; //总页码
					this.status = res.total == 0 ? 'noMore' : 'more';
				}
			});
		},
		// 关闭退款
		async closeRefund(index){
			let refund = this.dataList[index];
			this.$api.get({
				url: '/wanlshop/refund/closeRefund',
				data: {
					id: refund.id
				},
				success: res => {
					this.$store.commit('statistics/order', {
						customer: this.$store.state.statistics.order.customer - 1
					});
					refund.state = 5;
					this.$wanlshop.msg('退款已关闭');
				}
			});
		},
		getStateText(state){
			return [this.$t('refund.msg1_1'), this.$t('refund.msg1_2'), this.$t('refund.msg1_3'), this.$t('refund.msg1_4'), this.$t('refund.msg1_5'), this.$t('refund.msg1_6'), this.$t('refund.msg1_7')][state];
		},
		getStateInfo(state){
			return [this.$t('refund.msg2_1'), this.$t('refund.msg2_2'), this.$t('refund.msg2_3'), this.$t('refund.msg2_4'), this.$t('refund.msg2_5'), this.$t('refund.msg2_6'), this.$t('refund.msg2_7')][state];
		},
		onRefund(id){
			this.$wanlshop.to(`/pages/user/refund/details?id=${id}`);
		}
	}
};
</script>

<style>
</style>
