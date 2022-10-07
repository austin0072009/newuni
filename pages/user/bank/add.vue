<template>
	<view>
		<view class="edgeInsetTop"></view>
		<view class="cu-form-group">
			<view class="title">{{$t('bank.title1')}}</view>
			<picker @change="bankChange" :value="index" :range="bankList" range-key="bankName">
				<view class="picker">
					<view class="flex justify-end align-center" v-if="index > -1">
						<image :src="`/static/images/bank/${bankList[index].bankCode}.png`"></image>
						<view class="margin-left-xs">{{bankList[index].bankName}}</view>
					</view>
					<view v-else>
						{{$t('bank.msg1')}}
					</view>
				</view>
			</picker>
		</view>
		<view class="cu-form-group" v-if="this.bankData.bankCode == 'VM' ">
			<view class="title">{{$t('bank.title2')}}</view>
			<input type="text" :placeholder="$t('bank.msg2')" v-model="bankData.cardCode"/>
		</view>
		<view class="cu-form-group" v-if="this.bankData.bankCode == 'TRON' ">
			<view class="title">{{$t('bank.title21')}}</view>
			<input type="text" :placeholder="$t('bank.msg2')" v-model="bankData.cardCode"/>
		</view>
		
		
		<view class="cu-form-group">
			<view class="title">{{$t('bank.title3')}}</view>
			<input type="text" maxlength="4" :placeholder="$t('bank.msg3')" v-model="bankData.username"/>
		</view>
		<view class="cu-form-group">
			<view class="title">{{$t('bank.title4')}}</view>
			<input type="number" maxlength="11" :placeholder="$t('bank.msg4')" v-model="bankData.mobile"/>
		</view>
		<view class="padding-bj flex flex-direction margin-top">
			<button @tap="confirm" class="cu-btn wanl-bg-orange lg">{{$t('bank.complete')}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bankData: {
					username: '',
					mobile: '',
					bankCode: '',
					bankName: '',
					cardCode: ''
				},
				index: -1,
				bankList: [
					// {bankCode: 'ALIPAY', bankName: '支付宝账户'},
					// {bankCode: 'WECHAT', bankName: '微信账户'},
					// {bankCode: 'ICBC', bankName: '工商银行'},
					// {bankCode: 'ABC', bankName: '农业银行'},
					// {bankCode: 'PSBC', bankName: '邮储银行'},
					// {bankCode: 'CCB', bankName: '建设银行'},
					// {bankCode: 'CMB', bankName: '招商银行'},
					// {bankCode: 'BOC', bankName: '中国银行'},
					// {bankCode: 'COMM', bankName: '交通银行'},
					// {bankCode: 'SPDB', bankName: '浦发银行'},
					// {bankCode: 'GDB', bankName: '广发银行'},
					// {bankCode: 'CMBC', bankName: '民生银行'},
					// {bankCode: 'PAB', bankName: '平安银行'},
					// {bankCode: 'CEB', bankName: '光大银行'},
					// {bankCode: 'CIB', bankName: '兴业银行'},
					// {bankCode: 'CITIC', bankName: '中信银行'}
					{bankCode: 'VM', bankName: 'Visa/Master'},
					{bankCode: 'TRON', bankName: 'USDT-TRC20'}
				]
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('bank.add_title')
			})
			uni.setNavigationBarColor({
			    frontColor: '#ffffff',
			    backgroundColor: 'rgb(250, 67, 106)',
			    animation: {
			        duration: 400,
			        timingFunc: 'easeIn'
			    }
			})
		},
		methods: {
			// 后续版本添加第三方API接口，自动获取银行，验证银行卡三要素
			confirm(){
				let data = this.bankData;
				if(!data.bankCode){
					this.$wanlshop.msg(this.$t('bank.msg5'));
					return;
				}
				if(!data.cardCode){
					this.$wanlshop.msg(this.$t('bank.msg6'));
					return;
				}
				if(!data.username){
					this.$wanlshop.msg(this.$t('bank.msg7'));
					return;
				}
				// var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
				// if(!data.mobile || !myreg.test(data.mobile)){
				// 	this.$wanlshop.msg(this.$t('bank.msg8'));
				// 	return;
				// }
				
				if(!data.mobile){
					
						this.$wanlshop.msg(this.$t('bank.msg8'));
						return;
				}
				console.log(data);
				
				
				this.$wanlshop.prePage().refreshList(data);
				this.$wanlshop.back(1);
			},
			bankChange(e) {
				this.index = e.detail.value;
				this.bankData.bankCode = this.bankList[e.detail.value].bankCode;
				this.bankData.bankName = this.bankList[e.detail.value].bankName;
			}
		}
	}
</script>

<style>
	.picker .flex image{
		width: 40rpx;
		height: 40rpx;
	}

</style>