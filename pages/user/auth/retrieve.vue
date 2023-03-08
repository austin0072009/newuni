<template>
	<view>
		<view class="auth" style="padding: 20rpx;">
			<view class="wanl-title">{{$t('login.msg44')}}</view>
			<form @submit="formSubmit">
				<view class="auth-group radius-bock bg-gray wlian-grey-light">
					<input 
						:placeholder="$t('login.msg45')" 
						type="number"
						maxlength="-1"
						confirm-type="next" 
						placeholder-class="placeholder" 
						name="mobile"
						@input="onKeyInput"
					></input>
				</view>
				
				<view class="auth-button flex flex-direction">
					<button class="cu-btn bg-orange sl radius-bock" form-type="submit" :disabled="submitDisabled">{{$t('login.msg3')}}</button>
				</view>
			</form>
		</view>
		<view class="auth-foot">
			<view class="menu text-grey">
				<text @tap="register">{{$t('user.registered')}}</text>
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
			pageroute: ''
		};
	},
	onLoad(options) {
		this.pageroute = options.url;
	},
	methods: {
		onKeyInput: function(e) {
			this.submitDisabled = false
		},
		formSubmit: function(e) {
			//将下列代码加入到对应的检查位置
			//定义表单规则
			var rule = [
				{ name: 'mobile', checkType: 'phoneno', errorMsg: this.$t('login.msg35') }
			];
			//进行表单检查
			var formData = e.detail.value;
			var checkRes = graceChecker.check(formData, rule);
			if (checkRes) {
				this.$wanlshop.to(`validcode?event=resetpwd&mobile=${e.detail.value.mobile}&url=${this.pageroute}`);
			} else {
				this.$wanlshop.msg(graceChecker.error);
			}
		},
		register() {
			this.$wanlshop.to(`register?url=${this.pageroute}`);
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
