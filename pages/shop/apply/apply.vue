<template>
	<view>
		<!-- 导航条 -->
		<view class="cu-custom" :style="{height: $wanlshop.wanlsys().height + 'px' }">
			<view class="cu-bar bg-bgcolor fixed" :style="{ height: $wanlshop.wanlsys().height + 'px', paddingTop: $wanlshop.wanlsys().top + 'px'}">
				<view class="action" @tap="$wanlshop.back(1)">
					<text class="wlIcon-fanhui1"></text>
				</view>
				<view class="content" :style="{top: $wanlshop.wanlsys().top + 'px'}">
					{{$t('shop_apply.msg30')}}
				</view>
				<view class="action" @tap="$wanlshop.to('/pages/user/service')">
					<text class="wlIcon-kefu"></text>
				</view>
			</view>
		</view>
		<form @submit="formSubmit">
			<view class="cu-form-group">
				<view class="title">{{$t('shop_apply.msg31')}}</view>
				<picker @change="PickerChange" :value="shopdata.state" :range="state_text">
					<view class="picker">
						{{state_text[shopdata.state]}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">{{name_text[shopdata.state]}}</view>
				<input name="name" v-model="shopdata.name" :placeholder="$t('shop_apply.msg32')+name_text[shopdata.state]"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">{{number_text[shopdata.state]}}</view>
				<input name="number" v-model="shopdata.number" :placeholder="$t('shop_apply.msg32')+number_text[shopdata.state]"></input>
			</view>
			<view class="cu-form-group margin-top-bj" :class="shopdata.state == 2 ? '':'margin-bottom-bj'">
				<view class="title">{{image_text[shopdata.state]}}</view>
				<input name="image" v-model="shopdata.image" :placeholder="$t('shop_apply.msg33')+image_text[shopdata.state]" disabled @tap="chooseImg('image')"></input>
				<view class="cu-avatar radius" v-if="shopdata.image" @tap="previewImage(0)">
					<image :src="$wanlshop.oss(shopdata.image, 32, 0, 1)" mode="widthFix"></image>
				</view>
			</view>
			<view class="cu-form-group margin-bottom-bj" v-if="shopdata.state == 2">
				<view class="title">{{$t('shop_apply.msg34')}}</view>
				<input name="trademark" v-model="shopdata.trademark" :placeholder="$t('shop_apply.msg35')" disabled @tap="chooseImg('trademark')"></input>
				<view class="cu-avatar radius" v-if="shopdata.trademark" @tap="previewImage(1)">
					<image :src="$wanlshop.oss(shopdata.trademark, 32, 0, 1)" mode="widthFix"></image>
				</view>
			</view>
			
	<!-- 		<view class="cu-form-group">
				<view class="title">{{$t('shop_apply.msg36')}}</view>
				<input name="wechat" v-model="shopdata.wechat" :placeholder="$t('shop_apply.msg52')"></input>
				<text class='wlIcon-WeChat text-green'></text>
			</view> -->
			
			<view class="cu-form-group">
				<view class="title">{{$t('shop_apply.msg37')}}</view>
				<input name="mobile" v-model="shopdata.mobile" maxlength="11" type="number" :placeholder="$t('login.msg31')"></input>
			</view>
			
			<view class="edgeInsetBottom"></view>
			<view class="wanlian cu-bar tabbar foot flex flex-direction">
				<button v-if="shopdata.verify == 1" @tap="onStep()" class="cu-btn wanl-bg-orange lg">{{$t('login.msg3')}}</button>
				<button v-else form-type="submit" :disabled="shopdata.verify == 2 || shopdata.verify == 3" class="cu-btn wanl-bg-orange lg">{{verify_text[shopdata.verify]}}</button>
			</view>
		</form>
	</view>
</template>

<script>
	import graceChecker from '@/common/graceChecker';
	export default {
		data() {
			return {
				state_text: [this.$t('index.personal'), this.$t('index.enterprise'), this.$t('shop_apply.msg38')],
				name_text: [this.$t('address.msg1'), this.$t('shop_apply.msg39'), this.$t('shop_apply.msg39')],
				number_text: [this.$t('shop_apply.msg40'), this.$t('shop_apply.msg41'), this.$t('shop_apply.msg41')],
				image_text: [this.$t('shop_apply.msg42'), this.$t('shop_apply.msg43'), this.$t('shop_apply.msg43')],
				verify_text: [this.$t('shop_apply.msg44'),this.$t('shop_apply.msg45'),this.$t('shop_apply.msg46'),this.$t('shop_apply.msg47'),this.$t('shop_apply.msg48'),this.$t('shop_apply.msg49')],
				shopdata:{
					state: 0,
					verify: 0,
					image: '',
					trademark: ''
				}
			}
		},
		onLoad(option) {
			var data = JSON.parse(option.data);
			if (data.id) {
				this.shopdata = data;
			}
		},
		methods: {
			PickerChange(e) {
				this.shopdata.state = e.detail.value
			},
			// 提交申请
			formSubmit(e) {
				// verify:0=提交资质,1=提交店铺,2=提交审核,3=通过,4=未通过
				if (this.shopdata.verify != 3) {
					this.wanlChecker(e);
				}else{
					this.$wanlshop.msg(this.$t('shop_apply.msg50'));
				}
			},
			async wanlChecker(e){
				//定义表单规则
				let rule = [
					{name: 'name', checkType: 'notnull', errorMsg: this.$t('shop_apply.msg32')+ this.name_text[this.shopdata.state]},
					{name: 'number', checkType: 'notnull', errorMsg: this.$t('shop_apply.msg32')+ this.number_text[this.shopdata.state]},
					{name: 'image', checkType: 'notnull', errorMsg: this.$t('shop_apply.msg51')+ this.image_text[this.shopdata.state]},
					// {name: 'trademark', checkType: 'notnull', errorMsg: '请上传商标证书'},
					//{name: 'wechat', checkType: 'notnull', errorMsg: this.$t('shop_apply.msg52')},
					{name: 'mobile', checkType: 'notnull', errorMsg: this.$t('login.msg35')}
				];
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = graceChecker.check(formData, rule);
				if(checkRes){
					var shopdata = this.shopdata;
					this.$api.post({
						url: '/wanlshop/shop/apply',
						data: shopdata,
						success: res => {
							this.shopdata = res;
							if (shopdata.verify == 0) {
								shopdata.verify = 2;
								this.$wanlshop.msg(this.$t('shop_apply.msg53'));
							}else{
								shopdata.verify = 5;
								this.$wanlshop.msg(this.$t('shop_apply.msg54'));
							}
						}
					});
				}else{
					this.$wanlshop.msg(graceChecker.error);
				}
			},
			// 选择图片
			chooseImg(name) { 
			    uni.chooseImage({
			        sourceType: ["camera", "album"],
			        sizeType: "compressed",
			        count: 1,
			        success: res => {
						this.$api.get({
							url: '/wanlshop/common/uploadData',
							success: updata => {
								this.$api.upload({
									url: updata.uploadurl,
									filePath: res.tempFilePaths[0],
									name: 'file',
									formData: updata.storage == 'local' ? null : updata.multipart,
									success: data => {
										this.shopdata[name] = data.fullurl;
									}
								});
							}
						});
			        }
			    })
			},
			//预览图片
			previewImage(key) {
				let urls = [];
				let shopdata = this.shopdata;
				if (shopdata.state == 2) {
					urls = [this.$wanlshop.oss(shopdata.image, 320, 0, 1), this.$wanlshop.oss(shopdata.trademark, 320, 0, 1)];
				}else{
					urls = [this.$wanlshop.oss(shopdata.image, 320, 0, 1)];
				}
				uni.previewImage({
					urls: urls,
					current: urls[key],
					indicator: 'number'
				});
			},
			onStep(){
				this.$wanlshop.auth(`/pages/shop/apply/stepthree?data=${JSON.stringify(this.shopdata)}`)
			}
		}
	}
</script>

<style>
	.cu-btn[disabled] {
	    opacity: 1;
	    color: #ffffff;
		background: #fe660059;
	}
	.wanlian.cu-bar.tabbar {
		background-color: transparent;
	}
	.wanlian.cu-bar.tabbar .cu-btn {
		width: calc(100% - 50rpx);
	}
	.wanlian.cu-bar.tabbar .cu-btn.lg {
		font-size: 32rpx;
		height: 86rpx;
	}
	.cu-form-group .title, .cu-form-group uni-input{
		font-size: 28rpx;
	}
	.cu-avatar image{
		width: 64rpx;
		height: 64rpx;
	}
	
</style>
