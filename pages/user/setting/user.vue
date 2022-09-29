<template>
	<view>
		<view class="edgeInsetTop"></view>
		<form @submit="formSubmit">
			<view class="cu-list menu solid-bottom">
				<view class="cu-item arrow" style="min-height:150rpx;" @tap="Avatar">
					<view class="content">
						<text style="font-size: 30rpx;">{{$t('setting.title1')}}</text>
					</view>
					<view class="action">
						<view class="cu-avatar round lg" :style="{backgroundImage: 'url('+ $wanlshop.oss(user.avatar, 52, 52, 2, 'avatar') +')'}" ></view>
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">{{$t('setting.title2')}}</view>
				<input :placeholder="$t('setting.msg5')" name="nickname" :value="user.nickname"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">{{$t('setting.title3')}}</view>
				<input :placeholder="$t('setting.msg6')" name="username" :value="user.username"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">{{$t('setting.title4')}}</view>
				<input :placeholder="$t('setting.msg7')" name="bio" :value="user.bio"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">{{$t('setting.title5')}}</view>
				<view style="display: none;">
					<input name="gender" :value="genderdata" disabled></input> 
				</view>
				<switch class='switch-sex' @change="Gender" :class="gender?'checked':''" :checked="gender?true:false"></switch>
			</view>
			<view class="cu-form-group">
				<view class="title">{{$t('setting.title6')}}</view>
				<picker mode="date" :value="user.birthday || '1992-08-23'" @change="DateChange">
					<view style="display: none;">
						<input name="birthday" :value="user.birthday" disabled></input>
					</view>
					<view class="picker">
						{{user.birthday || '1992-08-23'}}
					</view>
				</picker>
			</view>
			<view class="padding-bj flex flex-direction">
				<button form-type="submit" class="cu-btn wanl-bg-redorange margin-tb lg">{{$t('setting.btn7')}}</button>
				<button class="cu-btn line-red lg" @tap="logout()">{{$t('setting.btn8')}}</button>
			</view>
		</form>

	</view>
</template>

<script>
	import graceChecker from '@/common/graceChecker';
	import { mapState } from 'vuex';
	export default {
		computed: {
			...mapState(['user'])
		},
		data() {
			return {
				gender: true,
				genderdata: 0 
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('setting.user_title')
			})
			//中央总线重新赋值Data
			this.gender = this.$store.state.user.gender == 0 ? true : false;
			this.genderdata = this.$store.state.user.gender;
		},
		methods: {
			logout() {
				this.$api.get({
					url: '/wanlshop/user/logout',
					data: {
						client_id: uni.getStorageSync("wanlshop:chat_client_id")?uni.getStorageSync("wanlshop:chat_client_id") : null
					},
					success: res => {
						this.$store.dispatch('user/logout');
						this.$wanlshop.msg(this.$t('setting.msg8'));
						this.$wanlshop.back(1);
					}
				});
			},
			DateChange(e) {
				this.$store.state.user.birthday = e.detail.value
			},
			Gender(e) {
				if(e.detail.value == true){
					this.gender = true;
					this.genderdata = 0;
				}else{
					this.gender = false;
					this.genderdata = 1;
				}
			},
			Avatar(){
				this.$wanlshop.to('/pages/user/portrait/portrait');
			},
			formSubmit: function(e) {
				//定义表单规则
				
				let rule = [
					{name: 'username', checkType: 'string', checkRule: '3,32', errorMsg: this.$t('setting.msg9')},
					{name: 'nickname', checkType: 'string', checkRule: '3,32', errorMsg: this.$t('setting.msg10')}
				];
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = graceChecker.check(formData, rule);
				// ..检查是否注册-没注册跳转注册
				if (checkRes) {
					this.$api.post({
						url: '/wanlshop/user/profile', 
						data: formData,
						success: res => {
							// 保存用户信息
							this.$store.commit('user/setUserInfo', formData);
							// 提示
							this.$wanlshop.msg(this.$t('setting.msg11'));
						}
					});
				} else {
					this.$wanlshop.msg(graceChecker.error);
				}
			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
