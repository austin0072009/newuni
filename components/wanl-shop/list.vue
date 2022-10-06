<template>
	<scroll-view class="wanlshop-category-container">
		<wanl-empty src="find_default3x" :text="$t('other.empty')" v-if="list.length === 0"/>
		<view class="pf-content" style="margin-top: 2rem;">
			<view style="width: 100%;background-color: #fff;padding: 0.5rem;border-radius: 0.5rem;" v-for="(item, index) in list">
				<view style="width: 100%;height: 3rem;">
					<view style="width: 18%;float: left;">
						<image :src="$wanlshop.oss(item.avatar, 400, 0)" class="shop-image" mode="heightFix"></image>
					</view>
					<view class="shop-name">
						<!-- <view style="height: 1.5rem;line-height: 1.5rem;font-size: 30rpx;font-weight: bold;">{{item.shopname}}</view>
						<view style="width: 30%;float: left;text-align: center;">
							<view style="height: 3rem;line-height: 3rem;color: red;" @tap="toShop(item.id)">{{$t('other.enter_store')}}</view>
						</view> -->
						<text>{{item.shopname}}</text>
						<text class="go-shop" @tap="toShop(item.id)">{{$t('other.enter_store')}}</text>
					</view>
					<view class="jianjie">
						<text class="zhuying"><span>{{item.description}}</span></text>
					</view>
				</view>
				<view class="hand">
					<scroll-view :scroll-x="true" style="white-space: nowrap;">
						<view class="dataInfo">
							<view class="dataList" v-for="(item2, index2) in item.goods" @tap="toGood(item2.id)">
								<view class="list">
									<image :src="$wanlshop.oss(item2.image, 400, 0)" style="width: 100%;height: 3rem;"></image>
									<view style="width: 100%; text-align: center;color: red;">${{item2.price}}</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default{
		name: 'wanlShopList',
		props:{
			cid:{
				type: Number,
				default: 0
			},
			currentItemId: {
				type: String,
				default: "1"
			},
			flag:{
				type: Number,
				default:0
			}
		},
		data(){
			return{
				list: []
			}
		},
		watch:{
			currentItemId(newVal,oldVal){
				if(newVal === 'cid' + this.cid){
					this.loadData()
				}
			}
		},

		mounted() {
			if(this.flag == 0 ){
				this.loadData();
				 console.log(11111111);
				 flag++;
			}
		},
		methods:{
			async loadData(type) {
				await this.$api.get({
					url: '/wanlshop/shop/shopList',
					data: {
						cate_id: this.cid
					},
					success: res => {
						this.list = res;
					}
				});
			},
			toShop(id){
				uni.navigateTo({
					url: `/pages/shop/index?id=${id}`
				})
			},
			toGood(id){
				uni.navigateTo({
					url: `/pages/product/goods?id=${id}`
				})
			}
		}
	}
	
	
</script>

<style lang="scss" scoped>
	.shop-image {
		width: 60px;
		height: 60px;
		float: left;
		border-radius: 3px;
		margin-top: 8px;
		margin-bottom: 5px;
	}
	.shop-name {
		padding-left: 15px;
		line-height: 40px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.go-shop {
		float: right;
		font-weight: 700;
		padding-right: 15px;
		color: #fa436a;
		font-weight: 700;
		font-size: 14px;
	}
	.jianjie {
		font-size: 12px;
		padding-left: 15px;
		color: #666;
		height: 30px;
		line-height: 30px;
		border-bottom: 1px solid #f5f5f5;
	}
	.zhuying {
		float: left;
		padding-left: 15px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: block;
		width: 60%;
	}
	.hand {
			width: 100%;
			margin: 0 auto;
		}
		
		.dataInfo {
			width: 100%;
			display: flex;
			padding: 0px;
			background-color: rgb(250, 250, 250);
			border-radius: 10px;
		}
	 
		.dataList {
			margin: 0.5rem;
		}
	 
		.dataList:first-child {
			margin-left: 0;
		}
	 
		.list {
			width: 3rem;
			display: inline-block;
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