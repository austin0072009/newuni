<template>
	<view>
		<view class="auth">
			<view class="logo-section">
				<image src="../../../static/images/logo2.png"></image>
				<view class="wanl-login">{{$t('login.msg')}}</view>
			</view>
			<view class="form" style="padding: 20rpx;">
				<form @submit="formSubmit">
					<view class="auth-group radius-bock bg-gray wlian-grey-light">
						<input 
							type="text"
							:placeholder="$t('setting.msg6')" 
							confirm-type="next" 
							maxlength="16"
							placeholder-class="placeholder" 
							name="account"
							:value="account"
						></input>
					</view>
					<view class="auth-group radius-bock bg-gray wlian-grey-light">
						<input 
							type="text"
							:placeholder="$t('login.msg16')" 
							password="true" 
							confirm-type="done"
							maxlength="16"
							placeholder-class="placeholder" 
							name="password"
							@input="onKeyInput"
						></input>
					</view>
					<view class="text-right" @tap="retrieve">
						{{$t('login.msg17')}}
					</view>
					<view class="auth-button flex flex-direction">
						<button class="cu-btn bg-orange sl radius-bock" form-type="submit" :disabled="submitDisabled">{{$t('login.msg18')}}</button>
					</view>
					<view class="text-center" @tap="phone">
						{{$t('login.msg19')}}
					</view>
				</form>
			</view>
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
			account: '',
			pageroute: ''
		};
	},
	onLoad(option){
		// 用户名
		this.account = option.name;
		this.pageroute = option.url;
	},
	methods: {
		onKeyInput: function(e) {
			this.submitDisabled = false
		},
		formSubmit: function(e) {
			//定义表单规则
			var rule = [
				{ name: 'account', checkType: 'notnull', errorMsg: this.$t('setting.msg6') },
				{ name: 'password', checkType: 'string', checkRule: '6,16', errorMsg: this.$t('login.msg20') }
			];
			//进行表单检查
			var formData = e.detail.value;
			var checkRes = graceChecker.check(formData, rule);
			if (checkRes) {
				this.$api.post({
					url: '/wanlshop/user/login', 
					data: {
						account: formData.account,
						password: formData.password,
						client_id: uni.getStorageSync("wanlshop:chat_client_id")?uni.getStorageSync("wanlshop:chat_client_id") : null
					},
					success: res => {
						this.$store.dispatch('user/login', res);
						this.$store.dispatch('cart/login');
						this.$store.dispatch('chat/get');
						uni.reLaunch({url: decodeURIComponent("/pages/user?")});
					},
					fail: res => {
						
						this.$wanlshop.msg(res.msg);
					}
				});
				setTimeout(function() {
					
				    let curPage = getCurrentPages();
				    let route = curPage[curPage.length - 1].route; //获取当前页面的路由
				    console.log(route);
				        if (route!="pages/user")
				        {
							uni.showToast({
								title: '您得网络出现问题，请调整当前网络后 稍后再试',
								icon: "none",    //如果要纯文本，不要icon，将值设为'none'
								duration: 2000    //持续时间为 2秒
							})  
				        	//this.$wanlshop.msg("您得网络出现问题，请调整当前网络后 稍后再试");
				        }
				        console.log('定时结束')
				     }, 3000);
			} else {
				this.$wanlshop.msg(graceChecker.error);
			}
		},
		
		retrieve(){
			this.$wanlshop.to(`retrieve?url=${this.pageroute}`);
		},
		phone() {
			this.$wanlshop.to(`phone?url=${this.pageroute}`);
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
