<template>
	<view>
		<view class="auth">
			<view class="logo-section">
				<image src="../../../static/images/logo2.png"></image>
				<view class="wanl-login">{{$t('login.msg')}}</view>
			</view>
			<view class="form" >
				<view class="item">
					<form @submit="formSubmit">
						<view class="u-tabs__wrapper__nav">
							<view class="scroll__item" :class="{'active' : phone}" @tap="changeEmail">{{ $t('login.phone') }}</view>
							<view class="scroll__item" :class="{'active' : !phone}" @tap="changeEmail">{{ $t('login.email') }}</view>
						</view>
						
		
						<view class="input" v-if="phone" style="justify-content: space-around;">
							<picker @change="bindPickerChange" :value="index" :range="array">
									<view class="uni-input">{{array[index]}}</view>
							</picker>
							<input :placeholder="$t('login.phone')" placeholder-class="placeholder" name="mobile" type="text" maxlength="16"
							 confirm-type="next" @input="onKeyInput" v-model="mobile"></input>
						</view>
						<view class="input" v-else>
							<input :placeholder="$t('login.email')" placeholder-class="placeholder" name="email" type="text" maxlength="16" confirm-type="next" @input="onKeyInput"></input>
						</view>
						
						<!-- <view class="auth-group radius-bock bg-gray wlian-grey-light">
							<input 
								:placeholder="$t('login.msg31')" 
								type="number" maxlength="11" 
								confirm-type="next" 
								placeholder-class="placeholder" 
								name="mobile"
								v-model="mobile"
								@input="onKeyInput"
							></input>
						</view> -->
						<view class="auth-button flex flex-direction">
							<button class="cu-btn bg-orange sl radius-bock" formType="submit" :disabled="submitDisabled">{{$t('login.msg32')}}</button>
						</view>
						<!-- 同意服务条款 -->
						<checkbox-group :class="checked == 1 ? 'shake-horizontal' : ''" class="auth-clause" @change="CheckboxChange">
							<checkbox class="orange" :class="checked == 2 ? 'checked' : ''" :checked="checked == 2 ? true : false" value="2" />
							<view>
								{{$t('login.msg5')}}<text @tap="onDetails($store.state.common.appConfig.user_agreement, $t('setting.msg23'))">{{$t('setting.msg23')}}</text>{{$t('login.msg6')}}<text @tap="onDetails($store.state.common.appConfig.privacy_protection, $t('setting.msg25'))">{{$t('setting.msg25')}}</text>
							</view>
						</checkbox-group>
					</form>
				</view>
			</view>
		</view>
		<view class="auth-foot">
			<view class="menu text-grey">
				<text @tap="auth">{{$t('login.msg18')}}</text>
				<text @tap="help">{{$t('login.msg7')}}</text>
			</view>
		</view>
	</view>
</template>
<script>
import graceChecker from '@/common/graceChecker';//来自 graceUI 的表单验证， 使用说明见手册 http://grace.hcoder.net/doc/info/73-3.html
export default {
	data() {
		return {
			submitDisabled: true,
			title: '表单验证',
			pageroute: '',
			mobile: '',
			checked: 0,
			phone: true,
			phoneRegion: '+86',
			  array: ['CN +86', 'US +1', 'MY +60', 'ID +62', 'PH +63', 'SG +65 ','TH +66',  'BN +673','TW +886', 'MM +95'],
			            index: 0,
		};
	},

	onLoad(options) {
		this.pageroute = options.url;
		if (options.mobile) {
			this.mobile = options.mobile;
			this.submitDisabled = false;
		}
	},
	methods: {
		    bindPickerChange: function(e) {
            console.log('picker发送选择改变，携带值为', e.detail.value)
            this.index = e.detail.value
			var number = this.array[e.detail.value].trim().split("+");
			console.log(number[1]);
			this.phoneRegion = number[1];
        },
		changeEmail() {
			this.phone = !this.phone
		},
		CheckboxChange(e) {
			this.checked = e.detail.value;
		},
		onKeyInput: function(e) {
			this.submitDisabled = false
		},
		formSubmit: function(e) {
			if(this.checked == 2){
				//定义表单规则
				// var rule = [
				// 	{ name: 'mobile', checkType: 'phoneno', errorMsg: this.$t('login.msg35') }
				// ];
				//进行表单检查
				var formData = e.detail.value;
				// var checkRes = graceChecker.check(formData, rule);
				var checkRes = 1;
				if (checkRes) {
					this.$api.get({
						url: '/wanlshop/validate/check_mobile_available',
						data: {
							mobile: (this.phoneRegion + this.mobile)
						},
						success: res => {
							this.$wanlshop.to(`validcode?event=register&mobile=${(this.phoneRegion + this.mobile)}&url=${this.pageroute}`,'slide-in-bottom',200);
						},
						fail: res => {
							uni.showModal({
							    title: this.$t('login.msg36'),
							    content: this.$t('login.msg37'),
							    success: (msg)=> {
							        if (msg.confirm) {
							           this.$wanlshop.to(`phone?mobile=${(this.phoneRegion + this.mobile)}&url=${this.pageroute}`,'slide-in-bottom',200);
							        } else if (msg.cancel) {
							            console.log('用户点击取消');
							        }
							    }
							});
						}
					});
				} else {
					this.$wanlshop.msg(graceChecker.error);
				}
			}else{
				this.checked = 1;
				setTimeout(() => {
					this.checked = 0;
					this.$wanlshop.msg(this.$t('login.msg13'));
				}, 300)
			}
		},
		auth() {
			this.$wanlshop.to(`auth?url=${this.pageroute}`);
		},
		help() {
			this.$wanlshop.to(`/pages/user/help?url=${this.pageroute}`);
		}
	}
};
</script>

<style>
	@import url("auth.css");
</style>
