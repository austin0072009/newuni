<template>
	<view class="recharge">
		<view class="balance_mode">
			<view class="title_text">
				<text>{{$t('index.bank_recharge')}}</text>
			</view>
			<view class="money_num">
				{{ this.amount }}
			</view>
		</view>
		<view class="credential_mode">
			<view class="title_text">
				{{ $t('money.union_pay_text')}}
			</view>
			<view class="credential_content">
				<view class="up_img_mode">
					<view class="img_list" v-if="this.url != ''">
						<image :src="this.url"></image>
					</view>
					<view class="up_img" @tap="chooseImage">
						<image src="../../../static/images/img-upload.png"></image>
					</view>
				</view>
				<text>{{ $t('money.upload_voucher')}}</text>
			</view>
		</view>
		<button class="confirm_btn" @tap="confirm()"> {{$t('money.confirm_transfer')}}</button>
		<view class="tips_mode">
			<view class="tips_content">
				<view class="tips_title">
					<span>{{$t('money.payment_tip_title')}}</span>
				</view>
				<view>
					{{$t('money.payment_tip_1')}}
				</view>
				<view>
					{{$t('money.payment_tip_2')}}
				</view>
				<view>
					{{$t('money.payment_tip_3')}}
				</view>
				<view>
					{{$t('money.payment_tip_4')}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				amount: '',
				url: '',
			};
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title:this.$t('index.bank_recharge')
			});
			this.amount = options.amount;
		},
		methods: {
			chooseImage() {
				uni.chooseImage({
					count: 1, // 默认9
					sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: res => {
						// 设置url的值，显示控件
						this.url = res.tempFilePaths[0];
					}
				});
			},
			confirm() {
				
				if(this.url == ''){
					this.$wanlshop.msg(this.$t('money.upload_voucher'));
					return;
				}
				
				let that = this;
				uni.showToast({
					title: this.$t('money.under_review'),
					duration: 1000,
				});
		this.$api.get({
			url: '/wanlshop/common/uploadData',
			success: updata => {
				this.$api.upload({
					url: updata.uploadurl,
					filePath: this.url,
					name: 'file',
					formData: updata.storage == 'local' ? null : updata.multipart,
					success: res => {
						console.log(res);
						this.$api.post({
							url: '/wanlshop/user/profile', 
							data: {avatar: res.fullurl},
							success: data => {
								console.log(data);
								//this.$store.commit('user/setUserInfo', {avatar: data.avatar});
								this.$api.post({
									url: '/wanlshop/pay/recharge',
									data: {
										type: 'USDT',
										method: 'USDT',
										code: null,
										money: this.amount,
										url:res.fullurl
									},
									
									success: res => {
										switch (data.type) {
										    case 'unionpay':
												alert('union')
												break;
										    case 'usdt':
										       alert('usdt');
												break;
										} 
									}
								});
							}
						});
					}
				});
			}
		});
		
				setTimeout(function() {
					uni.reLaunch({
						url: '/pages/user'
					})
				}, 1000);
			}
		}
	}
</script>

<style>
	.recharge {
		background: #fff;
	}
	.balance_mode {
	    width: 100%;
	    padding: 0 24px;
	    background: #fff;
	}
	
    .balance_mode .title_text {
	    font-size: 12px;
	    padding-top: 9px;
	}
	
	.balance_mode .money_num {
	    width: 100%;
	    display: flex;
	    align-items: center;
	    font-size: 24px;
	    padding: 19px 0;
	}
	
	.credential_mode {
		background: #fff;
	}
	.credential_mode .title_text {
	    padding: 9px;
	}
	
	.credential_mode .credential_content {
	    width: 100%;
	    background: #fff;
	    padding: 12px;
	}
	
	.credential_content .up_img {
		width: 72px;
		height: 72px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
	
	.credential_mode .credential_content .up_img uni-image {
	    width: 24px;
	    height: 24px;
	}
	
	.credential_mode .credential_content .up_img_mode {
	    display: flex;
	    align-items: center;
	    margin-top: 9px;
	}
	
	.credential_mode .credential_content .img_list {
	    display: flex;
	    align-items: center;
	}
	
	.credential_mode .credential_content .up_img_mode .img_list uni-image {
	    width: 72px;
	    height: 72px;
	    margin-right: 7px;
	    border-radius: 4px;
	}
	
	.confirm_btn {
	    width: 90%;
	    height: 38px;
	    margin: 0 auto;
	    background: #fb6600;
	    color: #fff;
	    text-align: center;
	    line-height: 38px;
	    margin-top: 24px;
	    border-radius: 7px;
	}
	.tips_mode {
	    width: 100%;
	    margin-top: 9px;
	}
	
	.tips_mode .tips_content {
	    width: 90%;
	    margin: 0 auto;
	    color: #fa436a;
	    padding: 9px 0;
	    line-height: 21px;
	}
</style>
