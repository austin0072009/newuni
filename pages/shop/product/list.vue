<template>
	<view class="wanl-list">
		
		<!-- 导航条 -->
		<view class="cu-custom" :style="{height: $wanlshop.wanlsys().height + 'px' }">
			<view class="cu-bar bg-bgcolor fixed" :style="{ height: $wanlshop.wanlsys().height + 'px', paddingTop: $wanlshop.wanlsys().top + 'px'}">
				<view class="action" @tap="$wanlshop.back(1)">
					<text class="wlIcon-fanhui1"></text>
				</view>
				<view class="search-form round">
					<text class="wlIcon-sousuo1 text-bold"></text> 
					<input @confirm="confirm" :adjust-position="false" type="text" :placeholder="category" confirm-type="search"></input>
				</view>
				<view class="action" @tap="editListstyle()">
					<text class="wlIcon-listing-jf" v-if="liststyle == 'col-2-10'"></text>
					<text class="wlIcon-liebiao" v-else></text>
				</view>
			</view>
		</view>
		
		<view class="shop-information">
			
			<view class="shop-avatar">
				
				<image class="shop-image" :src="$wanlshop.oss(shopData.avatar, 400, 0)"></image>
				<view class="shop-detail">
					<view class="dianpu">
						
						{{shopData.shopname}}
						
						
					</view>
					<view class="baobei">
						
						
						
						<view class="recommend">
							Store recommend
						</view>
						<text class="tt">
							<span>
								<text>
									page view(live) {{ this.pageview}}
								</text>
							</span>
						</text>
						
						
					</view>
					
					
				</view>
			</view>
			
			
			<!-- <view class="shop-follow">
				
				<view class="follow">
					<image class="aixin" src="../../../static/images/aixin.png"></image>
					<text>
						Follow
					</text>
					<button v-if="shopData.isFollow === 0" class="cu-btn radius-bock text-sm bg-white"
						@click.stop="handleFollow">
						<text class="wlIcon-31xuanze text-bold margin-right-xs"></text> {{$t('index.follow')}}
					</button>
					<button v-else class="cu-btn radius-bock text-sm bg-white" @click.stop="handleFollow">
						<text class="wlIcon-31guanbi text-bold margin-right-xs"></text> {{$t('good.msg5')}}
					</button>
				</view>
				
			</view> -->
			
			
			
		</view>
		
		<view class="head" :class="{ headtop: scrollStype }">
			<view class="cue">
				<view class="bar">
					<view class="item" :class="{ current: filterIndex === 0 }" @tap="tabClick(0)">{{$t('product.msg1')}}</view>
					<view class="item" :class="{ current: filterIndex === 1 }" @tap="tabClick(1)">{{$t('product.msg2')}}</view>
					<view class="item" :class="{ current: filterIndex === 2 }" @tap="tabClick(2)">{{$t('product.msg3')}}</view>
					<view class="item" :class="{ current: filterIndex === 3 }" @tap="tabClick(3)">
						<text>{{$t('product.msg4')}}</text>
						<view class="box">
							<text :class="{ active: priceOrder === 1 && filterIndex === 3 }" class="wlIcon-sheng"></text>
							<text :class="{ active: priceOrder === 2 && filterIndex === 3 }" class="wlIcon-jiang"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 主体 -->
		<wanl-empty v-if="goodsData.length === 0 && status !== 'loading'" :text="empty"/>
		<wanl-product v-if="goodsData.length > 0" :dataList="goodsData" :dataStyle="liststyle"/>
		<uni-load-more :status="status" :content-text="contentText" />
		<view class="edgeInsetBottom"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageview:0,
				shop_id: 0,
				empty: '',
				WanlScroll: 0, //记录页面滚动
				scrollStype: false, //滚动状态
				filterIndex: 0, //
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				liststyle: 'col-2-10', //列表样式
				goodsData: [], //商品列表数据
				category: '',
				params: {
					search: '',
					sort: 'weigh',
					order: 'asc',
					page: 1,
					filter: {},
					op: {}
				},
				reload: false, //判断是否上拉
				last_page: 0,
				status: 'loading',
				contentText: {
					contentdown: '',
					contentrefresh: this.$t('cart.being_loaded'),
					contentnomore: ''
				},
				shopData: {
					id: 0,
					avatar: '',
					shopname: '',
					state: 0,
					islive: 0,
					isself: 0,
					categoryStyle: 1,
					find_user:{
						user_no: '',
						fans: 0
					}
				},
					statistics: {}
			};
		},
		onLoad(option) {
			this.pageview = (Math.floor(Math.random() * (1000 - 0 + 1)) + 0) + (Math.floor(Math.random() * (100 - 0 + 1)) + 0);
			console.log("shopID is " + option.shop_id);
			this.shop_id = option.shop_id;
			this.loadData();
			if(option.category_id){
				this.params.filter.shop_category_id = option.category_id;
				this.params.op.shop_category_id = 'FIND_IN_SET'; //1.0.2升级
				if(option.category_name){
					this.category = this.$t('shop.msg22') + ':' + option.category_name;
				}else{
					this.category = this.$t('shop.msg23');
				}
				this.loadData();
				if (this.goodsData.length == 0) {
					this.empty = this.$t('shop.msg24')+'“'+this.category+'”'+this.$t('shop.msg25');
				}
			}else{
				this.params.filter.shop_id = option.shop_id;
				this.params.op.shop_id = 'in';
				this.category = this.$t('shop.msg23');
				this.status = 'more';
				this.loadData();
				if (this.goodsData.length == 0) {
					this.empty = this.$t('shop.msg27');
				}
			}
		},
		// 监听上拉
		onPullDownRefresh() {
			this.params.page  = 1;
			this.reload = true;
			this.loadData();
		},
		// 下拉刷新
		onReachBottom() {
			if (this.params.page >= this.last_page) {
				this.status = 'noMore';
			} else {
				this.reload = false;
				this.contentText.contentdown = '上拉显示更多';
				this.params.page = this.params.page + 1; //页码+1
				this.status = 'loading';
				this.loadData();
			}
		},
		// 监听滚动
		onPageScroll(object) {
			if (object.scrollTop > this.WanlScroll) {
				this.scrollStype = false;
			} else {
				this.scrollStype = true;
			}
			if (object.scrollTop < 0) {
				this.scrollStype = false;
			}
			this.WanlScroll = object.scrollTop;
		},
		methods: {
			async handleFollow(index, shop) {
				if (this.$store.state.user.isLogin) {
					let data = this.navList[this.currentId].dataList[index];
					this.$api.post({
						url: '/wanlshop/find/user/setFindUser',
						data: {
							id: data.user_no,
							type: 'follow'
						},
						success: res => {
							if(shop){
								let concern = this.$store.state.statistics.dynamic.concern;
								if(res.data === 0){
									concern -= 1;
								}else{
									concern += 1;
								}
								this.$store.commit('statistics/dynamic', {
									concern: concern,
								});
							}
							data.isFollow = res.data;
						}
					});
				} else {
					this.$wanlshop.to('/pages/user/auth/auth')
				}
			},
			//异步加载商品列表
			async loadData() {
				this.$api.get({
					url: '/wanlshop/product/lists',
					data: this.params,
					success: res => {
						uni.stopPullDownRefresh(); // 后来统一补充，尚不知道是否有效在此处
						this.status = res.total == 0 ? 'noMore':'more';
						this.goodsData = this.reload ? res.data : this.goodsData.concat(res.data); //数据 追加
						this.params.page = res.current_page; //当前页码
						this.last_page = res.last_page; //总页码
					}
				});
				
				this.$api.get({
					url: '/wanlshop/shop/statistics',
					data: {},
					success: res => {
						this.statistics = res;
					}
				});
				this.$api.get({
					url: '/wanlshop/shop/getShopInfo',
					data: {
						id: this.shop_id
					},
					success: res => {
						
						this.shopData = res;
						console.log("Result is : " ,res);
					}
				});
				
			},
			//筛选点击
			tabClick(index) {
				if (this.filterIndex === index && index !== 3) {
					return;
				}
				this.filterIndex = index;
				if (index === 3) {
					this.priceOrder = this.priceOrder === 1 ? 2 : 1;
				} else {
					this.priceOrder = 0;
				}
	
				// 排序方式
				if (index === 0) {
					this.params.sort = 'weigh';
					this.params.order = 'asc';
				}
				if (index === 1) {
					this.params.sort = 'sales';
					this.params.order = 'asc';
				}
				if (index === 2) {
					this.params.sort = 'createtime';
					this.params.order = 'asc';
				}
				if (index === 3 && this.priceOrder === 1) {
					this.params.sort = 'price';
					this.params.order = 'asc';
				}
				if (index === 3 && this.priceOrder === 2) {
					this.params.sort = 'price';
					this.params.order = 'desc';
				}
				this.status = 'loading';
				this.params.page = 1;
				this.reload = true;
				this.loadData();
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				});
			},
			editListstyle() {
				if (this.liststyle == 'col-1-10') {
					this.liststyle = 'col-2-10';
				} else {
					this.liststyle = 'col-1-10';
				}
			},
			confirm(event){
				this.category = event.detail.value;
				this.params.search = event.detail.value;
				this.params.filter = { shop_id: this.shop_id };
				this.params.op = { shop_id: '='};
				this.reload = true;
				this.loadData();
				
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				});
			}
		}
	};
