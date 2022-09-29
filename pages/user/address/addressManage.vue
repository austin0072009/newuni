<!-- 2020年2月17日18:18:53 完成 -->
<template>
	<view>
		<view class="edgeInsetTop"></view>
		<view class="cu-form-group" v-show="addressType">
			<view class="title">{{$t('address.title1')}}</view>
			<input type="text" :placeholder="$t('address.msg1')" v-model="addressData.name"></input>
		</view>
		<view class="cu-form-group" v-show="addressType">
			<view class="title">{{$t('address.title2')}}</view>
			<input type="number" :placeholder="$t('address.msg2')" maxlength="11" v-model="addressData.mobile"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">{{$t('address.title3')}}</view>
			<input type="text" @tap="btnClick" :value="addressData.formatted_address" :placeholder="$t('address.msg3')" disabled />
		</view>
		<view class="cu-form-group align-start">
			<view class="title">{{$t('address.title4')}}</view>
			<textarea maxlength="-1" @input="getInputtips" @focus="focusInputtips" @confirm="confirmInputtips" @blur="blurInputtips"
			 :placeholder-style="addressData.adcode==''?'color: #bbb':''" :adjust-position="false" :value="addressData.address?(addressData.address_name+addressData.address):''"
			 :disabled="addressData.adcode==''?true:false" :placeholder="addressData.adcode==''?$t('address.msg4'):$t('address.msg5')"></textarea>
		</view>
		<view class="cu-form-group margin-top-bj" v-show="addressType">
			<view class="title">{{$t('address.title5')}}</view>
			<switch @change="switchChange" :class="addressData.default == 1?'checked':''" :checked="addressData.default == 1"></switch>
		</view>
		<scroll-view scroll-y="true" class="tipsScroll" v-show="!addressType">
			<view class="item" v-for="(item,index) in addressList.tips" :key="index" @tap="addressTisp(item)">
				<view>{{item.address}}</view>
				<text>{{item.name}}</text>
			</view>
		</scroll-view>
		<!-- 1.0.5升级 -->
		<!-- 1.0.6升级 -->
		<view class="padding-bj flex flex-direction margin-top" v-show="addressType">
			<button @tap="confirm" class="cu-btn wanl-bg-orange lg">{{$t('cart.complete')}}</button>
		</view>
		<wanl-address ref='wanlAddress' @selectAddress="successSelectAddress"></wanl-address>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressData: {
					name: '',
					mobile: '',
					default: 0,
					//地区
					country: '', // 国家
					province: '', //省份
					city: '', // 城市
					citycode: '', // 城市代码
					district: '', // 县
					adcode: '', // 地区代码
					formatted_address: '', //详细地区
					//详情
					address: '', //详细地址
					address_name: '', // 地址名称
					location: '' //经纬度
				},
				addressList: {
					location: '',
					adcode: '',
					tips: {}
				},
				addressType: true
			}
		},
		onLoad(option) {
			let title = this.$t('address.add_title');
			if (option.type === 'newadd') {
				this.addressData.default = 1
			}
			if (option.type === 'edit') {
				title = this.$t('address.edit_title')
				this.addressData = JSON.parse(option.data)
			}
			this.manageType = option.type;
			this.$wanlshop.title(title);
		},
		onNavigationBarButtonTap() {
			this.confirm()
		},
		methods: {
			switchChange(e) {
				if (e.detail.value) {
					this.addressData.default = 1;
				} else {
					this.addressData.default = 0;
				}
			},
			btnClick() {
				this.$refs.wanlAddress.show()
			},
			successSelectAddress(address) {
				this.addressData.country = address.country;
				this.addressData.province = address.province;
				this.addressData.city = address.city;
				this.addressData.citycode = address.citycode;
				this.addressData.district = address.district;
				this.addressData.formatted_address = address.formatted_address;
				this.addressData.location = address.location;
				this.addressData.adcode = address.adcode;
				this.addressList.location = address.location;
				this.addressList.adcode = address.adcode;
			},
			//调用高德地图搜索相关地址
			getInputtips(event) {
				let keywords = event.detail.value;
				if (keywords) {
					uni.request({
						url: 'https://restapi.amap.com/v3/assistant/inputtips',
						data: {
							key: this.$wanlshop.config('amapkey'),
							keywords: keywords,
							location: this.addressList.location,
							city: this.addressList.adcode
						},
						success: (res) => {
							let addressList = [];
							res.data.tips.forEach(item => {
								if (item.address.length == 0) {
									item.address = this.$t('address.msg6');
									item.location = '113.294701,22.666562';
								}
								addressList.push(item);
							});
							this.addressList.tips = addressList;
						}
					});
				}
			},
			// 详细地址失去焦点
			blurInputtips(event) {
				this.addressData.address = event.detail.value;
				setTimeout(() => {
					this.addressType = true;
				}, 10);
			},
			// 详细地址已完成
			confirmInputtips(event) {
				this.addressType = true;
			},
			// 详细地址获取焦点
			focusInputtips(event) {
				this.addressType = false;
			},
			// 详细地址替换
			addressTisp(data) {
				this.addressData.adcode = data.adcode;
				this.addressData.address = data.address;
				this.addressData.address_name = data.name;
				this.addressData.location = data.location;
				this.addressType = true;
			},
			//提交
			confirm() {
				let data = this.addressData;
				if (!data.name) {
					this.$wanlshop.msg(this.$t('address.msg7'));
					return;
				}
				if (!/^1[0-9]{10,10}$/.test(data.mobile)) { // 1.0.2升级
					this.$wanlshop.msg(this.$t('address.msg8'));
					return;
				}
				if (!data.city) {
					this.$wanlshop.msg(this.$t('address.msg9'));
					return;
				}
				if (!data.address) {
					this.$wanlshop.msg(this.$t('address.msg10'));
					return;
				}
				this.$wanlshop.prePage().refreshList(data, this.manageType);
				this.$wanlshop.msg(this.$t('address.msg11') + (this.manageType=='edit' ? this.$t('address.msg12') : this.$t('address.msg13')) + this.$t('address.msg14'));
				this.$wanlshop.back(1);
			}
		}
	}
</script>

<style>
	.cu-form-group {
		padding: 0 25rpx;
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
		font-size: 26rpx;
	}

	.cu-form-group input,
	.cu-form-group textarea {
		font-size: 26rpx;
	}

	.cu-btn.lg {
		font-size: 32rpx;
		height: 86rpx;
	}

	.tipsScroll {
		width: 100%;
		height: 500rpx;
		padding: 0 50rpx;
	}

	.tipsScroll .item {
		margin: 25rpx 0;
	}

	.tipsScroll .item view {
		color: #B8B8B8;
		font-size: 22rpx;
	}

	.tipsScroll .item text {
		color: #333;
	}
</style>
