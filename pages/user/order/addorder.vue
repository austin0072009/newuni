<template>
	<view>
		<view class="edgeInsetTop"></view>
		<view class="wanl-order"> 
			<view class="address cu-list menu-avatar margin-bj radius-bock">
				<view class="cu-item">
					<view class="cu-avatar round wanl-bg-orange"><text class="wlIcon-weizhi1"></text></view>
					<view class="content" v-if="addressData.address" @tap="userAddress()">
						<view>
							<text class="wanl-pip margin-right-sm">{{ addressData.name }}</text>
							<text class="wanl-gray-light text-sm">{{ addressData.mobile }}</text>
						</view>
						<view class="text-sm wanl-pip text-cut">{{ addressData.province}} {{ addressData.city }} {{ addressData.district }} {{ addressData.address }}</view>
					</view>
					<view class="content" @tap="addAddress('newadd')" v-else><view class="text-sm wanl-pip text-cut">{{$t('order.addorder_msg1')}}</view></view>
					<view class="action"><text class="wlIcon-fanhui2 text-lg"></text></view>
				</view>
			</view>
			<view v-for="(shop, index) in orderData.lists" :key="index" class="lists bg-white margin-bj radius-bock">
				<view class="shopname">
					<text class="wlIcon-dianpu2 text-orange margin-right-sm"></text>
					<text class="wanl-pip text-df">{{ shop.shop_name }}</text>
				</view>
				<view class="cu-list menu-avatar">
					<view class="cu-item margin-bottom" v-for="(goods, key) in shop.products" :key="key">
						<view class="cu-avatar radius-bock" :style="{ backgroundImage: 'url(' + $wanlshop.oss(goods.image, 77, 77) + ')' }"></view>
						<view class="content">
							<view class="text-sm text-cut-2">{{ goods.title }}</view>
							<view class="wanl_sku text-sm">
								<text v-for="(item, skey) in goods.sku.difference" :key="skey">
								<block v-if="skey != 0">-</block>{{ item }}
								</text>
							</view>
						</view>
						<view class="action">
							<view class="wanl-pip text-sm text-price">{{ goods.sku.price }}</view>
							<view class="wanl-gray-light text-sm">x{{ goods.number }}</view>
						</view>
					</view>
				</view>
				<form>
					<!-- <view class="cu-form-group" v-if="cartType">
						<view class="wanl-gray-light title">????????????</view>
						<uni-number-box :min="1" :max="orderData.lists[0].products[0].sku.stock" :value="shop.number" @change="changeNum"></uni-number-box>
					</view> -->
					<view class="cu-form-group">
						<view class="wanl-gray-light title">{{$t('order.addorder_msg2')}}</view>
						<view class="picker">{{shop.freight.name}} <text class="text-price margin-left-xs">{{shop.freight.price}}</text></view>
					</view>
					<view class="cu-form-group" @tap="queryCoupon(index)">
						<view class="wanl-gray-light title">{{$t('order.addorder_msg3')}}</view>
						<view class="picker"> 
							<block v-if="couponData[index]">
								<text class="wlIcon-youhuiquantuangou text-red margin-right-xs"></text>
								<block v-if="couponData[index].type == 'reduction' || (couponData[index].type == 'vip' && couponData[index].usertype == 'reduction')">
									<text>{{$t('coupon.full')}}{{Number(couponData[index].limit)}}{{$t('coupon.reduction')}}</text> ${{Number(couponData[index].price)}}
								</block>
								<block v-if="couponData[index].type == 'discount' || (couponData[index].type == 'vip' && couponData[index].usertype == 'discount')">
									<text>{{$t('coupon.full')}}{{Number(couponData[index].limit)}}{{$t('coupon.play')}}</text> {{Number(couponData[index].discount)}} {{$t('coupon.fold')}}
								</block>
								<block v-if="couponData[index].type == 'shipping'">
									<text>{{$t('coupon.full')}}{{Number(couponData[index].limit)}}</text>{{$t('coupon.package_mail')}}
								</block>
							</block>
							<block v-else>
								<text class="text-gray">{{$t('good.msg43')}}</text>
							</block>
							<text class="wlIcon-fanhui2 margin-left"></text>
						</view>
					</view>
					<view class="cu-form-group align-start">
						<view class="wanl-gray-light title">{{$t('order.addorder_msg4')}}</view>
						<textarea maxlength="-1" v-model="shop.remarks" :placeholder="$t('order.addorder_msg5')"></textarea>
					</view>
				</form>
				<view class="text-right margin-bj text-sm">
					<text class="wanl-gray">{{$t('order.addorder_msg6')}}{{ shop.number }}{{$t('index.a')}}???</text>
					{{$t('order.addorder_msg7')}}???
					<text class="text-price text-orange">{{ shop.sub_price }}</text>
				</view>
			</view>
			<view class="safeAreaBottom"> </view>
			<!-- ????????? -->
			<view class="WANL-MODAL text-sm" @touchmove.stop.prevent="moveHandle">
				<!-- ????????? -->
				<view class="cu-modal bottom-modal" :class="modalName == 'coupon' ? 'show' : ''" @tap="hideModal">
					<view class="cu-dialog bg-bgcolor" @tap.stop="">
						<view class="wanl-modal">
							<view class="head padding-bj">
								<view class="content"><view class="text-lg">{{$t('good.msg38')}}</view></view>
								<view class="close wlIcon-31guanbi" @tap="hideModal"></view>
							</view>
							<scroll-view class="wanl-coupon scroll-y" scroll-y="true" v-if="couponIndex != null">
								<view v-for="(coupon, index) in orderData.lists[couponIndex].coupon" :key="index" :class="coupon.type" class="item margin-bottom-bj radius-bock">
									<image :src="$wanlshop.appstc('/coupon/bg_coupon_3x.png')" class="coupon-bg"></image>
									<image :src="$wanlshop.appstc('/coupon/img_couponcentre_received_3x.png')" class="coupon-sign" v-if="coupon.state"></image>
									<view class="item-left">
										<block v-if="coupon.type == 'reduction' || (coupon.type == 'vip' && coupon.usertype == 'reduction')">
											<view class="colour">
												<text class="text-price"></text>
												<text class="prices">{{Number(coupon.price)}}</text>
											</view>
											<view class="cu-tag wanl-gray-dark radius text-sm bg-white">
												{{$t('coupon.full')}}{{Number(coupon.limit)}}{{$t('coupon.reduction')}}{{Number(coupon.price)}}
											</view>
										</block>
										<block v-if="coupon.type == 'discount' || (coupon.type == 'vip' && coupon.usertype == 'discount')">
											<view class="colour">
												<text class="prices">{{Number(coupon.discount)}}</text>
												<text class="discount">{{$t('coupon.fold')}}</text>
											</view>
											<view class="cu-tag wanl-gray-dark radius text-sm bg-white">
												{{$t('coupon.full')}}{{Number(coupon.limit)}}{{$t('coupon.play')}}{{Number(coupon.discount)}}{{$t('coupon.fold')}}
											</view>
										</block>
										<block v-if="coupon.type == 'shipping'">
											<view class="colour">
												<text class="prices">{{$t('coupon.package_mail')}}</text>
											</view>
											<view class="cu-tag wanl-gray-dark radius text-sm bg-white">
												{{$t('coupon.full')}}{{Number(coupon.limit)}}{{$t('coupon.yuan_package_mail')}}
											</view>
										</block>
									</view>
									<view class="item-right padding-bj">
										<view class="title">
											<view class="cu-tag sm radius margin-right-xs tagstyle">
												{{coupon.type_text}}
											</view>
											<text class="text-cut wanl-gray text-min">{{coupon.name}}</text>
										</view>
										<view class="content text-min">
											<view class="wanl-gray">
												
												<view v-if="coupon.grant != '-1'">
													<text class="wlIcon-dot"></text> {{$t('coupon.there_are_only_a_few_left')}} {{coupon.surplus}} {{$t('coupon.zhang')}}
												</view>
												
												<view v-if="coupon.drawlimit != 0">
													<text class="wlIcon-dot"></text> {{$t('coupon.per_person_only')}} {{coupon.drawlimit}} {{$t('coupon.zhang')}}
												</view>
												<block v-if="coupon.pretype == 'fixed'">
													<view>
														<text class="wlIcon-dot"></text>{{$t('coupon.to_take_effect')}} {{coupon.startdate}}
													</view>
													<view>
														<text class="wlIcon-dot"></text>{{$t('coupon.the_end_of_the')}} {{coupon.enddate}}
													</view>
												</block>
												<block v-if="coupon.pretype == 'appoint'">
													<view v-if="coupon.validity == 0">
														<text class="wlIcon-dot"></text>{{$t('coupon.valid_forever_before_use')}}
													</view>
													<view v-else>
														<text class="wlIcon-dot"></text>{{$t('coupon.after_receiving')}} {{coupon.validity}} {{$t('coupon.days')}}
													</view>
												</block>
											</view>
											<view class="cu-btn sm round line-colour" @tap="onCoupons(index)" v-if="coupon.state" >
												<text v-if="coupon.choice"> {{$t('good.msg42')}} </text>
												<text v-else> {{$t('coupon.immediate_use')}} </text>
											</view>
											<view class="cu-btn sm round" @tap="onReceive(index)" v-else>
												{{$t('coupon.immediately_to_receive')}}
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
							<view class="foot padding-lr-bj"><button class="cu-btn bg-gradual-orange round text-bold complete" @tap="hideModal">{{$t('gg.msg1')}}</button></view>
						</view>
					</view>
				</view>
			</view>
			<view class="wanlian cu-bar tabbar solid-top foot text-df">
				<view>
					<text class="wanl-gray">{{$t('order.addorder_msg6')}}{{ orderData.statis.allnum }}{{$t('index.a')}}???</text>
					{{$t('order.addorder_msg8')}}???
					<text class="text-price text-orange">{{ orderData.statis.allsub }}</text>
				</view>
				<button v-if="loading" class="cu-btn round lg bg-gradual-orange margin-lr-bj">
					<text class="wlIcon-jiazai wlIconfont-spin margin-right-xs"></text> {{$t('order.addorder_msg9')}}
				</button>
				<button v-else @tap="addOrder" class="cu-btn round lg bg-gradual-orange margin-lr-bj"> {{$t('order.addorder_msg10')}} </button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			token: '',
			optionData: {},
			addressData: {},
			modalName: null, // ?????????
			cartType: null,
			couponData: {},
			couponIndex: null,
			orderData: {
				lists: [],
				statis: {
					allnum: 1,
					allsub: 0
				}
			}
		};
	},
	onLoad(option) {
		uni.setNavigationBarTitle({
			title:this.$t('order.addorder_title')
		})
		this.optionData = JSON.parse(option.data);
		this.loadData();
		this.cartType = option.type;
	},
	methods: {
		async loadData(address_id) {
			this.$api.post({
				url: '/wanlshop/order/getOrderGoodsList',
				loadingTip: '?????????',
				data: {
					data: this.optionData,
					address_id: address_id
				},
				success: res => {
					this.token = res.token;
					this.orderData = res.orderData;
					if (res.addressData) {
						this.addressData = res.addressData;
					} else {
						this.addAddress('newadd');
					}
				}
			});
		},
		// ????????????
		async addOrder() {
			if(this.orderData.statis.allnum === 0){
				this.$wanlshop.msg(this.$t('order.addorder_msg11'))
				return;
			}
			let address_id = this.addressData.id;
			if(address_id === 0){
				this.$wanlshop.msg(this.$t('order.addorder_msg12'))
				return;
			}
			let data = {lists: [], address_id: address_id},
				cart = [];
			this.orderData.lists.forEach((item, index)=> {
				data.lists.push({
					shop_id: item.shop_id,
					remarks: item.remarks,
					products: [],
					//???????????????????????? ????????????
					coupon_id: this.couponData[index] ? this.couponData[index].id : 0
				});
				item.products.forEach(goods => {
					// ???????????????
					cart.push({
						goods_id: goods.id,
						sku_id: goods.sku.id
					});
					// ????????????
					data.lists[index].products.push({
						goods_id: goods.id,
						number: goods.number,
						sku_id: goods.sku.id,
						freight_id: goods.freight_id
					});
				});
			});
			this.loading = true;
			// ??????????????????data
			this.$api.post({
				url: '/wanlshop/order/addOrder',
				data: {
					order:data,
					token: this.token
				},
				loadingTip: this.$t('order.addorder_msg13'),
				success: res => {
					this.$store.commit('statistics/order', {
						pay: this.$store.state.statistics.order.pay + res.list.length,
						whole: this.$store.state.statistics.order.whole + res.list.length
					});
					// ?????????????????????????????????
					let coupon =  Object.keys(this.couponData).length;
					if (coupon != 0) {
						this.$store.commit('statistics/dynamic', {
							coupon: this.$store.state.statistics.dynamic.coupon - coupon
						});
					}
					// ?????????????????????????????????
					if (this.cartType == 'cart') {
						this.$store.dispatch('cart/del');
					}
					this.$wanlshop.to(`/pages/user/money/pay?token=${res.token}&data=${JSON.stringify(res.list)}`);
				}
			});
		},
		//?????????????????????????????????
		async refreshList(data, type) {
			this.$api.post({
				url: '/wanlshop/address/address',
				data: {
					data: data,
					type: 'add'
				},
				success: res => {
					this.addressData = res;
				}
			});
		},
		// ???????????????????????????????????????????????????????????????????????????
		async queryCoupon(index) {
			let data = this.orderData.lists[index];
			if(data.coupon.length == 0){
				let goods_id = [];
				let shop_category_id = [];
				for(var i = 0; i < data.products.length; i++) {
					goods_id.push(data.products[i]['id']);
					shop_category_id.push(data.products[i]['shop_category_id']);
				};
				this.$api.post({
					url: '/wanlshop/coupon/query',
					data: {
						shop_id: data.shop_id,
						goods_id: this.unique(goods_id),
						shop_category_id: this.unique(shop_category_id),
						price: data.order_price
					},
					success: res => {
						data.coupon = res;
					}
				});
			}
			this.couponIndex = index;
			this.modalName = 'coupon';
		},
		// ???????????????
		async onReceive(index) {
			let coupon = this.orderData.lists[this.couponIndex].coupon[index];
			this.$api.post({
				url: '/wanlshop/coupon/receive',
				loadingTip: this.$t('good.msg51'),
				data: {
					id: coupon.id
				},
				success: res => {
					coupon.id = res.id;
					coupon.state = true;
					this.$wanlshop.msg(res.msg);
					this.$store.commit('statistics/dynamic', {
						coupon: this.$store.state.statistics.dynamic.coupon + 1
					});
				}
			});
		},
		// ???????????????, ???????????????????????????
		onCoupons(index){
			let order = this.orderData.lists[this.couponIndex];
			let data = this.orderData.lists[this.couponIndex].coupon;
			data[index].choice = !data[index].choice;
			if(data[index].choice){
				// ???????????????????????????????????????for????????????????????????
				for(var i = 0; i < data.length; i++) {
					if(i != index){
						data[i].choice = false;
					}
				};
				// ????????????
				this.couponData[this.couponIndex] = data[index];
				// @ ???????????? this.$wanlshop.bcadd('0.132123',0.132123)
				// ????????????
				if (data[index].type == 'reduction' || (data[index].type == 'vip' && data[index].usertype == 'reduction')) {
					order.freight.price = order.freight_price_bak;
					order.sub_price = this.$wanlshop.bcsub(this.$wanlshop.bcadd(order.order_price, order.freight.price),data[index].price);
					if (order.sub_price < 0) {
						order.sub_price = 0.01;
					}
				}
				// ????????????  ???????????????
				if (data[index].type == 'discount' || (data[index].type == 'vip' && data[index].usertype == 'discount')) {
					let discount = data[index].discount > 10 ? this.$wanlshop.bcdiv(data[index].discount, 100) : this.$wanlshop.bcdiv(data[index].discount, 10);
					order.freight.price = order.freight_price_bak;
					order.sub_price = this.$wanlshop.bcadd(this.$wanlshop.bcmul(order.order_price, discount), order.freight.price);
				}
				// ????????????
				if (data[index].type == 'shipping') {
					order.freight.price = 0;
					order.sub_price = order.order_price;
				}
			}else{
				// ???????????? 1.0.2??????
				this.couponData = {};
				if (data[index].type == 'shipping') {
					order.freight.price = order.freight_price_bak;
				}
				order.sub_price = this.$wanlshop.bcadd(order.order_price,order.freight.price);
			}
			// ??????????????????
			this.orderData.statis.allsub = 0;
			for(var i = 0; i < this.orderData.lists.length; i++) {
				this.orderData.statis.allsub = this.$wanlshop.bcadd(this.orderData.statis.allsub, this.orderData.lists[i].sub_price);
			};
			this.modalName = null;
		},
		// ????????????
		changeNum(num){
			num = num == 0 ? 1 : num;
			this.orderData.lists[0].number = num;
			this.orderData.lists[0].products[0].number = num;
			this.orderData.statis.allnum = num;
			// ????????????
			this.orderData.lists[0].sub_price = this.$wanlshop.bcmul(this.orderData.lists[0].products[0].sku.price, num);
			this.orderData.statis.allsub = this.$wanlshop.bcmul(this.orderData.lists[0].products[0].sku.price, num);
		},
		addAddress(type) {
			this.$wanlshop.to(`/pages/user/address/addressManage?type=${type}`);
		},
		userAddress() {
			this.$wanlshop.to('/pages/user/address/address?source=1');
		},
		// ??????????????????????????????????????????????????????
		showModal(name) {
			this.modalName = name;
		},
		// ???????????????
		hideModal() {
			this.modalName = null;
		},
		// ????????????????????????
		unique(arr) {
			return Array.from(new Set(arr)).join(',');
		},
		//?????????????????????
		moveHandle() {}
	}
};
</script>

<style></style>
