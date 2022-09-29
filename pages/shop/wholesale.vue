<template>
	<view class="wanlshop-container">
		<view
			v-if="common.modulesData.homeModules.page"
			class="wanlshop-container__head"
			:style="{
				height: headHeight + 'px',
				color: '#000000'
			}"
		>
			<view :style="{ height: headHeight + 'px', paddingTop: headTop + 'px' }" >
				<view class="toolbar flex padding-lr-bj align-center">
					<scroll-view
						class="scroll"
						scroll-x
						scroll-with-animation
						:scroll-left="scrollLeft"
					>
						<view class="scroll__item" v-for="(item, index) in common.modulesData.categoryModules" :key="item.id" :class="{ action: currentItemId === 'cid' + item.id }" @tap="handleSelect('cid' + item.id, index)" >
							{{ item.name }}
						</view>
					</scroll-view>
					<view class="category flex align-center" @tap="handleModal">
						<text v-if="isModal" class="wlIcon-fanhui3"></text>
						<text v-else class="wlIcon-fanhui4"></text>
					</view>
				</view>
			</view>
		</view>
		<!-- 主体 -->
		<swiper
			class="wanlshop-container__main"
			:current-item-id="currentItemId"
			:style="{
				height: windowHeight + 'px',
				paddingTop: '40px'
			}"
			@change="changeCurrent"
			@animationfinish="animationFinish"
		>
			<!-- 分类 -->
			<swiper-item
				v-for="(item, index) in common.modulesData.categoryModules"
				:key="item.id"
				:item-id="'cid' + item.id"
			>
				<wanl-shop-ghs
					:cid="item.id"
					:currentItemId="currentItemId"
					v-on:pThumbsUp="thumbsUpChange"
				/>
			</swiper-item>
		</swiper>
		<!-- 弹窗 -->
		<view class="WANL-MODAL" @touchmove.stop.prevent="moveHandle">
			<!-- 顶部 -->
			<view class="cu-modal top-modal" :class="{ show: isModal }" @tap="handleModal">
				<view
					class="cu-dialog padding-lr-bj padding-bottom-bj"
					:style="{ paddingTop: headHeight + 40 + 'px' }"
					@tap.stop=""
				>
					<view class="category text-min">
						<view
							class="item round bg-gray"
							v-for="(item, index) in common.modulesData.categoryModules"
							:key="item.id"
							:class="{ action: currentItemId === 'cid' + item.id }"
							@tap="handleSelect('cid' + item.id, index)"
						>
							{{ item.name }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="u-popup" v-if="showSj">
			<view class="u-transition u-fade-enter-to u-fade-enter-active" style="transition-duration: 350ms; transition-timing-function: ease-out; position: fixed; inset: 0px; z-index: 100; background-color: rgba(0, 0, 0, 0.5);"></view>
			<view class="u-transition u-fade-zoom-enter-to u-fade-zoom-enter-active" style="transition-duration: 300ms; transition-timing-function: ease-out; z-index: 100; position: fixed; display: flex; align-items: center; justify-content: center; inset: 0px;">
				<view class="u-popup__content" style="border-radius: 10px;">
					<view class="content">
						<view class="text">
							<view class="item">{{$t('other.msg38')}}：<text class="price">￥{{good.price}}</text>
							</view>
							<view class="item">{{$t('other.msg39')}}：<text class="price">￥{{good.ture_price}}</text>
							</view>
						</view>
						<view class="button">
							<button @tap="qxsj()" class="u-button u-reset-button u-button--error u-button--circle u-button--normal" app-parameter="" send-message-title="" send-message-path="" lang="en" data-name="" session-from="" send-message-img="">
								<text class="u-button__text" style="font-size: 14px;">{{$t('other.msg40')}}</text>
							</button>
							<button @tap="qrsj()" class="u-button u-reset-button u-button--success u-button--circle u-button--normal" app-parameter="" send-message-title="" send-message-path="" lang="en" data-name="" session-from="" send-message-img="">
								<text class="u-button__text" style="font-size: 14px;">{{$t('other.msg41')}}</text>
							</button>
						</view>
					</view>
					<view class="u-safe-bottom u-safe-area-inset-bottom"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import wanlShopGhs from '@/components/wanl-shop/ghs';
export default {
	computed: {
		...mapState(['common'])
	},
	components: {
		wanlShopGhs
	},
	data() {
		return {
			headHeight: 75,
			windowHeight: 0,
			headTop: 0,
			currentItemId: 'cid163',
			currentData: {},
			scrollLeft: 0,
			isModal: false,
			showSj: false,
			good:{}
		};
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title:this.$t('other.wholesale_title')
		})
	},
	onShow() {
		// 计算页面尺寸
		let sys = this.$wanlshop.wanlsys();
		this.headTop = sys.top;
		this.headHeight = sys.height;
		this.windowHeight = sys.windowHeight;
		
	},
	methods: {
		// 选择Tag
		handleSelect(id, index) {
			this.currentItemId = id;
			this.scrollLeft = (index - 1) * 50;
		},
		// 弹出层
		handleModal() {
			this.isModal = !this.isModal;
		},
		// 动画
		animationFinish(e) {
			//#ifdef APP-PLUS
			this.changeCurrent(e);
			//#endif
		},
		// 滚动的tag
		changeCurrent(e) {
			this.currentItemId = e.detail.currentItemId;
			this.scrollLeft = (e.detail.current - 1) * 50;
		},
		moveHandle() {},
		thumbsUpChange(item) {
			// console.log("子组件传来的值", item)
			item = item.item;
			item.ture_price = (item.price * 1.15).toFixed(2);;
			this.good = item;
			this.showSj = true;
		},
		qxsj(){
			this.showSj = false;
		},
		async qrsj(){
			this.$api.get({
				url: '/wanlshop/shop/autoShopGoods',
				data: {
					id: this.good.id
				},
				success: res => {
					this.$wanlshop.msg(this.$t('other.msg42'));
					this.good = {};
					this.showSj = false;
				}
			});
		}
	}
};
</script>

