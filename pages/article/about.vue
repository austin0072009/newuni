<template>
	<view class="notice_page">
		<!-- <rich-text :nodes="strings"> -->
			<div style="position: relative;">
				<p><img src="../../static/images/about/01.jpg"></img></p>
				<p><img src="../../static/images/about/02.jpg"></img></p>
				<p><img src="../../static/images/about/03.jpg"></img></p>
				<p><img src="../../static/images/about/04.jpg"></img></p>
				<p><img src="../../static/images/about/05.jpg"></img></p>
			</div>
		<!-- </rich-text> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			dataList: [],
		};
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title:this.$t('index.about')
		});
		uni.setNavigationBarColor({
		    frontColor: '#ffffff',
		    backgroundColor: 'rgb(250, 67, 106)',
		    animation: {
		        duration: 400,
		        timingFunc: 'easeIn'
		    }
		})
	}
};
</script>
<style>
	.notice_page {
		width: 100%;
		padding: 9px;
		background-color: #fdfdfd;
	}
	.notice_page img {
		max-width: 100%;
	}
</style>
