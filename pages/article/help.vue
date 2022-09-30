<template>
	<view class="notice_page">
		<!-- <rich-text :nodes="strings"> -->
			<div style="position: relative;">
				<p><img src="../../static/images/help/1.jpg"></img></p>
				<p><img src="../../static/images/help/02.jpg"></img></p>
				<p><img src="../../static/images/help/03.jpg"></img></p>
				<p><img src="../../static/images/help/04.jpg"></img></p>
				<p><img src="../../static/images/help/05.jpg"></img></p>
				<p><img src="../../static/images/help/06.jpg"></img></p>
				<p><img src="../../static/images/help/07.jpg"></img></p>
				<p><img src="../../static/images/help/08.jpg"></img></p>
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
			title:this.$t('index.help')
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
