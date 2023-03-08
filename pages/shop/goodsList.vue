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
				<view class="toolbar flex padding-lr-bj align-center" style="border: 1px solid red;padding: 0;">
					<scroll-view
						class="scroll"
						scroll-x
						scroll-with-animation
						:scroll-left="scrollLeft"
					>
						<view class="scroll__item" :class="{ action: currentItemId === 'zy' }" @tap="handleSelect('zy', 0)" style="padding: 0 17%;">
							{{$t('other.msg18')}}
						</view>
						<view class="scroll__item" :class="{ action: currentItemId === 'gys' }" @tap="handleSelect('gys', 1)" style="padding: 0 15%;">
							{{$t('other.msg19')}}
						</view>
					</scroll-view>
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
			<swiper-item item-id="zy">
				<view class="pf-content">
					<scroll-view
						class="wanlshop-category-container"
						:style="{
							height: windowHeight + 'px'
						}"
						scroll-y 
						@scrolltoupper="handleUpper"
						@scrolltolower="handleLower">
						<wanl-empty src="find_default3x" :text="$t('other.empty2')" v-if="ghLength == 0"/>
						<view class="pf-list" v-for="(item, index) in ghList">
							<image class="pf-image" :src="$wanlshop.oss(item.image, 400, 0)"></image>
							<text class="pf-title">{{item.title}}</text>
							<view class="bottom">
								{{$t('other.msg20')}}:
								<text class="pf-price">${{item.price}}</text>
							</view>
							<view style="width: 100%;text-align: center;padding: 0.2rem;background: red;color: #fff;border-radius: 0.2rem;font-size: 25rpx;" @tap="del(1,item.id)">
								{{$t('other.msg44')}}
							</view>
						</view>
						<!-- <uni-load-more v-if="ghList.length != 0" :status="status" :content-text="contentText" /> -->
					</scroll-view>
				</view>
			</swiper-item>
			<swiper-item item-id="gys">
				<view class="pf-content">
					<scroll-view
						class="wanlshop-category-container"
						:style="{
							height: windowHeight + 'px'
						}"
						scroll-y 
						@scrolltoupper="handleUpper"
						@scrolltolower="handleLower">
						<wanl-empty src="find_default3x" :text="$t('other.empty2')" v-if="phLength == 0"/>
						<view class="pf-list" v-for="(item, index) in phList">
							<image class="pf-image" :src="$wanlshop.oss(item.image, 400, 0)"></image>
							<text class="pf-title">{{item.title}}</text>
							<view class="bottom">
								{{$t('other.msg21')}}:
								<text class="pf-price">${{item.jh_price}}</text>
							</view>
							<view class="bottom">
								{{$t('other.msg22')}}:
								<text class="pf-price">${{item.price}}</text>
							</view>
							<!-- <view style="width: 100%;text-align: center;padding: 0.2rem;background: red;color: #fff;border-radius: 0.2rem;font-size: 25rpx;" @tap="del(2,item.id)">
								{{$t('other.msg45')}}
							</view> -->
						</view>
						<!-- <uni-load-more v-if="phList.length != 0" :status="status2" :content-text="contentText" /> -->
					</scroll-view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	computed: {
		...mapState(['common'])
	},
	data() {
		return {
			headHeight: 75,
			windowHeight: 0,
			headTop: 0,
			currentItemId: 'zy',
			currentData: {},
			scrollLeft: 0,
			ghList:[],
			ghLength:0,
			phList:[],
			phLength:0,
			page: 1,
			last_page: 0,
			status: 'loading',
			page2: 1,
			last_page2: 0,
			status2: 'loading',
			contentText: {
				contentdown: '',
				contentrefresh: this.$t('product.msg15'),
				contentnomore: this.$t('product.empty2')
			}
		};
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title:this.$t('other.goodslist_title')
		})
	},
	onShow() {
		// 计算页面尺寸
		let sys = this.$wanlshop.wanlsys();
		this.headTop = sys.top;
		this.headHeight = sys.height;
		this.windowHeight = sys.windowHeight;
		this.getList('upper');
	},
	methods: {
		async getList(type){
			if(this.currentItemId == 'zy'){
				this.status = 'loading';
				if(type === 'upper'){
					this.page = 1;
				}else if(type === 'lower'){
					if (this.page >= this.last_page) {
						this.status = 'noMore';
						return false;
					} else {
						this.page += 1;
					}
				}
				this.$api.get({
					url: '/wanlshop/shop/goodList',
					data: {
						type: 1,
						page: this.page
					},
					success: res => {
						this.status = 'more';
						if(type === 'lower'){
							this.ghList = this.ghList.concat(res.data);
						}else{
							this.ghList = res.data;
						}
						this.page = res.current_page; //当前页码
						this.last_page = res.last_page; //总页码
						this.ghLength = this.ghList.length;
					}
				});
			}
			
			if(this.currentItemId == 'gys'){
				this.status2 = 'loading';
				if(type === 'upper'){
					this.page2 = 1;
				}else if(type === 'lower'){
					if (this.page2 >= this.last_page2) {
						this.status2 = 'noMore';
						return false;
					} else {
						this.page2 += 1;
					}
				}
				this.$api.get({
					url: '/wanlshop/shop/goodList',
					data: {
						type: 2,
						page: this.page2
					},
					success: res => {
						this.status2 = 'more';
						if(type === 'lower'){
							this.phList = this.phList.concat(res.data);
						}else{
							this.phList = res.data;
						}
						this.page2 = res.current_page; //当前页码
						this.last_page2 = res.last_page; //总页码
						this.phLength = this.phList.length;
					}
				});
			}
		},
		// 选择Tag
		handleSelect(id, index) {
			this.currentItemId = id;
			this.scrollLeft = (index - 1) * 50;
			this.getList('upper');
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
		async del(type,id){
			this.$api.get({
				url: '/wanlshop/shop/goodDel',
				data: {
					type: type,
					id: id
				},
				success: res => {
					this.$wanlshop.msg(this.$t('other.msg46'));
					this.getList('upper');
				}
			});
		},
		handleUpper() {
			// this.loadData('upper');
		},
		handleLower() {
			this.getList('lower');
		},
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
					// margin-right: 40rpx;
					width: 50%;
					&.action {
						position: relative;
						font-weight: bold;
						font-size: 30rpx;
						background: red;
						color: #fff;
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

.pf-content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin: 0 9px;
    margin-top: 12px;
}
.pf-content .pf-list {
    width: 48%;
    background-color: #fff;
    margin-bottom: 10px;
	float: left;
	margin:0 1%;
}
.pf-content .pf-list .pf-image {
    width: 138px;
    height: 138px;
    margin: 10px 10%;
}
.pf-content .pf-list .pf-title {
    display: block;
    margin: 5px 5%;
    font-size: 13px;
    height: 60px;
    overflow: hidden;
}
.pf-content .pf-list .bottom {
    align-items: center;
    width: 90%;
    margin: 8px 5%;
    justify-content: space-between;
    width: 100%;
}
.pf-content .pf-list .bottom .pf-price {
    color: #ff4f00;
}
.pf-content .pf-list .bottom .pf-button {
    background-color: #ff4f00;
    font-size: 12px;
    color: #fff;
    width: 70px;
}
.u-button--circle {
    border-top-right-radius: 100px;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
    border-bottom-right-radius: 100px;
}
.u-button--info {
    color: #323233;
    background-color: #fff;
    border-color: #ebedf0;
    border-width: 1px;
    border-style: solid;
}
.u-button--mini {
    height: 22px;
    font-size: 10px;
    min-width: 50px;
    padding: 0 8px;
}
.u-button {
    position: relative;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    flex-direction: row;
}
</style>
