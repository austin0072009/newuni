<template>
	<view>
		<view class="edgeInsetTop"></view>
		<view class="cu-form-group margin-top">
			<view class="title">{{$t('setting.btn13')}}</view>
			<switch @change="pushs" :class="user.pushs?'checked':''" :checked="user.pushs?true:false"/>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">{{$t('setting.btn14')}}</view>
			<switch @change="voice" :class="user.voice?'checked':''" :checked="user.voice?true:false"/>
		</view>
		<view class="cu-form-group ">
			<view class="title">{{$t('setting.btn15')}}</view>
			<switch @change="shock" :class="user.shock?'checked':''" :checked="user.shock?true:false"/>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		computed: {
			...mapState(['user'])
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('setting.notice_title')
			})
		},
		methods: {
			async loadData(data) {
				// this.$api.post({
				// 	url: '/wanlshop/user/profile', 
				// 	data: data
				// });
				console.log('需要修改Fastadmin User数据表，原生版本暂不可以同步');
				uni.setStorageSync("wanlshop:user", this.$store.state.user);
			},
			pushs(e) {
				let data = {
					pushs: e.target.value
				};
				this.$store.commit('user/setUserInfo', data);
				this.loadData(data); // 提交服务器
			},
			voice(e) {
				let data = {
					voice: e.target.value
				};
				this.$store.commit('user/setUserInfo', data);
				this.loadData(data);
			},
			shock(e) {
				let data = {
					shock: e.target.value
				};
				this.$store.commit('user/setUserInfo', data);
				this.loadData(data);
			}
		}
	}
</script>

<style>
</style>
