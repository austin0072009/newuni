<template>
	<view>
		<view class="edgeInsetTop"></view>
		<view class="wanlian">
			<image :src="$wanlshop.oss(iniData.logo)" mode="aspectFill"></image>
			<view class="text-bold text-xxl margin-top-lg">{{iniData.name}}</view>
			<view class="text-lg margin-top-xs wanl-gray">V{{common.version}}_{{common.versionCode}}</view>
		</view>

		<view class="cu-list menu margin-xl">
			<view class="cu-item arrow" @tap="$wanlshop.to('/pages/user/feedback/feedback')">
				<view class="content">
					<text>{{$t('setting.btn19')}}</text>
				</view>
			</view>
			<!-- 版本更新&评分 后续版本更新 -->
			<view class="cu-item arrow">
				<view class="content"  @tap="scoring">
					<text>{{$t('setting.btn20')}}</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="update">
				<view class="content" >
					<text>{{$t('setting.btn21')}}</text>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="margin-bottom text-orange">
				<text @tap="onDetails(common.appConfig.user_agreement, $t('setting.msg23'))">《{{$t('setting.msg23')}}》</text>
				<text class="text-black">{{$t('setting.msg24')}}</text><text @tap="onDetails(common.appConfig.privacy_protection, $t('setting.msg25'))">《{{$t('setting.msg25')}}》</text>
			</view>
			<view class="text-gray">{{iniData.name}} {{$t('setting.msg26')}}</view>
			<view class="text-gray">Copyright © {{iniData.copyright}}</view>
		</view>
	</view>
</template>

<script>
import {mapState} from 'vuex';
export default {
	data() {
		return {
			iniData:{
				name: '加载中...',
				logo: '',
				copyright: ''
			}
		};
	},
	onLoad() {
		this.loadData();
	},
	computed: {
		...mapState(['common'])
	},
	methods: {
		async loadData() {
			this.$api.get({
				url: '/wanlshop/common/about',
				success: res => {
					this.iniData = res;
				}
			});
		},
		// 评分
		scoring(){
			this.$wanlshop.msg(this.$t('setting.msg27'));
		},
		// 更新
		update(){
			if (this.$store.state.update.update) {
				
			}else{
				this.$wanlshop.msg(this.$t('setting.msg28') + this.$store.state.common.version + this.$t('setting.msg29'));
			}
		}
	}
};
</script>

<style>
page {
	background-color: #ffffff;
}
.wanlian {
	display: flex;
	align-items: center; /* 垂直居中 */
	justify-content: center; /* 水平居中 */
	flex-direction: column;
	padding-top: 80rpx;
	padding-bottom: 60rpx;
}

.wanlian > image {
	height: 130rpx;
	width: 130rpx;
}

.footer {
	display: flex;
	align-items: center; /* 垂直居中 */
	justify-content: center; /* 水平居中 */
	flex-direction: column;
	position: fixed;
	bottom: 100rpx;
	font-size: 24rpx;
	width: 100%;
}
</style>
