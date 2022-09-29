<template>
	<view class="wanl-search">
		<!-- 导航条 -->
		<view class="cu-custom" :style="{height: $wanlshop.wanlsys().height + 'px' }">
			<view class="cu-bar fixed" :style="{ height: $wanlshop.wanlsys().height + 'px', paddingTop: $wanlshop.wanlsys().top + 'px'}">
				<view class="action" @tap="$wanlshop.back(1)">
					<text class="wlIcon-fanhui1"></text>
				</view>
				<view class="search-form round">
					<text class="wlIcon-sousuo1 text-bold"></text>
					<input type="text" maxlength="12" confirm-type="search" placeholder-style="color: #ccc" :placeholder="searchKeywords ? searchKeywords : ($t('gg.msg12') + searchTypeText[searchType])" @confirm="onSearchInputConfirmed" @input="onSearchInputChanged" focus />
				</view>
			</view>
		</view>
		<view class="history padding-lr" v-if="isHistory">
			<view v-if="historyList.length > 0">
				<view class="title">
					<text>{{$t('gg.msg13')}}</text>
					<text class="wlIcon-lajitong" @tap="removeHistory"></text>
				</view>
				<view class="list">
					<view v-for="(item, index) in historyList" :key="item.keywords" @tap="keywordsToList(item.keywords)">{{ item.keywords }}</view>
				</view>
			</view>
			<view>
				<view class="title">
					<text>{{$t('gg.msg14')}}</text>
					<text class="wlIcon-guanzhu"></text>
				</view>
				<view class="list">
					<block v-for="(item, index) in searchList" :key="item.id">
						<view v-if="item.flag == 'hot'" class="action" @tap="keywordsToList(item.keywords)">
							<text>{{ item.keywords }}</text>
							<text class="cu-tag badge">hot</text>
						</view>
						<view @tap="keywordsToList(item.keywords)" v-else>
							<text>{{ item.keywords }}</text>
						</view>
					</block>
				</view>
			</view>
		</view>
		<view class="cu-list menu" v-else>
			<view class="cu-item" v-for="(item, index) in search.searchList" :key="item.keywords">
				<view class="content" @tap="keywordsToList(item.keywords)">
					<text class="text-sm">{{ item.keywords }}</text>
				</view>
			</view>
			<view class="cu-item arrow" v-for="(item, index) in search.categoryList" :key="item.id" @tap="categoryToList(item.id, item.name)" v-if="searchType !== 'find'">
				<view class="content">
					<text class="text-sm text-gray">{{ item.name }}</text>
				</view>
				<view class="action">
					<view class="cu-tag round bg-orange light">{{ item.name }}{{$t('gg.msg15')}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			searchType: 'goods',
			searchTypeText: {
				goods: this.$t('gg.msg16'),
				groups: this.$t('gg.msg17'),
				find: this.$t('gg.msg18')
			},
			searchKeywords: '',
			isHistory: true, //历史记录&实时搜索
			searchList: {}, //热门搜索列表
			historyList: [], //历史记录列表
			search: {
				categoryList: {},
				searchList: {}
			}
		};
	},
	onReady() {
		this.loadData();
		this.historyList = uni.getStorageSync('search:history');
	},
	onLoad(option) {
		if (option.keywords) this.searchKeywords = option.keywords;
		if (option.type) this.searchType = option.type;
	},
	methods: {
		async loadData() {
			this.$api.get({
				url: '/wanlshop/common/searchList',
				success: res => {
					this.searchList = res;
				}
			});
		},
		async loadSearch(val) {
			this.$api.get({
				url: '/wanlshop/common/search',
				data: { search: val },
				success: res => {
					this.search = res;
					if(res.categoryList.length != 0 || res.searchList.length != 0){
						this.isHistory = false
					}
				}
			});
		},
		async setSearch(text) {
			this.$api.get({
				url: '/wanlshop/common/setSearch',
				data: { keywords: text }
			});
		},
		// 存储历史数据
		setHistory(text) {
			this.setSearch(text);
			this.loadData(); //重新加载热门搜索
			let historyList = uni.getStorageSync('search:history');
			this.historyList = [];
			this.historyList = historyList; //重新加载历史记录
			let searchHistory = historyList;
			if (!searchHistory) searchHistory = [];
			let serachData = {};
			if (typeof text === 'string') {
				serachData = { keywords: text };
			} else {
				serachData = text;
			}
			// 判断数组是否存在，如果存在，那么将放到最前面
			for (var i = 0; i < searchHistory.length; i++) {
				if (searchHistory[i].keywords === serachData.keywords) {
					searchHistory.splice(i, 1);
					break;
				}
			}
			searchHistory.unshift(serachData);
			uni.setStorage({
				key: 'search:history',
				data: searchHistory
			});
		},
		// 清空历史数据
		removeHistory() {
			uni.showModal({
				title: this.$t('gg.msg19'),
				content: this.$t('gg.msg20'),
				success: res => {
					if (res.confirm) {
						this.historyList = [];
						uni.removeStorage({ key: 'search:history' });
					}
				}
			});
		},
		// 跳转列表
		keywordsToList(keywords) {
			this.setHistory(keywords);
			if(this.searchType === 'find'){
				this.$wanlshop.to(`/pages/apps/find/list?search=${keywords}`);
			}else{
				this.$wanlshop.to(`/pages/product/list?type=${this.searchType}&search=${keywords}`);
			}
		},
		categoryToList(category_id, category_name) {
			this.setHistory(category_name);
			this.$wanlshop.to(`/pages/product/list?type=${this.searchType}&data=${JSON.stringify({ category_id: category_id, category_name: category_name })}`);
		},
		onSearchInputChanged(event) {
			let value = event.detail.value;
			if (!value) {
				this.isHistory = true;
				return;
			} else {
				this.loadSearch(value);
			}
		},
		onSearchInputConfirmed(event) {
			let value = event.detail.value;
			if (!value) {
				this.isHistory = true;
				if (this.searchKeywords) {
					this.keywordsToList(this.searchKeywords);
				} else {
					uni.showModal({ title: this.$t('gg.msg19'), content: this.$t('gg.msg21') });
					return;
				}
			} else {
				this.isHistory = true;
				uni.hideKeyboard();
				this.historyList = [];
				this.historyList = uni.getStorageSync('search:history');
				this.keywordsToList(value); //跳转列表页面
			}
		}
	}
};
</script>

<style>
page {
	background: #ffffff;
}
.cu-custom .search-form{
	border: 3rpx solid #fe6600;
	background-color: #fff;
}
</style>
