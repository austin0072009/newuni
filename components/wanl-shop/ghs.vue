<template>
	<scroll-view class="wanlshop-category-container">
		<wanl-empty src="find_default3x" :text="$('other.empty4')" v-if="goodsList.length === 0"/>
		<view class="pf-content">
			<view class="pf-list" v-for="(item, index) in goodsList">
				<image class="pf-image" :src="$wanlshop.oss(item.image, 400, 0)"></image>
				<text class="pf-title">{{item.title}}</text>
				<view class="bottom">
					<text class="pf-price">￥{{item.price}}</text>
					<button v-if="item.is_add == 1" class="u-button u-reset-button pf-button u-button--info u-button--circle u-button--mini" @tap="autoShopGoods(item)">{{$t('other.msg43')}}</button>
					<button v-else class="u-button u-reset-button pf-button u-button--info u-button--circle u-button--mini" style="background-color: #fbad8a;" disabled @tap="autoShopGoods(item)">{{$t('other.msg43')}}</button>
				</view>
			</view>
		</view>
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
			}
		},
		data(){
			return{
				goodsList: []
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
			if(this.cid == '163'){
				this.loadData();
			}
		},
		methods:{
			async loadData(type) {
				await this.$api.get({
					url: '/wanlshop/shop/wholesaleList',
					data: {
						cate_id: this.cid
					},
					success: res => {
						this.goodsList = res;
					}
				});
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