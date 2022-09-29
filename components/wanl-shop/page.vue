<template>
	<scroll-view class="wanlshop-page-container" :style="{
			height: windowHeight + 'px'
		}" scroll-y enable-back-to-top enable-flex="true" @scrolltoupper="handleUpper" @scrolltolower="handleLower">
		<!-- 商家数据 -->
		<view v-if="shopData" class="wanlshop-shop-container__shop padding-sm radius-bock"
			@click="$wanlshop.to(`info?id=${shopData.id}`)">
			<view class="info">
				<view class="name text-cut text-bold">
					<block v-if="shopData.isself === 1">
						<view class="cu-tag radius sm bg-red">{{$t('index.proprietary')}}</view>
					</block>
					<block v-else>
						<view class="cu-tag radius sm wanl-bg-pink" v-if="shopData.state == 0">{{$t('index.personal')}}</view>
						<view class="cu-tag radius sm wanl-bg-blue" v-else-if="shopData.state == 1">{{$t('index.enterprise')}}</view>
						<view class="cu-tag radius sm wanl-bg-orange" v-else-if="shopData.state == 2">{{$t('index.the_flagship')}}</view>
					</block>
					<text class="margin-left-xs"> {{shopData.shopname}} </text>
				</view>
				<view class="exponent text-min wanl-gray-dark">
					<view>
						<text class="margin-right-xs">{{$t('shop.msg10')}}</text> {{shopData.find_user.fans}}
					</view>
				</view>
			</view>
			<view class="menu">
				<button v-if="shopData.isLive" class="cu-btn wlIcon wanl-bg-pink margin-right-sm" @click.stop="onLive(shopData.isLive.id)">
					<text class="wlIcon-icon_zhibo-mian text-bold"></text>
				</button>
				<button v-if="shopData.isFollow === 0" class="cu-btn radius-bock text-sm bg-white"
					@click.stop="handleFollow">
					<text class="wlIcon-31xuanze text-bold margin-right-xs"></text> {{$t('index.follow')}}
				</button>
				<button v-else class="cu-btn radius-bock text-sm bg-white" @click.stop="handleFollow">
					<text class="wlIcon-31guanbi text-bold margin-right-xs"></text> {{$t('good.msg5')}}
				</button>
			</view>
		</view>
		<!-- 自定义首页 -->
		<view v-if="pageModules" :style="{
				paddingTop: headHeight + 'px'
			}" style="background-size: 100% auto;padding-left: 12px;padding-right: 12px;">
			<view v-for="(item, index) in pageModules.item" :key="index">
				<wanl-page-banner v-if="item.type == 'banner'" :pageData="item" />
				<wanl-page-image v-if="item.type == 'image'" :pageData="item" />
				<wanl-page-advert-banner v-if="item.type == 'advertBanner'" :pageData="item" :advertData="adData.pageAdverts" />
				<wanl-page-advert-image v-if="item.type == 'advertImage'" :pageData="item" :advertData="adData.pageAdverts" />
				<wanl-page-video v-if="item.type == 'video'" :pageData="item" />
				<wanl-page-menu v-if="item.type == 'menu'" :pageData="item" />
				<wanl-page-notice v-if="item.type == 'notice'" :pageData="item" />
				<wanl-page-article v-if="item.type == 'article'" :pageData="item" />
				<wanl-page-headlines v-if="item.type == 'headlines'" :pageData="item" />
				<wanl-page-search v-if="item.type == 'search'" :pageData="item" />
				<wanl-page-activity v-if="item.type == 'activity'" :pageData="item" />
				<wanl-page-category-title v-if="item.type == 'categoryTitle'" :pageData="item" />
				<wanl-page-classify v-if="item.type == 'classify'" :pageData="item" />
				<wanl-page-likes v-if="item.type == 'likes'" :pageData="item" :lower="likesLower"/>
				<wanl-page-goods v-if="item.type == 'goods'" :pageData="item" />
				<wanl-page-groups v-if="item.type == 'groups'" :pageData="item" :isShop="shopData"/>
				<wanl-page-bargain v-if="item.type == 'bargain'" :pageData="item" />
				<wanl-page-seckill v-if="item.type == 'seckill'" :pageData="item" />
				<wanl-page-empty v-if="item.type == 'empty'" :pageData="item" />
				<wanl-page-division v-if="item.type == 'division'" :pageData="item" />
			</view>
			<!-- <uni-load-more status="noMore" :content-text="contentText" /> -->
			<view v-if="shopData" class="safeAreaBottom"> </view>
		</view>
		<wanl-empty v-else src="find_default3x" :text="$t('shop.msg11')" />
	</scroll-view>
</template>

<script>
	export default {
		name: "WanlShopPage",
		props: {
			windowHeight: {
				type: Number,
				default: 0
			},
			headHeight: {
				type: Number,
				default: 0
			},
			headTop: {
				type: Number,
				default: 0
			},
			shopData: {
				type: Object,
				default () {}
			},
			pageModules: {
				type: Object,
				default () {}
			},
			adData: {
				type: Object,
				default () {}
			}
		},
		data() {
			return {
				likesLower: 0,
				contentText: {
					contentdown: '下拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '我是有底线的'
				}
			}
		},
		methods: {
			handleFollow() {
				this.$emit('handleHandleFollow')
			},
			// 上拉刷新
			handleUpper(e) {},
			// 下拉加载
			handleLower(e) {
				this.likesLower = e.timeStamp
			}
		}
	}
</script>

<style lang="scss">
	.wanlshop-shop-container {
		&__shop {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: rgba(0, 0, 0, .05);
			margin: 0 16rpx 16rpx 16rpx;

			.info {
				width: calc(100% - 260rpx);
				display: flex;
				align-content: space-between;
				flex-wrap: wrap;
				height: 85rpx;
				.name{
					width: 90%;
				}
				.exponent{
					display: flex;
				}
			}

			.menu {
				text-align: right;
				width: 260rpx;
			}
		}
	}
</style>