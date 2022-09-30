<template>
	<view class="wanl-signin">
		<view class="edgeInsetTop"> </view>
		<view class="header wanl-bg-redorange">
			<view class="user margin-left">
				<view class="cu-avatar lg round" :style="{ backgroundImage: 'url(' + $wanlshop.oss(user.avatar, 52, 52, 2, 'avatar') + ')' }"></view>
				<view class="margin-left-bj">
					<view class="text-xl">
						{{user.nickname}} 
					</view>
					<view class="text-sm">
						<text class="margin-right">Lv{{user.level}}</text> 
						<text class="margin-right-xs wlIcon-jifen2"></text> {{$t('user.points')}}：{{user.score}}
					</view>
				</view>
			</view>
			<view class="tag text-orange text-sm" @tap="onScore">
				<text class="wlIcon-liwuhuodong" style="margin-right: 5rpx;"></text>{{$t('signin.integral_record')}}
			</view>
		</view>
		<view class="content bg-white padding-tb-bj radius-bock shadow-warp">
			<view class="text-df margin-tb-xs margin-lr-bj text-bold" style="color: #5A5B5C;">
				<view v-if="signinData.signin">
					{{$t('signin.msg1')}}
					<text>{{ signinData.successions }}</text>
					{{$t('signin.msg2')}}
					<text>{{ signinData.score }}</text>
					{{$t('user.points')}}
				</view>
				<view v-else>
					{{$t('signin.msg3')}}
					<text>{{ signinData.score }}</text>
					{{$t('user.points')}}
				</view>
			</view>
			<wanl-steps :active="signinData.successions" activeColor="#ffbc00" :options="stepsOption" />
			<view class="text-center">
				<view v-if="signinData.signin"><button class="cu-btn bg-gray round lg text-sm text-gray">{{$t('signin.btn1')}}</button></view>
				<view v-else><button class="cu-btn wanl-bg-redorange round lg text-sm" @tap="attendance">{{$t('signin.btn2')}}</button></view>
			</view>
		</view>
		<view class="margin-bj radius-bock shadow-warp"><uni-calendar :selected="selected" :showReturn="false" @change="change" /></view>
		<view class="edgeInsetBottom"></view> 
		<wanl-modal custom :show="attendanceModalVisible">
			<view class="attendance-modal">
				<view class="modal-header">
					<image :src="$wanlshop.appstc('/common/cup.png')" mode="widthFix"></image>
				</view>
				<view class="modal-content text-sm wanl-gray" >
					<view>{{ signinInfo }}</view>
				</view>
				<view class="modal-btn"><button class="cu-btn wanl-bg-redorange round lg text-sm" @tap="attendanceModalVisible = false">{{$t('signin.btn3')}}</button></view>
			</view>
		</wanl-modal>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			signinData: {},
			selected: [],
			signinInfo: '',
			attendanceModalVisible: false,
			stepsOption: [
				{ title: '1' + this.$t('signin.day'), desc: '+1' },
				{ title: '2' + this.$t('signin.day'), desc: '+2' },
				{ title: '3' + this.$t('signin.day'), desc: '+3' },
				{ title: '4' + this.$t('signin.day'), desc: '+4' },
				{ title: '5' + this.$t('signin.day'), desc: '+5' },
				{ title: '6' + this.$t('signin.day'), desc: '+6' },
				{ title: '7' + this.$t('signin.day'), desc: '+7' },
				{ title: '7' + this.$t('signin.day') + '+', desc: '+7', circle: '/static/images/integrals/goal.png', circleStyle: 'width: 47rpx; height: 39rpx;' }
			]
		};
	},
	onLoad(option) {
		uni.setNavigationBarTitle({
			title:this.$t('signin.sign_title')
		})
		uni.setNavigationBarColor({
		    frontColor: '#ffffff',
		    backgroundColor: 'rgb(250, 67, 106)',
		    animation: {
		        duration: 400,
		        timingFunc: 'easeIn'
		    }
		})
		this.loadData();
	},
	computed: {
		...mapState(['user'])
	},
	methods: {
		async loadData() {
			this.$api.get({
				url: '/wanlshop/signin/getSignin',
				success: res => {
					this.signinData = res;
					// 进程
					this.stepsOption[0].desc = '+' + res.signinscore.s1;
					this.stepsOption[1].desc = '+' + res.signinscore.s2;
					this.stepsOption[2].desc = '+' + res.signinscore.s3;
					this.stepsOption[3].desc = '+' + res.signinscore.s4;
					this.stepsOption[4].desc = '+' + res.signinscore.s5;
					this.stepsOption[5].desc = '+' + res.signinscore.s6;
					this.stepsOption[6].desc = '+' + res.signinscore.s7;
					this.stepsOption[7].desc = '+' + res.signinscore.sn;
					// 打标
					res.list.forEach(item => {
						this.selected.push({ date: this.timestampToTime(item.createtime), info: this.$t('signin.msg4') });
					});
					this.$store.commit('user/setUserInfo', {score:res.user_score});
				}
			});
		},
		// 点击签到
		attendance() {
			this.$api.post({
				url: '/wanlshop/signin/dosign',
				success: res => {
					this.loadData();
					if (this.signinData.signin) {
						this.signinInfo = this.$t('signin.msg1')+this.signinData.successions+this.$t('signin.msg5')+this.signinData.score+this.$t('user.points');
					}else{
						this.signinInfo = this.$t('signin.msg6')+this.signinData.score+this.$t('signin.msg7');
					}
					this.attendanceModalVisible = true;
				}
			});
		},
		// 补签
		change(data) {
			// 正常签到
			if (this.signinData.date == data.fulldate) {
				this.attendance();
			} else {
				// 补签
				if (this.signinData.isfillup == 1) {
					uni.showModal({
						title: this.$t('signin.msg8'),
						content: this.$t('signin.msg9') + data.fulldate + this.$t('signin.msg10') + this.signinData.fillupscore + this.$t('user.points'),
						success: res => {
							if (res.confirm) {
								this.$api.get({
									url: '/wanlshop/signin/fillup',
									data: {
										date: data.fulldate
									},
									success: res => {
										this.signinInfo = this.$t('signin.msg11')+ data.fulldate +this.$t('signin.msg12')+this.signinData.fillupscore+this.$t('user.points');
										this.attendanceModalVisible = true;
										this.loadData();
									}
								});
							}
						}
					});
				} else {
					this.$wanlshop.msg(this.$t('signin.msg13'));
				}
			}
		},
		timestampToTime(timestamp) {
			var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			var D = date.getDate();
			return Y + M + D;
		},
		onScore(){
			this.$wanlshop.to('/pages/user/signin/log');
		}
	}
};
</script>

<style>
.wanl-signin .header {
	display: flex;
	height: 320rpx;
	align-items: center;
	justify-content: space-between;
}

.wanl-signin .header .user {
	display: flex;
	align-items: center;
}

.wanl-signin .header .tag {
	background-color: #fff;
	padding: 10rpx 10rpx;
	border-radius: 100rpx 0 0 100rpx;
}

.wanl-signin .content {
	margin: 25rpx;
	margin-top: -80rpx;
}

.wanl-signin .content .cu-btn {
	width: 50%;
}

.wanl-signin .attendance-modal .modal-header {
	width: 100%;
	height: 260rpx;
	margin-top: -180rpx;
	position: relative;
}
.wanl-signin .attendance-modal .modal-header image {
	width: 100%;
	height: 100%;
}
.wanl-signin .attendance-modal .modal-content {
	height: 200rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.wanl-signin .attendance-modal .modal-btn{
	display: flex;
	align-items: center;
	justify-content: center;
}
.wanl-signin .attendance-modal .btn {
	width: 100%;
	border-radius: 50rem;
	font-size: $font-size-lg;
}
</style>
