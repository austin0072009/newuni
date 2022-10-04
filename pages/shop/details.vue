<template>
	<view class="wanlshop-info-container">
		<view class="edgeInsetTop"></view>
		<view class="upgrade-shop">
			<view class="upgrade-shop-info" style="background-image: url(&quot;https://shop.amartt.xyz/assets/addons/wanlshop/img/show/main_bg3x.png&quot;);">
				<view class="upgrade-shop-info-top">
					<view class="u-avatar u-avatar--circle" style="background-color: transparent; width: 60px; height: 60px;">
						<image class="u-avatar__image u-avatar__image--circle" style="width: 60px; height: 60px;" :src="$wanlshop.oss(statistics.avatar, 400, 0)"></image>
					</view>
					<view class="upgrade-shop-inf0-left">
						<text class="shopname">
							<span>{{statistics.shopname}}</span>
						</text>
						<text class="shopname">
							<span>ID: {{statistics.id}}</span>
						</text>
					</view>
					<view class="upgrade-shop-inf0-right" v-if="statistics.level">
						<view data-v-a75f7a08="" class="u-transition u-fade-enter-to u-fade-enter-active" style="transition-duration: 300ms; transition-timing-function: ease-out;">
							<view class="u-tag-wrapper">
								<view class="u-tag u-tag--square u-tag--warning u-tag--mini" style="margin-right: 0px; margin-top: 0px; background-color: rgb(61, 59, 59); border-color: rgb(61, 59, 59);">
									<view class="u-tag__icon">
										<view data-v-59765974="" class="u-icon u-icon--right">
											<text class="wlIcon-guanfang wanl-text-white"></text>
										</view>
									</view>
									<text class="u-tag__text u-tag__text--warning u-tag__text--mini">
										<span>{{statistics.level}}</span>
									</text>
								</view>
								<!---->
							</view>
						</view>
					</view>
				</view>
				<view class="upgrade-shop-info-bottom">
					<view>
						<text class="info-tit">
							<span>{{$t('other.msg8')}}：</span>
						</text>
						<text class="info-num">
							<span>{{statistics.totalorder}}</span>
						</text>
					</view>
					<view>
						<text class="info-tit">
							<span>{{$t('other.msg9')}}：</span>
						</text>
						<text class="info-num">
							<span>${{statistics.totalorderamount}}</span>
						</text>
					</view>
				</view>
			</view>
			<view class="upgrade-shop-list shop-info-item">
				<view class="item">
					<text>
						<span>{{$t('other.msg10')}}</span>
					</text>
					<text>
						<span>{{statistics.today_totalorder}}</span>
					</text>
				</view>
				<view class="item">
					<text>
						<span>{{$t('other.msg11')}}</span>
					</text>
					<text>
						<span>{{statistics.today_totalamount}}</span>
					</text>
				</view>
				<view class="item">
					<text>
						<span>{{$t('other.msg12')}}</span>
					</text>
					<text>
						<span>{{statistics.totalgood}}</span>
					</text>
				</view>
				<view class="item">
					<text>
						<span>{{$t('other.msg13')}}</span>
					</text>
					<text>
						<span>{{statistics.forGoodsOrder}}</span>
					</text>
				</view>
				<view class="item">
					<text>
						<span>{{$t('other.msg14')}}</span>
					</text>
					<text>
						<span>{{statistics.yesterday_totalorder}}</span>
					</text>
				</view>
				<view class="item">
					<text>
						<span>{{$t('other.msg15')}}</span>
					</text>
					<text>
						<span>{{statistics.yesterday_totalamount}}</span>
					</text>
				</view>
				<view class="item">
					<text>
						<span>{{$t('other.msg16')}}</span>
					</text>
					<text>
						<span>{{statistics.totalviews}}</span>
					</text>
				</view>
				<view class="item">
					<text>
						<span>{{$t('other.msg17')}}</span>
					</text>
					<text>
						<span>{{statistics.today_views}}</span>
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statistics: {}
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('other.details_title')
			})
			this.loadData();
		},
		methods: {
			async loadData(shop_id) {
				this.$api.get({
					url: '/wanlshop/shop/statistics',
					data: {},
					success: res => {
						this.statistics = res;
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.wanlshop-info-container {
		&__main {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 200rpx;
			.cu-avatar{
				width: 120rpx;
				height: 120rpx;
			}
			.shopuser {
				display: flex;
				align-items: center;
			}
		}
	}
	.upgrade-shop .upgrade-shop-info{
		height: 150px;
		    background-size: 100% 100%;
		    padding: 10px 20px;
	}
	.upgrade-shop .upgrade-shop-info .upgrade-shop-info-top{
		    display: flex;
		    align-items: center;
	}
	.u-avatar--circle{
		border-radius: 100px;
	}
	.u-avatar{
		display: flex;
		    flex-direction: row;
		    align-items: center;
		    justify-content: center;
	}
	.u-avatar__image--circle{
		border-radius: 100px;
	}
	.upgrade-shop .upgrade-shop-info .upgrade-shop-info-top .upgrade-shop-inf0-left{
		    margin-left: 10px;
		    height: 60px;
		    display: flex;
		    flex-direction: column;
		    justify-content: space-evenly;
	}
	.upgrade-shop .upgrade-shop-info .upgrade-shop-info-top .upgrade-shop-inf0-left .shopname {
	    color: #fff;
	    font-size: 14px;
	    font-weight: 600;
	}
	.upgrade-shop .upgrade-shop-info .upgrade-shop-info-top .upgrade-shop-inf0-right {
	    position: absolute;
	    right: 72px;
	    height: 50px;
	    display: flex;
	    flex-direction: column;
	    justify-content: space-around;
	}
	.u-fade-enter-active, .u-fade-leave-active{
	    transition-property: opacity;
	}
	.u-tag-wrapper {
	    position: relative;
	}
	.u-tag--warning {
	    background-color: #f9ae3d;
	    border-width: 1px;
	    border-color: #f9ae3d;
	}
	.u-tag--mini {
	    height: 22px;
	    line-height: 22px;
	    padding: 0 5px;
	}
	.u-tag--square {
	    border-radius: 3px;
	}
	.u-tag {
	    display: flex;
	    flex-direction: row;
	    align-items: center;
	    border-style: solid;
	}
	.u-tag__icon {
	    margin-right: 4px;
	}
	.u-icon--right {
	    flex-direction: row;
	    align-items: center;
	}
	.u-icon {
	    display: flex;
	    align-items: center;
	}
	.u-icon__icon {
	    font-family: uicon-iconfont;
	    position: relative;
	    display: flex;
	    flex-direction: row;
	    align-items: center;
	}
	.u-tag__text--warning {
	    color: #fff;
	}
	.u-tag__text--mini {
	    font-size: 12px;
	    line-height: 12px;
	}
	
	.upgrade-shop .upgrade-shop-info .upgrade-shop-info-bottom{
		display: flex;
		    justify-content: space-around;
		    color: #fff;
		    font-size: 14px;
		    margin-top: 20px;
	}
	.upgrade-shop .upgrade-shop-list{
		margin: 10px 10px;
	}
	.shop-info-item{
		display: flex;
		    flex-wrap: wrap;
	}
	.shop-info-item .item{
		width: 50%;
		    display: flex;
		    flex-direction: column;
		    align-items: center;
		    line-height: 30px;
		    font-size: 14px;
		    margin-top: 20px;
	}
</style>
