<template>
	<view>
		<view class="up-top">
			<text>{{$t('other.msg32')}}</text>
			<text>{{$t('other.msg33')}}</text>
			<text>{{$t('other.msg34')}}</text>
		</view>
		<wanl-empty src="find_default3x" :text="$t('other.empty3')" v-if="list.length === 0"/>
		<view class="up-log" v-for="(item, index) in list">
			<text>{{item.title}}</text>
			<text>{{item.createtime}}</text>
			<text v-if="item.status == 1" style="color: rgb(76, 217, 100);">{{$t('other.msg35')}}</text>
			<text v-else-if="item.status == 2" style="color: red;">{{$t('other.msg36')}}</text>
			<text v-else style="color: #7e7e7e;">{{$t('other.msg37')}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('other.upgradelog_title')
			})
			this.loadData();
		},
		methods: {
			async loadData() {
				this.$api.get({
					url: '/wanlshop/shop/mchUpgradeLog',
					data: {},
					success: res => {
						this.list = res;
					}
				});
			}
		}
	}
</script>

<style>
.up-top {
    display: flex;
    justify-content: space-between;
    margin: 0 22px;
    padding: 11px 0;
}
.up-log {
    margin: 11px;
    background-color: #fff;
    padding: 16px 11px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
}
.up-log uni-text {
    font-size: 15px;
}
</style>
