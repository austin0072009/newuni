<template>
    <view class="wanl-feedback">
		<view class="edgeInsetTop"></view>
        <view class="feedback-title">
            <view>{{$t('feedback.title1')}}</view>
            <view class="feedback-quick text-red" @tap="chooseMsg">
				<text class="margin-right-xs">{{$t('feedback.msg1')}}</text>
				<text class="wlIcon-fanhui4"></text>
			</view>
        </view>
		<view class="cu-form-group">
			<textarea maxlength="-1" v-model="sendDate.content" placeholder-class="placeholder" :placeholder="$t('feedback.msg2')"></textarea>
		</view>
        <view class="feedback-title">
            <text>{{$t('feedback.title2')}}</text>
        </view>
		<view class="cu-bar bg-white">
			<view class="action">
				{{$t('feedback.msg3')}}
			</view>
			<view class="action">
				{{sendDate.images.length}}/8
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(image,index) in sendDate.images" :key="index">
				 <image :src="image" @tap="previewImage(sendDate.images, index)" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="close(index)">
						<text class='wlIcon-shanchu2'></text>
					</view>
				</view>
				<view class="solids" @tap="chooseImg" v-if="sendDate.images.length<8">
					<text class="wlIcon-31paishe"></text>
				</view>
			</view>
		</view>
		<view class='feedback-title'>
		    <text>{{$t('feedback.title3')}}</text>
		</view>
		<view class="cu-form-group">
			<input :placeholder="$t('feedback.msg4')" placeholder-class="placeholder" v-model="sendDate.contact"></input>
		</view>
        <view class='feedback-title feedback-star-view'>
            <text>{{$t('feedback.title4')}}</text>
            <view class="feedback-star-view">
				<wanl-rate :quantity="5" :size="24" normal="#dadada" :current="sendDate.score"  @change="chooseStar"/>
            </view>
        </view>
		<view class="wanlian cu-bar tabbar foot flex flex-direction">
			<button class="cu-btn wanl-bg-redorange lg" @tap="send">{{$t('feedback.btn1')}}</button>
		</view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                msgContents: [this.$t('feedback.msg5'), this.$t('feedback.msg6'), this.$t('feedback.msg7'), this.$t('feedback.msg8')],
                sendDate: {
                    score: 0,
                    content: "",
					images: [],
                    contact: ""
                }
            }
        },
        onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('feedback.item_title')
			})
			uni.setNavigationBarColor({
			    frontColor: '#ffffff',
			    backgroundColor: 'rgb(250, 67, 106)',
			    animation: {
			        duration: 400,
			        timingFunc: 'easeIn'
			    }
			})
			// ??????????????????
			let sysinfo = uni.getSystemInfoSync();
            this.sendDate = Object.assign({
				device: {
					language: sysinfo.language,
					brand: sysinfo.brand,
					model: sysinfo.model,
					system: sysinfo.system,
					// #ifdef MP-ALIPAY
					platform: '??????????????????',
					// #endif
					// #ifdef MP-BAIDU
					platform: '???????????????',
					// #endif
					// #ifdef MP-QQ
					platform: 'QQ?????????',
					// #endif
					// #ifdef MP-TOUTIAO
					platform: '???????????????',
					// #endif
					// #ifdef MP-WEIXIN
					platform: '???????????????',
					// #endif
					// #ifdef H5
					platform: 'H5',
					// #endif
					// #ifdef APP-PLUS
					platform: sysinfo.platform,
					startupTime: plus.runtime.startupTime, //????????????????????????????????????
					launchLoadedTime: plus.runtime.launchLoadedTime, //???????????????????????????????????????
					uniVersion: plus.runtime.uniVersion, //?????????uni-app????????????????????????
					innerVersion: plus.runtime.innerVersion, //?????????5+??????????????????????????????
					versionCode: plus.runtime.versionCode, //?????????????????????
					version: plus.runtime.version, //????????????????????????
					origin: plus.runtime.origin //??????????????????
					// #endif
				}
			}, this.sendDate);
        },
        methods: {
            chooseMsg() { //????????????
                uni.showActionSheet({
                    itemList: this.msgContents,
                    success: (res) => {
                        this.sendDate.content = this.msgContents[res.tapIndex];
                    }
                })
            },
            chooseStar(e) { //????????????
                this.sendDate.score = e.index;
            },
			chooseImg() { //????????????
			    uni.chooseImage({
			        sourceType: ["camera", "album"],
			        sizeType: "compressed",
			        count: 8 - this.sendDate.images.length,
			        success: res => {
						this.$api.get({
							url: '/wanlshop/common/uploadData',
							success: updata => {
								for (let i = 0; i < res.tempFilePaths.length; i++) {
									// ??????????????????
									uni.getImageInfo({
										src: res.tempFilePaths[i],
										success: image => {
											this.$api.upload({
												url: updata.uploadurl,
												filePath: image.path,
												name: 'file',
												formData: updata.storage == 'local' ? null : updata.multipart,
												success: data => {
													this.sendDate.images.push(data.fullurl);
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
			    this.sendDate.images.splice(e,1);
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
            send() { //????????????
                this.$api.post({
                	url: '/wanlshop/feedback/add',
					data: this.sendDate,
                	success: res => {
                		this.$wanlshop.to('/pages/page/success?type=feedback');
                	}
                });
            }
        }
    }
</script>

<style>
	/*????????????*/
	.feedback-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 25rpx;
		color: #666;
	}
	.feedback-star-view.feedback-title {
		justify-content: flex-start;
		margin: 0;
	}
	.feedback-quick {
		position: relative;
	}
	.feedback-star-view {
		margin-left: 20upx;
	}
	.cu-bar .action:first-child {
	    font-size: 26rpx;
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
