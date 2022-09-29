<template>
	<view>
		<!-- 导航条 -->
		<view class="cu-custom">
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
				<view class="title">{{$t('shop_apply.msg55')}}</view>
				<input name="shopname" v-model="shopdata.shopname" placeholder=""></input>
			</view>
			<view class="cu-form-group margin-top-bj">
				<view class="title">{{$t('shop_apply.msg56')}}</view>
				<input name="avatar" v-model="shopdata.avatar" :placeholder="$t('shop_apply.msg33')+$t('shop_apply.msg56')" disabled @tap="chooseImg('avatar')"></input>
				<view class="cu-avatar radius" v-if="shopdata.avatar" @tap="previewImage(0)">
					<image :src="$wanlshop.oss(shopdata.avatar, 32, 0, 1)" mode="widthFix"></image>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">{{$t('shop_apply.msg57')}}</view>
				<input name="bio" v-model="shopdata.bio" placeholder=""></input>
			</view>
			<view class="cu-form-group margin-top-bj">
				<view class="title">{{$t('shop_apply.msg58')}}</view>
				<input name="city1" v-model="shopdata.city1" placeholder=""></input>
			</view>
			<view class="cu-form-group">
				<view class="title">{{$t('shop_apply.msg59')}}</view>
				<input name="city2" v-model="shopdata.city2" placeholder=""></input>
			</view>
			<view class="cu-form-group">
				<view class="title">{{$t('shop_apply.msg60')}}</view>
				<input name="city3" v-model="shopdata.city3" placeholder=""></input>
			</view>
			
			<view class="edgeInsetBottom"></view>
			<view class="wanlian cu-bar tabbar foot flex flex-direction">
				<button form-type="submit" :disabled="shopdata.verify == 2 || shopdata.verify == 3" class="cu-btn wanl-bg-orange lg">{{verify_text[shopdata.verify]}}</button>
			</view>
		</form>
	</view>
</template>

<script>
	import graceChecker from '@/common/graceChecker';
	export default {
		data() {
			return {
				verify_text: [this.$t('shop_apply.msg44'),this.$t('shop_apply.msg45'),this.$t('shop_apply.msg46'),this.$t('shop_apply.msg47'),this.$t('shop_apply.msg48'),this.$t('shop_apply.msg49')],
				shopdata:{
					verify: 0,
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
				var shopdata = this.shopdata;
				this.$api.post({
					url: '/wanlshop/shop/apply2',
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
