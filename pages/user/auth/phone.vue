<template>
	<view>
		<view class="auth">
			<view class="wanl-title">{{$t('login.msg15')}}</view>
			<form @submit="formSubmit">
				<view class="auth-group radius-bock bg-gray wlian-grey-light">
					<input 
						:placeholder="$t('login.msg31')" 
						type="number" 
						maxlength="11" 
						confirm-type="next" 
						placeholder-class="placeholder" 
						name="mobile"  
						:value="mobile"
					></input>
				</view>
				
				<view class="auth-button flex flex-direction">
					<button class="cu-btn bg-orange sl radius-bock" form-type="submit">{{$t('login.msg32')}}</button><!-- disabled="true" -->
				</view>
				<view class="text-center" @tap="name">
					{{$t('login.msg33')}}
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
			mobile: '',
			pageroute: ''
		};
	},
	onLoad(options) {
		this.mobile = options.mobile;
		this.pageroute = options.url;
	},
	methods: {
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
				this.$wanlshop.to(`validcode?event=mobilelogin&mobile=${e.detail.value.mobile}&url=${this.pageroute}`,'slide-in-bottom',200);
			} else {
				this.$wanlshop.msg(graceChecker.error);
			}
		},
		phoneKey: function (e) {
		    var phoneNum = this.value.trim();
			//如果是删除按键，则什么都不做
			if (e.keyCode === 8) {
				this.value = phoneNum;
				return;
			}
			var len = phoneNum.length;
			if (len === 3 || len === 8) {
				phoneNum += ' ';
				this.value = phoneNum;
			}
		},
		name() {
			this.$wanlshop.to(`name?name=${this.mobile}&url=${this.pageroute}`);
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