<style lang="scss">
.wanlshop-container {
	&__head {
		position: fixed;
		left: 0;
		right: 0;
		z-index: 999;
		background-size: 100% auto;
		background-repeat: no-repeat;
		.navigater {
			height: 86rpx;
			padding-left: 25rpx;
			padding-right: 25rpx;
			/* #ifdef MP */
			padding-right: 220rpx;
			/* #endif */
			.search {
				flex: 1;
				background-color: #fff;
				height: 66rpx;
				border: 2rpx solid #fff;
				.icon {
					margin: 0 20rpx;
				}
				swiper {
					height: 100%;
					width: 100%;
					margin-right: 10rpx;
					swiper-item {
						display: flex;
						align-items: center;
					}
				}
			}
		}
		.toolbar {
			.scroll {
				flex: 1;
				white-space: nowrap;
				overflow: hidden;
				width: 100%;
				&__item {
					position: relative;
					z-index: 2;
					font-size: 28rpx;
					display: inline-flex;
					height: 58rpx;
					align-items: center;
					margin-right: 40rpx;
					&.action {
						position: relative;
						font-weight: bold;
						font-size: 30rpx;
						&::after {
							content: ' ';
							position: absolute;
							bottom: 0;
							left: 50%;
							transform: translateX(-50%);
							height: 4rpx;
							width: 30rpx;
							border-radius: 6rpx;
							background-color: #fff;
						}
					}
				}
			}
			.category {
				box-shadow: #eee -16rpx 0 16rpx -16rpx;
				height: 58rpx;
				font-size: 28rpx;
				padding-left: 25rpx;
			}
		}
	}
	&__main {
		position: relative;
		z-index: 99;
	}
	.WANL-MODAL {
		.cu-modal {
			&.top-modal {
				background: rgba(0, 0, 0, 0.6);
				text-align: inherit;
				.cu-dialog {
					background: #fff;
					border-radius: 0 0 18rpx 18rpx;
					.category {
						display: grid;
						grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
						grid-auto-flow: row dense;
						grid-gap: 16rpx;
						.item {
							display: flex;
							align-items: center;
							justify-content: center;
							padding: 12rpx 0;
							border: 2rpx solid transparent;
							&.action {
								background-color: transparent;
								border-color: #f40;
								color: #f40;
								font-weight: bold;
							}
						}
					}
				}
			}
		}
	}
}

	.u-popup{
	    flex: 1;
	}
	.u-popup__content{
	    background-color: #fff;
	    position: relative;
	}
	.content{
	    border-radius: 1rem;
	    padding: 1rem 2rem;
	}
	.content .text{
	    padding: 0.5rem;
	    line-height: 60rpx;
	    font-size: 30rpx;
	    text-align: center;
	}
	.content .button{
	    display: flex;
	}
	.content .text .item .price{
	    color: #f00000;
	    font-weight: 600;
	}
	.content .button .u-button{
	    width: 60%;
	    margin: 0 0.5rem;
	}
	.u-button--circle{
	    border-radius: 1rem;
	}
	.u-button--error{
	    color: #fff;
	    background-color: #f56c6c;
	    border-color: #f56c6c;
	    border-width: 1px;
	    border-style: solid;
	}
	.u-button{
	    height: 2rem;
	    position: relative;
	    align-items: center;
	    justify-content: center;
	    display: flex;
	    flex-direction: row;
	    box-sizing: border-box;
	    flex-direction: row;
	}
	.u-button--success{
	    color: #fff;
	    background-color: #5ac725;
	    border-color: #5ac725;
	    border-width: 1px;
	    border-style: solid;
	}
</style>
