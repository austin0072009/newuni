<template>
	<scroll-view
		class="wanlshop-category-container"
		:style="{
			height: windowHeight + 'px',
			backgroundColor : homeModules.page ? homeModules.page.style.pageBackgroundColor : ''
		}"
		scroll-y 
		enable-back-to-top
		enable-flex="true"
		@scrolltoupper="handleUpper"
		@scrolltolower="handleLower">
		<wanl-empty src="find_default3x" :text="$('other.empty4')" v-if="goodsList.length === 0"/>
		<view class="pf-content">
			<view class="pf-list" v-for="(item, index) in goodsList">
				<image class="pf-image" :src="$wanlshop.oss(item.image, 400, 0)"></image>
				<text class="pf-title">{{item.title}}</text>
				<view class="bottom">
					<text class="pf-price">${{item.price}}</text>
					<button v-if="item.is_add == 1" class="u-button u-reset-button pf-button u-button--info u-button--circle u-button--mini" @tap="autoShopGoods(item)">{{$t('other.msg43')}}</button>
					<button v-else class="u-button u-reset-button pf-button u-button--info u-button--circle u-button--mini" style="background-color: #fbad8a;" disabled @tap="autoShopGoods(item)">{{$t('other.msg43')}}</button>
				</view>
			</view>
		</view>
		<uni-load-more :status="status" :content-text="contentText" />
	</scroll-view>
</template>

<script>
	export default{
		name: 'wanlShopGhs',
		props:{
			cid:{
				type: Number,
				default: 0
			},
			currentItemId: {
				type: String,
				default: ""
			},
			headHeight: {
				type: Number,
				default: 0
			},
			windowHeight: {
				type: Number,
				default: 0
			},
			homeModules: {
				type: Object,
				default () {
					return {}
				}
			},
		},
		data(){
			return{
				goodsList: [],
				page: 1,
				last_page: 0,
				status: 'loading',
				contentText: {
					contentdown: '',
					contentrefresh: this.$t('product.msg15'),
					contentnomore: this.$t('product.empty2')
				}
			}
		},
		watch:{
			currentItemId(newVal,oldVal){
				if(newVal === 'cid' + this.cid){
					this.loadData('upper')
				}
			}
		},
		mounted() {
			if(this.cid == '1'){
				this.loadData('upper');
			}
		},
		methods:{
			async loadData(type) {
				this.status = 'loading';
				// 判断上拉还是下拉
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
				await this.$api.get({
					url: '/wanlshop/shop/wholesaleList',
					data: {
						cate_id: this.cid,
						page: this.page
					},
					success: res => {
						this.status = 'more';
						if(type === 'lower'){
							this.goodsList = this.goodsList.concat(res.data);
						}else{
							this.goodsList = res.data;
						}
						this.page = res.current_page; //当前页码
						this.last_page = res.last_page; //总页码
					}
				});
			},
			handleUpper() {
				// this.loadData('upper');
			},
			handleLower() {
				this.loadData('lower');
			},
			autoShopGoods(item){
				this.$emit("pThumbsUp",{
					item: item
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wanlshop-category-container{
		&__menu{
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
			grid-auto-flow: row dense;
			grid-gap: 16rpx;
			.item{
				display: flex;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
				image{
					height: 100rpx;
					width: 100rpx;
					border-radius: 6rpx;
				}
			}
		}
		&__seckill{
			
		}
		&__groups{
			background-repeat: no-repeat;
			background-size: 100% auto;
			.title{
				color: #ad4e00;
				display: flex;
				align-items: center;
				justify-content: space-between;
				&>view{
					display: flex;
					align-items: center;
				}
			}
			.list{
				white-space: nowrap;
				.item {
					display: inline-block;
					width: 200rpx;
					overflow: hidden;
					image{
						height: 200rpx;
					}
				}
			}
		}
		&__recommend{
			
		}
		&__separate{
			display: flex;
			align-items: center;
			justify-content: center;
			.line{
				width: 60rpx;
				height: 2rpx;
				background-color: #dedede;
			}
			.content{
				display: flex;
				align-items: center;
				margin: 0 50rpx;
				text+text{
					margin-left: 10rpx;
				}
				[class*="wlIcon-"]{
					font-size: 46rpx;
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
	    width: 48.4%;
	    background-color: #fff;
	    margin-bottom: 10px;
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
	    display: flex;
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