<template>
	<view>
		<view class="edgeInsetTop"></view>
		<view class="bg-white padding-bj flex">
			<view class="cu-avatar xl margin-right-bj" :style="{backgroundImage: 'url('+$wanlshop.oss(refund.goods.image, 70, 70)+')'}"> </view>
			<view class="text-sm" style="width: calc(100% - 128rpx);">
				<view class="margin-bottom-xs">
					<view class="text-cut-2">
						{{refund.goods.title}}
					</view>
				</view>
				<view class="wanl-gray">
					{{$t('good.msg24')}}：{{refund.goods.difference}}
				</view>
			</view>
		</view>
		<view class="margin-top-bj">
			<view class="cu-form-group">
				<view class="title">{{$t('order.refund_msg1')}}</view>
				<picker @change="expressChange" :value="refund.expressType" :range="expressList">
					<view class="picker">
						{{expressList[refund.expressType]}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">{{$t('money.refund_status')}}</view>
				<picker @change="typeChange" :value="refund.type" :range="typeList">
					<view class="picker">
						{{typeList[refund.type]}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">{{$t('order.refund_msg4')}}</view>
				<picker @change="reasonChange" :value="refund.reason" :range="reasonList">
					<view class="picker">
						{{reasonList[refund.reason]}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top-bj">
				<view class="title">{{$t('money.refund_money')}}<text class="text-price margin-left-xs"></text></view>
				<input type="digit" :placeholder="amount.info" @input="moneyInput" :value="refund.price" :disabled="amount.total == 0"></input>
			</view>
			<view class="bg-white margin-top-bj">
				<view class="cu-form-group">
					<view class="title">{{$t('order.refund_msg6')}}</view>
				</view>
				<view class="grid col-4 grid-square flex-sub padding-lr">
					<view class="bg-img" v-for="(item, index) in refund.images" :key="index" @tap="viewImage(index)">
						<image :src="$wanlshop.oss(item, 90, 90)" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="delImg(index)"><text class="wlIcon-31guanbi"></text></view>
					</view>
					<view class="dashed" @tap="chooseImage" v-if="refund.images.length < 4">
						<text class="wlIcon-31paishe"></text>
					</view>
				</view>
			</view>
			<view class="cu-form-group margin-top-bj">
				<view class="title">{{$t('money.refund_to_reason')}}</view>
				<input :placeholder="$t('order.refund_msg7')" v-model="refund.refund_content"></input>
			</view>
		</view>
		<view class="edgeInsetBottom"> </view>
		<view class="wanlian cu-bar tabbar foot flex flex-direction">
			<button class="cu-btn wanl-bg-orange lg" @tap="addData">{{$t('order.refund_msg8')}}</button>
		</view>
	</view>
</template>


<script>
export default {
	data() {
		return {
			// 退款
			refund:{
				expressType: -1,
				type: -1,
				reason: -1,
				images: [],
				goods: {},
				freight_type: 0,
			},
			expressList: [this.$t('order.refund_msg9'), this.$t('order.refund_msg10')],
			typeList: [this.$t('order.refund_msg22'), this.$t('money.msg2_2')],
			reasonList: [this.$t('money.msg3_1'), this.$t('money.msg3_2'), this.$t('money.msg3_3'), this.$t('money.msg3_4'), this.$t('money.msg3_5'), this.$t('money.msg3_6'), this.$t('order.refund_msg11')],
			// 价格
			amount:{
				total: 0,
				freight: 0,
				info: ''
			}
		};
	},
	onLoad(option) {
		uni.setNavigationBarTitle({
			title:this.$t('refund.edit_title')
		})
		this.loadData(option.id);
	},
	methods: {
		async loadData(id){
			this.$api.get({
				url: '/wanlshop/refund/getRefundInfo',
				data: {id: id},
				success: res => {
					this.refund = res;
					var price = res.goods.price * res.goods.number;
					var freight_price = parseInt(res.goods.freight_price);
					this.amount.freight = freight_price;
					//计算运费价格,当只有一个商品或 运费策略累加运费可全退
					if(res.goods_number == 1 || res.freight_type == 2){
						this.amount.info = `${this.$t('refund.edit_msg1')}${price + freight_price}${this.$t('money.yuan')}，${this.$t('order.refund_msg14')}${freight_price}${this.$t('money.yuan')}`;
						this.amount.total = price + freight_price;
					}else{
						this.amount.info = `${this.$t('refund.edit_msg2')}${price}${this.$t('money.yuan')}，${this.$t('refund.edit_msg3')}${freight_price}${this.$t('money.yuan')}`;
						this.amount.total = price;
					}
				}
			});
		},
		async addData(){
			if (this.refund.price <= 0) {
				this.$wanlshop.msg(this.$t('refund.edit_msg4'));
				return false;
			}
			if (this.refund.price > this.amount.total) {
				this.$wanlshop.msg(this.$t('refund.edit_msg5') + '$'+this.amount.total+this.$t('money.yuan'));
				return false;
			}
			// 提交
			this.$api.post({
				url: '/wanlshop/refund/editRefund',
				data: {
					id: this.refund.id,
					expressType: this.refund.expressType,
					type: this.refund.type,
					reason: this.refund.reason,
					price: this.refund.price,
					images: this.refund.images,
					refund_content: this.refund.refund_content
				},
				success: res => {
					// 跳转到退款详情页,更新中央控制总线
					this.$wanlshop.to(`/pages/user/refund/details?id=${res}`);
				}
			});
		},
		
		// 退款金额
		moneyInput(e) {
			let money = e.detail.value;
			if (money > this.amount.total) {
				this.$wanlshop.msg(this.$t('refund.edit_msg5')+'$'+this.amount.total+this.$t('money.yuan'));
			}
			// 判断是否超过订单总额,超过提示
			this.refund.price = money
		},
		
		
		
		
		
		expressChange(e) {
			this.refund.expressType = e.detail.value
		},
		typeChange(e) {
			this.refund.type = e.detail.value
		},
		reasonChange(e) {
			this.refund.reason = e.detail.value
		},
		
		
		
		
		
		chooseImage(index) {
			uni.chooseImage({
				count: 4, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: res => {
					this.$api.get({
						url: '/wanlshop/common/uploadData',
						success: updata => {
							for (let i = 0; i < res.tempFilePaths.length; i++) {
								// 读取图片宽高
								uni.getImageInfo({
									src: res.tempFilePaths[i],
									success: image => {
										this.$api.upload({
											url: updata.uploadurl,
											filePath: image.path,
											name: 'file',
											formData: updata.storage == 'local' ? null : updata.multipart,
											success: data => {
												this.refund.images.push(data.fullurl);
											}
										});
									}
								});
							}
						}
					});
				}
			});
		},
		viewImage(key) {
			uni.previewImage({
				urls: this.refund.images,
				current: this.refund.images[key]
			});
		},
		delImg(key) {
			this.refund.images.splice(key, 1);
		}
	}
};
</script>

<style>
	.dashed::after {
	    border: 1px dashed #666;
	}
	.cu-btn.lg{
		width: calc(100% - 50rpx);
	}
</style>
