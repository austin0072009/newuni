<template>
	<view>
		<!-- 导航条 -->
		<view class="cu-custom">
			<view class="cu-bar bg-bgcolor fixed" :style="{ height: $wanlshop.wanlsys().height + 'px', paddingTop: $wanlshop.wanlsys().top + 'px'}">
				<view class="action" @tap="$wanlshop.back(1)">
					<text class="wlIcon-fanhui1"></text>
				</view>
				<view class="content" :style="{top: $wanlshop.wanlsys().top + 'px'}">
					{{$t('user.add_good')}}
				</view>
				<view class="action" @tap="showCate()">
					{{$t('index.classification')}}
				</view>
			</view>
		</view>
		<form @submit="formSubmit">
			<view class="cu-form-group">
				<view class="title">{{$t('other.title1')}}</view>
				<picker class="form-item-picker" mode="multiSelector" 
					  :range="newCategotyDeptList"
					  :value="multDeptIndex"
					  range-key="name"
					  @columnchange="pickerColumnDept"
					  @change="bindPickerChange"  >
					  <view class="picker">
						{{category[multDeptIndex[0]].name}}/{{category[multDeptIndex[0]].childlist[multDeptIndex[1]].name}}
					  </view>
				 </picker>
			</view>
			<view class="cu-form-group">
				<view class="title">{{$t('other.title2')}}</view>
				<input name="title" v-model="data.title" placeholder=""></input>
			</view>
			<view class="cu-form-group">
				<view class="title">{{$t('shop.msg3')}}</view>
				<picker @change="shopPickerChange" :value="shop_cate_value" :range="shop_cate" range-key="name">
					<view class="picker">
						{{shop_cate[shop_cate_value].name}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top-bj">
				<view class="title">{{$t('other.title3')}}</view>
				<input name="image" v-model="data.image" :placeholder="$t('shop_apply.msg33')+$t('shop_apply.msg56')" disabled @tap="chooseImg('image')"></input>
				<view class="cu-avatar radius" v-if="data.image" @tap="previewImage(0)">
					<image :src="$wanlshop.oss(data.image, 32, 0, 1)" mode="widthFix"></image>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">{{$t('other.title4')}}</view>
				<input name="price" v-model="data.price" placeholder=""></input>
			</view>
			<view class="cu-form-group margin-top-bj">
				<view class="title">{{$t('other.title5')}}</view>
				<input name="images" v-model="data.images" :placeholder="$t('shop_apply.msg33')+$t('shop_apply.msg56')" disabled @tap="chooseImg('images')"></input>
				<view class="cu-avatar radius" v-if="data.images" @tap="previewImage(1)">
					<image :src="$wanlshop.oss(data.images, 32, 0, 1)" mode="widthFix"></image>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">{{$t('other.title6')}}</view>
				<input name="description" v-model="data.description" placeholder=""></input>
			</view>
			
			<view class="edgeInsetBottom"></view>
			<view class="wanlian cu-bar tabbar foot flex flex-direction">
				<button form-type="submit" class="cu-btn wanl-bg-orange lg">{{$t('feedback.btn1')}}</button>
			</view>
		</form>
		<view class="u-popup" v-if="is_popup">
			<view  @tap="showCate()" class="u-transition u-fade-enter-to u-fade-enter-active" style="transition-duration: 350ms; transition-timing-function: ease-out; position: fixed; inset: 0px; z-index: 10070; background-color: rgba(0, 0, 0, 0.5);"></view>
			<view class="u-transition u-slide-up-enter-to u-slide-up-enter-active" style="transition-duration: 300ms; transition-timing-function: ease-out; z-index: 10075; position: fixed; display: flex; bottom: 0px; left: 0px; right: 0px;">
				<view class="u-popup__content" style="flex: 1 1 0%;">
					<view class="add-cate">
						<view class="cu-form-group">
							<view class="title">{{$t('other.title7')}}：</view>
							<input class="input-input" type="text" value="" maxlength="140" :placeholder="$t('other.msg1')" v-model="cate_name"/>
						</view>
						<button class="cu-btn wanl-bg-orange lg" @tap="addShopCate()">{{$t('cart.determine')}}</button>
					</view>
					<view class="u-safe-bottom u-safe-area-inset-bottom"></view>
				</view>
			</view>
		</view>
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
				multDeptIndex:[0,0],
				newCategotyDeptList:[[this.$t('bank.msg1')],[this.$t('bank.msg1')]],
				category:[],
				shop_cate_value: 0,
				shop_cate:[],
				data:{
					price: 0.00,
					shop_category_id: 0,
					category_id: 0,
					title: '',
					image: '',
					images: '',
					description: ''
				},
				is_popup: false,
				cate_name: ''
			}
		},
		onLoad(option) {
			
		},
		onShow(){
			this.category = this.common.modulesData.categoryModules;
			this.newCategotyDeptList[0] = this.category;
			this.newCategotyDeptList[1] = this.category[0].childlist;
			this.getShopCate();
		},
		methods: {
			showCate(){
				this.is_popup = !this.is_popup;
			},
			//添加店铺分类
			async addShopCate(){
				if(this.cate_name == ''){
					this.$wanlshop.msg(this.$t('other.msg1'));
				}
				this.$api.post({
					url: '/wanlshop/shop/addShopCate',
					data: {
						name: this.cate_name
					},
					success: res => {
						this.$wanlshop.msg(this.$t('other.msg7'));
						this.cate_name = '';
						this.is_popup = !this.is_popup;
						this.getShopCate();
					}
				});
			},
			//获取店铺分类
			async getShopCate(){
				this.$api.get({
					url: '/wanlshop/shop/getShopCate',
					success: res => {
						this.shop_cate = res;
					}
				});
			},
			pickerColumnDept(e){
				if(e.detail.column == 0){
					this.newCategotyDeptList[1] = this.category[e.detail.value].childlist
				}
			},
			bindPickerChange(e) {
				this.multDeptIndex = e.detail.value;
			},
			shopPickerChange(e) {
				this.shop_cate_value = e.detail.value;
			},
			// 提交申请
			formSubmit(e) {
				this.wanlChecker(e);
			},
			async wanlChecker(e){
				var data = this.data;
				data.category_id = this.category[this.multDeptIndex[0]].childlist[this.multDeptIndex[1]].id;
				data.shop_category_id = this.shop_cate[this.shop_cate_value].id;
				if(data.description == ''){
					this.$wanlshop.msg(this.$t('other.msg2'));
					return;
				}
				if(data.image == ''){
					this.$wanlshop.msg(this.$t('other.msg3'));
					return;
				}
				if(data.images == ''){
					this.$wanlshop.msg(this.$t('other.msg4'));
					return;
				}
				if(data.title == ''){
					this.$wanlshop.msg(this.$t('other.msg5'));
					return;
				}
				if(data.price == '' || data.price <= 0){
					this.$wanlshop.msg(this.$t('other.msg6'));
					return;
				}
				this.$api.post({
					url: '/wanlshop/shop/addGhsGood',
					data: data,
					success: res => {
						this.$wanlshop.msg(this.$t('other.msg7'));
						this.data = {
							price: 0.00,
							shop_category_id: 0,
							category_id: 0,
							title: '',
							image: '',
							images: '',
							description: ''
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
										this.data[name] = data.fullurl;
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
				let data = this.data;
				urls = [this.$wanlshop.oss(data.image, 320, 0, 1), this.$wanlshop.oss(data.images, 320, 0, 1)];
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
	.cu-form-group .title, .cu-form-group input{
		font-size: 28rpx;
	}
	.cu-avatar image{
		width: 64rpx;
		height: 64rpx;
	}
	
	
	.u-popup{
	    flex: 1;
	}
	.u-fade-enter-active, .u-fade-leave-active {
	    transition-property: opacity;
	}
	.u-slide-down-enter-active, .u-slide-down-leave-active, .u-slide-left-enter-active, .u-slide-left-leave-active, .u-slide-right-enter-active, .u-slide-right-leave-active, .u-slide-up-enter-active, .u-slide-up-leave-active {
	    transition-property: -webkit-transform;
	    transition-property: transform;
	    transition-property: transform,-webkit-transform;
	}
	.u-popup__content{
	    background-color: #fff;
	    position: relative;
	}
	.add-cate{
	    padding: 28px 11px;
	}
	.u-safe-bottom{
	    width: 100%;
	}
	.cu-form-group {
	    background-color: #fff;
	    padding: 1px 16px;
	    display: flex;
	    align-items: center;
	    min-height: 56px;
	    justify-content: space-between;
	}
	.add-cate .cu-btn{
	    width: 80%;
	    margin: 11px 10%;
	}
	.cu-btn.lg {
	    padding: 0 22px;
	    font-size: 18px;
	    height: 45px;
	}
	.wanl-bg-orange {
	    color: #fff;
	    background-image: linear-gradient(-90deg,#ff4950,#ff8123);
	}
	.cu-btn {
	    position: relative;
	    border: 0px;
	    display: inline-flex;
	    align-items: center;
	    justify-content: center;
	    box-sizing: border-box;
	    padding: 0 16px;
	    font-size: 15px;
	    height: 36px;
	    line-height: 1;
	    text-align: center;
	    text-decoration: none;
	    overflow: visible;
	    margin-left: 0;
	    -webkit-transform: translate(0px,0px);
	    transform: translate(0px,0px);
	    margin-right: 0;
	}
	.cu-form-group .title[data-v-4076789e], .cu-form-group{
	    font-size: 15px;
	}
	.cu-form-group .title {
	    text-align: justify;
	    padding-right: 16px;
	    font-size: 16px;
	    position: relative;
	    height: 33px;
	    line-height: 33px;
	}
	.cu-form-group{
	    flex: 1;
	    font-size: 16px;
	    color: #555;
	    padding-right: 11px;
	}
</style>
