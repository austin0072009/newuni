<template>
	<view>
		<view class="auth" style="padding: 20rpx;">
			<view class="wanl-title">{{$t('address.msg12')}} {{$t('login.msg38')}}</view> 
			<form @submit="formSubmit">
				<view class="auth-group radius-bock bg-gray wlian-grey-light">
					<input confirm-type="done" :placeholder="$t('login.msg39')" password type="text" placeholder-class="placeholder" name="newpassword" @input="onKeyInput" ></input>
					<input name="mobile" disabled :value="mobile" style="display: none;" ></input>
					<input name="captcha" disabled :value="captcha" style="display: none;" ></input>
				</view>
				<view class="auth-button flex flex-direction">
					<button class="cu-btn bg-orange sl radius-bock" formType="submit" :disabled="submitDisabled">{{$t('address.msg12')}}{{$t('login.msg38')}}</button>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
import graceChecker from '@/common/graceChecker';//来自 graceUI 的表单验证， 使用说明见手册 http://grace.hcoder.net/doc/info/73-3.html
export default {
	data() {
		return {
			username: this.$store.state.user.username,
			mobile: '',
			captcha: '',
			submitDisabled: true
		};
	},
	onLoad(options) {
		this.mobile = options.mobile;
		this.captcha = options.captcha;
	},
	methods: {
		onKeyInput(e) {
			this.submitDisabled = false
		},
		formSubmit(e) {
			//将下列代码加入到对应的检查位置
			//定义表单规则
			var rule = [
				// { name: 'mobile', checkType: 'phoneno', errorMsg: this.$t('login.msg40') },
				{ name: "captcha", checkType: "zipcode", errorMsg: this.$t('login.msg41') },
				{ name: "newpassword", checkType: "string", checkRule: "6,12", errorMsg: this.$t('login.msg42') }
			];
			//进行表单检查
			var formData = e.detail.value;
			var checkRes = graceChecker.check(formData, rule);
			if (checkRes) {
				this.$api.post({
				    url: '/wanlshop/user/resetpwd', 
					data:{
						mobile: formData.mobile,  
						captcha: formData.captcha,
						newpassword: formData.newpassword
					},
				     success: res => {
				        // 提示
						this.$wanlshop.msg(this.$t('login.msg43'));
				        // 返回
				        uni.switchTab({
				        	url: '/pages/user'
				        });
				    }
				});
			} else {
				this.$wanlshop.msg(graceChecker.error);
			}
		}
	}
};
</script>

<style>
	@import url("auth.css");
</style>
