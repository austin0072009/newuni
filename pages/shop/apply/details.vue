<template>
	<view>
		<view class="edgeInsetTop"></view>
		<view class="cu-bar">
			<view class="action sub-title">
				<text class="text-xl text-bold text-orange">{{$t('shop_apply.msg1')}}</text>
				<text class="text-ABC text-orange">Settled</text>
			</view>
		</view>
		<view class="wanl-apply margin-xl">
			<view class="flow">
				<view class="item">
					<view class="project">
						<view class="text-center">
							<view class="cu-avatar xl round solid text-black margin-tb-sm">
								<text class="wlIcon-wo"></text>
							</view>
							<view class="text-lg text-bold ">
								<text>01 {{$t('shop_apply.msg2')}}</text>
							</view>
						</view>
						<view class="text-min text-gray">
							<view> <text>1）{{$t('shop_apply.msg3')}}</text> </view>
							<view> <text>2）{{$t('shop_apply.msg4')}}</text> </view>
							<view> <text>3）{{$t('shop_apply.msg5')}}</text> </view>
						</view>
					</view>
					<view class="point right">
						<view class="line"> </view>
						<view class="arrow"> </view>
					</view>
				</view>
				<view class="item">
					<view class="project">
						<view class="text-center">
							<view class="cu-avatar xl round solid text-black margin-tb-sm">
								<text class="wlIcon-xiugaioryijian"></text>
							</view>
							<view class="text-lg text-bold ">
								<text>02 {{$t('shop_apply.msg6')}}</text>
							</view>
						</view>
						<view class="text-min text-gray">
							<view> <text>1）{{$t('shop_apply.msg7')}}</text> </view>
							<view> <text>2）{{$t('shop_apply.msg8')}}</text> </view>
						</view>
					</view>
					<view class="point bottom">
						<view class="line"> </view>
						<view class="arrow"> </view>
					</view>
				</view>
				<view class="item">
					<view class="project">
						<view class="text-center">
							<view class="cu-avatar xl round solid text-black margin-tb-sm">
								<text class="wlIcon-guanzhu1"></text>
							</view>
							<view class="text-lg text-bold ">
								<text>04 {{$t('shop_apply.msg9')}}</text>
							</view>
						</view>
						<view class="text-min text-gray">
							<view> <text>1）{{$t('shop_apply.msg9')}}</text> </view>
							<view> <text>2）{{$t('shop_apply.msg10')}}</text> </view>
						</view>
					</view>
					<view class="point left">
						<view class="arrow"> </view>
						<view class="line"> </view>
					</view>
					<view class="point bottom">
						<view class="line"> </view>
						<view class="arrow"> </view>
					</view>
				</view>
				<view class="item">
					<view class="project">
						<view class="text-center">
							<view class="cu-avatar xl round solid text-black margin-tb-sm">
								<text class="wlIcon-shijian"></text>
							</view>
							<view class="text-lg text-bold ">
								<text>03 {{$t('shop_apply.msg11')}}</text>
							</view>
						</view>
						<view class="text-min text-gray">
							<view> <text>1）{{$t('shop_apply.msg12')}}</text> </view>
							<view> <text>2）{{$t('shop_apply.msg13')}}</text> </view>
							<view> <text>3）{{$t('shop_apply.msg14')}}</text> </view>
						</view>
					</view>
				</view>
				<view class="item">
					<view class="project">
						<view class="text-center">
							<view class="cu-avatar xl round solid text-black margin-tb-sm">
								<text class="wlIcon-dianpu"></text>
							</view>
							<view class="text-lg text-bold ">
								<text>05 {{$t('shop_apply.msg15')}}</text>
							</view>
						</view>
						<view class="text-min text-gray">
							<view> <text>1）{{$t('shop_apply.msg16')}}</text> </view>
							<view> <text>1）{{$t('shop_apply.msg17')}}</text> </view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-bar">
				<view class="action sub-title">
					<text class="text-xl text-bold text-orange">{{$t('shop_apply.msg18')}}</text>
					<text class="text-ABC text-orange">dqizon</text>
				</view>
			</view>
			<view class="details">
				<view class="details-item">
					<view class="title">
						<text>{{$t('shop_apply.msg19')}}</text>
					</view>
					<view class="center text-sm">
						<view> <text>1.{{$t('shop_apply.msg20')}}</text> </view>
						<view> <text>2.{{$t('shop_apply.msg21')}}</text> </view>
					</view>
				</view>
				<view class="details-item">
					<view class="title">
						<text>{{$t('shop_apply.msg22')}}</text>
					</view>
					<view class="center text-sm">
						<view> <text>1.{{$t('shop_apply.msg23')}}</text> </view>
						<view> <text>2.{{$t('shop_apply.msg24')}}</text> </view>
						<view> <text>3.{{$t('shop_apply.msg25')}}</text> </view>
					</view>
				</view>
				<view class="details-item">
					<view class="title">
						<text>{{$t('shop_apply.msg26')}}</text>
					</view>
					<view class="center text-sm">
						<view> <text>1.{{$t('shop_apply.msg23')}}</text> </view>
						<view> <text>2.{{$t('shop_apply.msg24')}}</text> </view>
						<view> <text>3.{{$t('shop_apply.msg27')}}</text> </view>
						<view> <text>4.{{$t('shop_apply.msg25')}}</text> </view>
					</view>
				</view>
			</view>
		</view>
		<view class="safeAreaBottom"></view>
		<view class="wanlian cu-bar tabbar foot flex flex-direction">
			<button @tap="onApply()" class="cu-btn wanl-bg-orange lg">{{verify_text[shopdata.verify]}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopdata:{verify: 0},
				verify_text: [this.$t('shop_apply.msg44'),this.$t('shop_apply.msg46'),this.$t('shop_apply.msg46'),this.$t('shop_apply.msg28'),this.$t('shop_apply.msg29')]
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('shop_apply.title')
			})
			this.loadData();
			if (this.$store.state.user.isLogin) {
				this.loadData();
			}
		},
		methods: {
			async loadData() {
				this.$api.get({
					url: '/wanlshop/shop/apply',
					success: res => {
						if (res) {
							this.shopdata = res;	
						}
					}
				});
			},
			onApply(){
				this.$wanlshop.auth(`/pages/shop/apply/apply?data=${JSON.stringify(this.shopdata)}`)
			}
		}
	}