</script>

<style>
	
	
	.follow{
		    width: 65px;
		    height: 25px;
		    display: flex;
		    align-items: center;
		    justify-content: center;
		    background: red;
		    color: #fff;
		    border-radius: 25px;
	}
	.cu-bar .search-form{
		background-color: #ebebeb;
	}
	
	
	.shop-information{
		
		    display: flex;
		    align-items: center;
		    justify-content: space-between;
		    padding: 15px 12px;
	}
	
	.shop-avatar{
		    z-index: 99;
		    display: flex;
		    align-items: center;
			
			
			
	}
	
	.shop-image{
				    width: 40px;
				    height: 40px;
				    border-radius: 7px;
			}
	.shop-follow{
	     font-size: 15px;
	     z-index: 99;
	}
	
	
	.shop-detail{
		    margin-left: 7px;
	}
	
	
	.dianpu{
		    display: flex;
		    align-items: center;
		    font-weight: 700;
		    color: #000000;
		    font-size: 17px;
	}
	
	
	.baobei{
		      height: 20%;
		      display: flex;
		      align-items: center;
		      margin-top: 2px;
	}
	
	.recommend{
		    background: #9000ff;
		    font-size: 10px;
		    color: #fff;
		    padding: 0 2px;
		    border-radius: 2px;
		    margin-right: 5px;
	}
	
	.tt{
		    color: rgb(255, 255, 255);
		    margin-right: 10px;
			background: #000000;
		
	}
	
	.aixin{
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    display: block;
    position: relative;
    top: 0;
    left: 0;
    opacity: 1;
    width: 40px;
    height: 20px;
	}
</style>
