<template>
	<view>
		<view class="edgeInsetTop"></view>
		<view class="complaint-title">
		    <view>{{$t('complaint.msg1')}}{{typeName}}{{$t('complaint.msg2')}} </view>
			<view class="complaint-quick text-red">
				<text class="margin-right-xs">{{typeName}}ID:{{complaintId}}</text>
			</view>
		</view>
		<view class="cu-form-group">
			<picker @change="pickerChange" :value="complaint.reason" :range="picker">
				<view class="picker">
					{{complaint.reason>-1?picker[complaint.reason]:$t('complaint.msg3')}}
				</view>
			</picker>
		</view>
		
		
		<view class="complaint-title">
		    <text>{{typeName}}{{$t('complaint.msg4')}}</text>
		</view>
		<view class="cu-bar bg-white">
			<view class="action">
				{{$t('complaint.msg5')}}
			</view>
			<view class="action">
				{{complaint.images.length}}/8
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(image,index) in complaint.images" :key="index">
				 <image :src="image" @tap="previewImage(complaint.images, index)" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="close(index)">
						<text class='wlIcon-shanchu2'></text>
					</view>
				</view>
				<view class="solids" @tap="chooseImg" v-if="complaint.images.length<8">
					<text class="wlIcon-31paishe"></text>
				</view>
			</view>
		</view>
		<view class="complaint-title">
		    <view>{{typeName}}{{$t('complaint.msg6')}}</view>
		</view>
		<view class="cu-form-group">
			<textarea maxlength="-1" v-model="complaint.content" placeholder-class="placeholder" :placeholder="$t('complaint.msg7')"></textarea>
		</view>
		<view class="wanlian cu-bar tabbar foot flex flex-direction">
			<button class="cu-btn wanl-bg-redorange lg" @tap="submit">{{$t('complaint.msg8')}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: -1,
				picker: [this.$t('complaint.msg9'), this.$t('complaint.msg10'), this.$t('complaint.msg11'), this.$t('complaint.msg12'), this.$t('complaint.msg13'), this.$t('complaint.msg14'), this.$t('complaint.msg15'), this.$t('complaint.msg16'), this.$t('complaint.msg17'), this.$t('complaint.msg18'), this.$t('complaint.msg19'), this.$t('complaint.msg20'), this.$t('complaint.msg21'), this.$t('complaint.msg22')],
				complaintId: 0,
				typeName: '',
				complaint:{
					type: 0,
					complaint_user_id: 0,
					complaint_shop_id: 0,
					complaint_goods_id: 0,
					images: [],
					content: '',
					reason: -1
				}
			};
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title:this.$t('complaint.item_title')
			})
			this.complaint.type = option.type;
			this.complaintId = option.id;
			if(option.type == 0){
				this.typeName = this.$t('complaint.msg23');
				this.complaint.complaint_user_id = option.id;
			}else if(option.type == 1){
				this.typeName = this.$t('complaint.msg24');
				this.complaint.complaint_goods_id = option.id;
			}else if(option.type == 2){
				this.typeName = this.$t('complaint.msg25');
				this.complaint.complaint_shop_id = option.id;
			}else if(option.type == 3){
				this.typeName = this.$t('complaint.msg26');
				this.complaint.complaint_goods_id = option.id;
			}
		},
		methods: {
			pickerChange(e){
				if(e.detail.value == -1){
					this.complaint.reason = 0;
				}else{
					this.complaint.reason = e.detail.value;
				}
			},
			chooseImg() { //选择图片
			    uni.chooseImage({
			        sourceType: ["camera", "album"],
			        sizeType: "compressed",
			        count: 8 - this.complaint.images.length,
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
													this.complaint.images.push(data.fullurl);
												}
											});
										}
									});
								}
							}
						});
			        }
			    })
			},
			close(e){
			    this.complaint.images.splice(e,1);
			},
			previewImage(image, index) {
				var imgArr = [];
				for (var item of image) {
					imgArr = imgArr.concat(this.$wanlshop.oss(item, 500));
				}
				uni.previewImage({
					urls: imgArr,
					current: imgArr[index],
					indicator: 'number'
				});
			},
			submit() { 
				if(this.complaint.reason == -1){
					this.$wanlshop.msg(this.$t('complaint.msg27'));
					return false;
				}
				if(!this.complaint.content){
					this.$wanlshop.msg(this.$t('complaint.msg28'));
					return false;
				}
			    this.$api.post({
			    	url: '/wanlshop/complaint/add',
					data: this.complaint,
			    	success: res => {
			    		this.$wanlshop.to('/pages/page/success?type=complaint');
			    	}
			    });
			}
		}
	}
</script>

<style>
	.complaint-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 25rpx;
		color: #666;
	}
	.complaint-star-view.complaint-title {
		justify-content: flex-start;
		margin: 0;
	}
	.cu-form-group picker .picker{
		text-align: left;
	}
	.solids::after {
	    border: 2px dashed #c5c5c5;
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
</style>