</script>

<style>
	.cu-bar{
		justify-content: center;
	}
	.wanlian.cu-bar.tabbar {
		background-color: #ffffff;
	}
	.wanlian.cu-bar.tabbar .cu-btn {
		width: calc(100% - 50rpx);
	}
	.wanlian.cu-bar.tabbar .cu-btn.lg {
		font-size: 32rpx;
		height: 86rpx;
	}
	.cu-form-group .title, .cu-form-group uni-input{
		font-size: 28rpx;
	}
	.wanl-apply .flow{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.wanl-apply .flow .item{
		width: 46%;
		height: 590rpx;
		position: relative;
	}
	
	.wanl-apply .flow .item:last-child{
		height: 400rpx;
	}
	
	.wanl-apply .flow .item .project {
		line-height: 2.2;
	}
	
	.wanl-apply .flow .item .point{
		display: flex;
	}
	.wanl-apply .flow .item .point .line{
		width: 120rpx;
		height: 4rpx;
		background-color: #ccc;
	}
	.wanl-apply .flow .item .point .arrow{
		border: 14rpx solid transparent;
		border-left: 30rpx solid #ccc;
	}
	
	/* 指向右 */
	.wanl-apply .flow .item .point.right{
		position: absolute;
		align-items: center;
		right: -110rpx;
		top: 76rpx;
	}
	/* 指向左 */
	.wanl-apply .flow .item .point.left{
		position: absolute;
		align-items: center;
		right: -96rpx;
		top: 76rpx;
	}
	.wanl-apply .flow .item .point.left .arrow{
		border: 14rpx solid transparent;
		border-right: 30rpx solid #ccc;
	}
	/* 指向下 */
	.wanl-apply .flow .item .point.bottom{
		position: absolute;
		justify-content: center;
		bottom: 0;
		right: 0;
		left: 0;
	}
	.wanl-apply .flow .item .point.bottom .line{
		width: 4rpx;
		height: 120rpx;
		margin-bottom: 45rpx;
	}
	.wanl-apply .flow .item .point.bottom .arrow{
		position: absolute;
		bottom: 0;
		border: 14rpx solid transparent;
		border-top: 30rpx solid #ccc;
	}
	.wanl-apply .details {
		background-color: #f1efec;
		margin: 50rpx 0;
	}
	.wanl-apply .details .details-item {
		display: flex;
		border-bottom: 2rpx solid #fff;
	}
	.wanl-apply .details .details-item .title{
		background-color: #e6e6e6;
		width: 40%;
		padding: 25rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.wanl-apply .details .details-item .center{
		width: 100%;
		color: #474747;
	}
	.wanl-apply .details .details-item .center>view{
		border-bottom: 2rpx solid #fff;
		padding: 25rpx;
		line-height: 1.5;
	}
	.wanl-apply .details .details-item .center>view:last-child{
		border: 0;
	}
	
</style>