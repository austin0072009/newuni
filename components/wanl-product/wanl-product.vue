<template>
	<view>
		<view class="wanl-product">
			<view class="product_warter" :class="dataStyle"
				v-if="dataStyle == 'col-2-10' || dataStyle == 'col-2-15' || dataStyle == 'col-2-20' || dataStyle == 'col-2-25' || dataStyle == 'col-2-30'">
				<view class="wanl-waterfall">
					<view id="wanl-left-cloumn" class="wanl-cloumn">
						<view class="warter left" v-for="(item, index) in leftList" :key="index"
							@tap="handleGoods(item.id)">
							<view class="img-wrap">
								<image class="image" :src="item.image" mode="widthFix"></image>
							</view>
							<view class="content padding-bj">
								<view class="text-cut-2">
									<block v-if="item.shop.isself == 1">
										<view class="cu-tag radius sm bg-red">{{$t('index.proprietary')}}</view>
									</block>
									<block v-else>
										<view class="cu-tag radius sm bg-gray" v-if="item.shop.state == 0">{{$t('index.personal')}}</view>
										<view class="cu-tag radius sm wanl-bg-blue" v-else-if="item.shop.state == 1">{{$t('index.enterprise')}}
										</view>
										<view class="cu-tag radius sm wanl-bg-orange" v-else-if="item.shop.state == 2">
											{{$t('index.the_flagship')}}</view>
									</block>
									<block v-if="dataType === 'groups'">
										<view class="cu-tag radius sm bg-red">
											{{item.is_ladder === 1 ? $t('index.ladder') : item.people_num + $t('index.people')}}{{$t('index.spell_group')}}
										</view>
									</block>
									<text class="margin-left-xs">{{ item.title }}</text>
								</view>
								<view class="goods-tag">
									<!-- <view class="cu-tag radius sm line-red" v-if="item.shop.isself == 1">{{$t('index.official_purchase_at_ease')}}</view>
									<view class="cu-tag radius sm line-gray" v-if="item.isLive"
										@tap="onLive(item.isLive)">LIVE</view> -->
								</view>
								<view class="flex align-center justify-between">
									<view class="text-red text-bold text-lg">
										<text class="text-price">{{ item.price }}</text>
									</view>
									<view class="label_mode">{{$t('index.look')}}</view>
									<!-- <view class="text-sm wanl-gray" v-if="dataType === 'groups'">
										<text>{{$t('index.have_you_spell_group')}} {{$wanlshop.toFormat(item.groups_num, 'hundred')}} {{$t('index.a')}}</text>
									</view>
									<view class="text-sm wanl-gray" v-else>
										<text>{{$wanlshop.toFormat(item.comment, 'hundred')}} {{$t('index.evaluation')}}</text>
									</view> -->
								</view>
							</view>
						</view>
					</view>
					<view id="wanl-right-cloumn" class="wanl-cloumn">
						<view class="warter right" v-for="(item, index) in rightList" :key="index"
							@tap="handleGoods(item.id)">
							<view class="img-wrap">
								<image class="image" :src="item.image" mode="widthFix"></image>
							</view>
							<view class="content padding-bj">
								<view class="text-cut-2">
									<block v-if="item.shop.isself == 1">
										<view class="cu-tag radius margin-right-xs sm bg-red">{{$t('index.proprietary')}}</view>
									</block>
									<block v-else>
										<view class="cu-tag radius sm margin-right-xs bg-gray"
											v-if="item.shop.state == 0">{{$t('index.personal')}}</view>
										<view class="cu-tag radius sm margin-right-xs wanl-bg-blue"
											v-else-if="item.shop.state == 1">{{$t('index.enterprise')}}</view>
										<view class="cu-tag radius sm margin-right-xs wanl-bg-orange"
											v-else-if="item.shop.state == 2">{{$t('index.the_flagship')}}</view>
									</block>
									<text>{{ item.title }}</text>
								</view>
								<view class="goods-tag">
									<!-- <view class="cu-tag radius sm line-red" v-if="item.shop.isself == 1">{{$t('index.official_purchase_at_ease')}}</view>
									<view class="cu-tag radius sm line-gray" v-if="item.isLive"
										@tap="onLive(item.isLive)">LIVE</view> -->
								</view>
								<view class="flex align-center justify-between">
									<view class="text-red text-bold text-lg">
										<text class="text-price">{{ item.price }}</text>
									</view>
									<!-- <view class="text-sm wanl-gray" v-if="dataType === 'groups'">
										<text>{{$t('index.have_you_spell_group')}} {{$wanlshop.toFormat(item.groups_num, 'hundred')}} {{$t('index.a')}}</text>
									</view>
									<view class="text-sm wanl-gray" v-else>
										<text>{{$wanlshop.toFormat(item.comment, 'hundred')}} {{$t('index.evaluation')}}</text>
									</view> -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- ???????????? -->
			<view class="product_list" :class="dataStyle" v-else>
				<view class="item" v-for="(item, index) in dataList" :key="index" @tap="handleGoods(item.id)">
					<view class="img-wrap">
						<image :src="$wanlshop.oss(item.image, 125, 125)" mode="aspectFill"></image>
					</view>
					<view class="content padding-sm">
						<view class="">
							<view class="text-cut-2">
								<block v-if="item.shop.isself == 1">
									<view class="cu-tag radius margin-right-xs sm bg-red">{{$t('index.proprietary')}}</view>
								</block>
								<block v-else>
									<view class="cu-tag radius sm margin-right-xs bg-gray" v-if="item.shop.state == 0">
										{{$t('index.personal')}}</view>
									<view class="cu-tag radius sm margin-right-xs wanl-bg-blue"
										v-else-if="item.shop.state == 1">{{$t('index.enterprise')}}</view>
									<view class="cu-tag radius sm margin-right-xs wanl-bg-orange"
										v-else-if="item.shop.state == 2">{{$t('index.the_flagship')}}</view>
								</block>
								<text>{{ item.title }}</text>
							</view>
							<view class="goods-tag">
								<view class="cu-tag radius sm line-red" v-if="item.shop.isself == 1">{{$t('index.official_purchase_at_ease')}}</view>
								<view class="cu-tag radius sm line-gray" v-if="item.isLive" @tap="onLive(item.isLive)">
									LIVE</view>
							</view>
						</view>
						<view class="flex align-center justify-between">
							<view class="text-red text-bold text-lg">
								<text class="text-price">{{ item.price }}</text>
							</view>
							<view class="text-sm wanl-gray">
								<text class="margin-right">{{$wanlshop.toFormat(item.comment, 'hundred')}} {{$t('index.evaluation')}}</text>
								<text>{{ item.comment > 0 ? parseInt((item.praise / item.comment) * 100) : 0 }}%
									{{$t('index.good_comments')}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * wanlProduct ??????
	 * @description ???????????? ???????????????????????????????????? https://www.wanlshop.com????????????????????????????????????????????????????????????
	 * @????????????WanlShop ????????????2020SR0255711 ?????????V1.0.0
	 * @property {Array} dataList ????????????
	 * @property {String} dataStyle ????????????
	 * @example <wanl-product />
	 */
	export default {
		name: 'wanlProduct',
		props: {
			dataList: {
				type: Array,
				required: true,
				default: function() {
					return [];
				}
			},
			dataStyle: {
				type: String,
				default: 'col-2-20'
			},
			dataType: {
				type: String,
				default: 'goods'
			}
		},
		data() {
			return {
				addTime: 180,
				leftList: [],
				rightList: [],
				tempList: [],
				children: []
			}
		},
		watch: {
			copyFlowList(nVal, oVal) {
				// ???????????????????????????????????????????????????
				let startIndex = Array.isArray(oVal) && oVal.length > 0 ? oVal.length : 0;
				if (nVal.slice(startIndex).length == 0) {
					this.leftList = [];
					this.rightList = [];
					this.tempList = this.cloneData(this.copyFlowList);
				}else{
					this.tempList = this.tempList.concat(this.cloneData(nVal.slice(startIndex)));
				}
				this.splitData();
			},
		},
		mounted() {
			this.tempList = this.cloneData(this.copyFlowList);
			this.splitData();
		},
		computed: {
			// ??????flowList????????????????????????watch??????????????????????????????
			copyFlowList() {
				return this.cloneData(this.dataList);
			}
		},
		methods: {
			async splitData() {
				if (!this.tempList.length) return;
				let rightRect = await this.getRect('#wanl-right-cloumn');
				let leftRect = await this.getRect('#wanl-left-cloumn');
				// ??????????????????????????????????????????????????????????????????????????????
				let item = this.tempList[0];
				if(!item) return ;
				item.image = this.$wanlshop.oss(item.image, 172, 0, 1);
				item.comment = this.$wanlshop.toFormat(item.comment, 'hundred');
				item.praise = item.comment > 0 ? parseInt((item.praise / item.comment) * 100) : 0;
				if (leftRect.height < rightRect.height) {
					this.leftList.push(item);
				} else if (leftRect.height > rightRect.height) {
					this.rightList.push(item);
				} else {
					// ????????????????????????????????????????????????????????????????????????
					// ?????????????????????????????????????????????????????????0??????????????????????????????????????????????????????????????????
					if (this.leftList.length <= this.rightList.length) {
						this.leftList.push(item);
					} else {
						this.rightList.push(item);
					}
				}
				// ??????????????????????????????
				this.tempList.splice(0, 1);
				// ?????????????????????????????????????????????
				if (this.tempList.length) {
					setTimeout(() => {
						this.splitData();
					}, this.addTime)
				}
			},
			// ????????????????????????????????????
			cloneData(data) {
				return JSON.parse(JSON.stringify(data));
			},
			getRect(selector, all) {
				return new Promise(resolve => {
					let query = null;
					// ????????????????????????????????????.in(this)????????????????????????
					// #ifndef MP-ALIPAY
					query = uni.createSelectorQuery().in(this)
					// #endif
					// #ifdef MP-ALIPAY
					query = uni.createSelectorQuery()
					// #endif
					query[all ? 'selectAll' : 'select'](selector)
						.boundingClientRect(rect => {
							if (all && Array.isArray(rect) && rect.length) {
								resolve(rect)
							}
							if (!all && rect) {
								resolve(rect)
							}
						})
						.exec()
				})
			},
			handleGoods(id) {
				if (this.dataType === 'goods') {
					this.onGoods(id);
				} else if (this.dataType === 'groups') {
					this.$wanlshop.to(`/pages/apps/groups/goods?id=${id}`);
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.wanl-waterfall {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		.wanl-cloumn {
			display: flex;
			flex: 1;
			flex-direction: column;
			height: auto;
			width: 50%;
			.wanl-image {
				width: 100%;
			}
		}
	}
</style>
