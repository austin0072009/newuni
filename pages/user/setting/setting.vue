<template>
	<view>
		<view class="edgeInsetTop"></view>
		<view class="cu-list menu sm-border">
			<view class="cu-item" style="min-height:200rpx;" @tap="$wanlshop.auth('user')">
				<view class="cu-avatar round lg margin-right"  :style="{backgroundImage: 'url('+ $wanlshop.oss(user.avatar, 52, 52, 2, 'avatar') +')'}"></view> 
				<view class="content" style="line-height: 1.5em;"> 
					<view class="text-lg">
						{{user.nickname || $t('setting.not_login')}}
					</view>
					<view class="wanl-grey text-df">
						{{$t('setting.username')}}：{{user.username || $t('setting.not_login')}}
					</view>
				</view>
				<view class="action">
					<text class="wlIcon-jifen"></text>
					<text class="margin-lr-xs">{{$t('address.edit')}}</text>
					<text class="wlIcon-fanhui2"></text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="$wanlshop.auth('../address/address')">
				<view class="content">
					<text>{{$t('setting.btn1')}}</text>
				</view>
			</view>
		</view>
		
		<view class="cu-list menu sm-border margin-top">
			<view class="cu-item arrow" @tap="$wanlshop.auth('security')">
				<view class="content">
					<text>{{$t('setting.btn2')}}</text>
				</view>
			</view>
		</view>
		
		<view class="cu-list menu sm-border margin-top">
			<view class="cu-item arrow" @tap="$wanlshop.to('notice')">
				<view class="content">
					<text>{{$t('setting.btn3')}}</text>
				</view>
			</view>
			<!-- <view class="cu-item arrow" @tap="$wanlshop.to('privacy')">
				<view class="content">
					<text>隐私</text>
				</view>
			</view> -->
			<view class="cu-item arrow" @tap="$wanlshop.to('currency')">
				<view class="content">
					<text>{{$t('setting.btn4')}}</text>
				</view>
			</view>
		</view>
		
		<view class="cu-list menu sm-border margin-top">
			<view class="cu-item arrow" @tap="clearCache()">
				<view class="content">
					<text>{{$t('setting.btn5')}}</text>
				</view>
				<view class="action">
					<view class="cu-tag round">
						{{fileSizeString}}
					</view>
				</view>
			</view>
			<view class="cu-item arrow" @tap="$wanlshop.to('about','pop-in',200)">
				<view class="content">
					<text>{{$t('setting.btn6')}}</text>
				</view>
				<view class="action">
					<text class="wanl-gray">{{common.version}}</text>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				fileSizeString: '0 B',
			}
		},
		computed: {
			...mapState(['user','common'])
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('setting.title')
			})
			uni.setNavigationBarColor({
			    frontColor: '#ffffff',
			    backgroundColor: 'rgb(250, 67, 106)',
			    animation: {
			        duration: 400,
			        timingFunc: 'easeIn'
			    }
			})
			// #ifdef APP-PLUS
			this.formatSize();
			// #endif
		},
		methods: {
			formatSize() {  
                plus.cache.calculate((size)=> {  
                    let sizeCache = parseInt(size);  
                    if (sizeCache == 0) {  
                        this.fileSizeString = "0 B";  
                    } else if (sizeCache < 1024) {  
                        this.fileSizeString = sizeCache + " B";  
                    } else if (sizeCache < 1048576) {  
                        this.fileSizeString = (sizeCache / 1024).toFixed(2) + " KB";  
                    } else if (sizeCache < 1073741824) {  
                        this.fileSizeString = (sizeCache / 1048576).toFixed(2) + " MB";  
                    } else {  
                        this.fileSizeString = (sizeCache / 1073741824).toFixed(2) + " GB";  
                    }  
                }); 
            },
			clearCache() {  
				// #ifndef APP-PLUS
				this.$wanlshop.msg(this.$t('setting.msg4'));
				// #endif
				// #ifdef APP-PLUS
				uni.showModal({
				    title: this.$t('setting.msg1'),
				    content: this.$t('setting.msg2'),
				    success: (res)=> {
				        if (res.confirm) {
				           if (plus.os.name == 'Android') {
				               let main = plus.android.runtimeMainActivity();  
				               let sdRoot = main.getCacheDir();  
				               let files = plus.android.invoke(sdRoot, "listFiles");  
				               let len = files.length;  
				               for (let i = 0; i < len; i++) {  
				                   let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
				                   plus.io.resolveLocalFileSystemURL(filePath, (entry)=> {  
				                       if (entry.isDirectory) {  
				                           entry.removeRecursively((entry)=> { //递归删除其下的所有文件及子目录  
				           					this.$wanlshop.msg(this.$t('setting.msg3'));
				                               this.formatSize(); // 重新计算缓存  
				                           }, (e)=> {  
				                               console.log(e.message)  
				                           });  
				                       } else {  
				                           entry.remove();  
				                       }  
				                   }, (e)=> {  
				                       console.log('文件路径读取失败')  
				                   });  
				               }  
				           } else { // ios暂时未找到清理缓存的方法，以下是官方提供的方法，但是无效，会报错  
				               plus.cache.clear(()=> {  
				                   this.$wanlshop.msg(this.$t('setting.msg3'));
				                   this.formatSize();  
				               });  
				           }  
				        }
				    }
				});
                
				// #endif
            }
		}
	}
</script>

<style>

</style>
