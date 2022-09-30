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
			// 获取系统信息
			let sysinfo = uni.getSystemInfoSync();
            this.sendDate = Object.assign({
				device: {
					language: sysinfo.language,
					brand: sysinfo.brand,
					model: sysinfo.model,
					system: sysinfo.system,
					// #ifdef MP-ALIPAY
					platform: '支付宝小程序',
					// #endif
					// #ifdef MP-BAIDU
					platform: '百度小程序',
					// #endif
					// #ifdef MP-QQ
					platform: 'QQ小程序',
					// #endif
					// #ifdef MP-TOUTIAO
					platform: '头条小程序',
					// #endif
					// #ifdef MP-WEIXIN
					platform: '微信小程序',
					// #endif
					// #ifdef H5
					platform: 'H5',
					// #endif
					// #ifdef APP-PLUS
					platform: sysinfo.platform,
					startupTime: plus.runtime.startupTime, //获取当前应用的启动时间戳
					launchLoadedTime: plus.runtime.launchLoadedTime, //获取当前应用首页加载的时间
					uniVersion: plus.runtime.uniVersion, //客户端uni-app运行环境的版本号
					innerVersion: plus.runtime.innerVersion, //客户端5+运行环境的内部版本号
					versionCode: plus.runtime.versionCode, //客户端的版本号
					version: plus.runtime.version, //客户端的版本名称
					origin: plus.runtime.origin //应用安装来源
					// #endif
				}
			}, this.sendDate);
        },
        methods: {
            chooseMsg() { //快速输入
                uni.showActionSheet({
                    itemList: this.msgContents,
                    success: (res) => {
                        this.sendDate.content = this.msgContents[res.tapIndex];
                    }
                })
            },
            chooseStar(e) { //点击评星
                this.sendDate.score = e.index;
            },
			chooseImg() { //选择图片
			    uni.chooseImage({
			        sourceType: ["camera", "album"],
			        sizeType: "compressed",
			        count: 8 - this.sendDate.images.length,
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
            send() { //发送反馈
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
	/*问题反馈*/
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
