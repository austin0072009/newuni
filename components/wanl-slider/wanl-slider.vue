<template>
	<div class="slider flex" id="slider" :style="{ width: `${width}px` }" ref="slider">
		<div class="slider-left flex" :style="{ width: `${leftWidth}px` }" @touchend.stop="sliderTouch">
			<div class="left" :style="{backgroundColor:backgroundColor}"></div>
		</div>
		<div class="slider-right flex" @touchend.stop="sliderTouch" :style="{ width: `${currentWidth-leftWidth}px` }">
			<div class="right"></div>
		</div>
		<div class="block flex" :style="{backgroundColor:touch?blockOuterColor:'rgba(0,0,0,0)', left: `${leftWidth}px`}"
			@click.stop="">
			<div class="block-inner flex" :style="{backgroundColor:blockBackgroundColor}"  @touchmove.stop.prevent="blockTouchMove" @touchend="blockTouchEnd" @touchstart="blockTouchStart">
				<div class="block-inner-inner" :style="{backgroundColor:blockColor}">
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			min:{
				type:Number,
				default:0
			},
			max:{
				type:Number,
				default:0
			},
			value:{
				type:Number,
				default:0
			},
			width:{
				type:Number,
				default:0
			},
			ratio:{
				type:Number,
				default:1
			},
			direction:{
				type:String,
				default:'screenX'
			},
			backgroundColor:{ //滑块右侧背景条的颜色
				type:String,
				default:'#e9e9e9'
			},
			blockColor:{ //滑块颜色
				type:String,
				default:'#ffffff'
			},
			screenLeft:{ //slider距离左边距离
				type:Number,
				default:0
			},
			iosDirection:{
				type:Number,
				default:1
			}
		},
		data(){
			return{
				oldToucesX:0,
				leftWidth:0,
				oldLeftWidth:0,
				touch:false
			}
		},
		mounted() {
			
			
		},
		methods:{
			sliderTouch(e){
				console.log(e)
				let touches = e.changedTouches[0]
				this.leftWidth = (touches[this.direction]||touches['clientX'])*this.ratio-this.screenLeft
				this.leftWidth = this.leftWidth > this.currentWidth? this.currentWidth : this.leftWidth
				this.leftWidth = this.leftWidth < 0? 0 : this.leftWidth
				this.blockTouchEnd()
				
			},
			// 触摸开始
			blockTouchStart(e) {
				this.touch = true
				this.oldLeftWidth = this.leftWidth
				this.oldToucesX = e.changedTouches[0][this.direction]||e.changedTouches[0]['clientX'];
			},
			// 计算方向
			blockTouchMove(e) {
				let newToucesX
				
				newToucesX= e.changedTouches[0][this.direction]||e.changedTouches[0]['clientX'];
				
				this.leftWidth = this.iosDirection*(newToucesX - this.oldToucesX)*this.ratio+ this.oldLeftWidth
				this.leftWidth = this.leftWidth > this.currentWidth? this.currentWidth : this.leftWidth
				this.leftWidth = this.leftWidth < 0? 0 : this.leftWidth
				
			},
			// 结束触摸
			blockTouchEnd(e) {
				let current = this.leftWidth / this.currentWidth *this.max
				const event = {detail:{value:current}}
				this.$emit('change',event)
				this.touch = false
			},
			colorRgb(string,opacity){
				var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
				var sColor = string.toLowerCase();
				if(sColor && reg.test(sColor)){
				    if(sColor.length === 4){
				        var sColorNew = "#";
				        for(var i=1; i<4; i+=1){
				            sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));   
				        }
				        sColor = sColorNew;
				    }
				    //处理六位的颜色值
				    var sColorChange = [];
				    for(var i=1; i<7; i+=2){
				        sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));  
				    }
				    return "rgba(" + sColorChange.join(",") +`,${opacity}`+")";
				}else{
				    return sColor;  
				}
			}
		},
		computed:{
			blockOuterColor(){
				return this.colorRgb(this.blockColor,0.4)
			},
			blockBackgroundColor(){
				return this.colorRgb(this.blockColor,0.5)
			},
			currentWidth(){
				return this.width - 40
			}
		},
		watch:{
			value:{
				immediate:true,
				handler(newVal,oldVal){
					if(this.touch) return
					
					this.leftWidth = newVal/this.max * this.currentWidth
					this.leftWidth = this.leftWidth > this.currentWidth? this.currentWidth : this.leftWidth
				}
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.flex{
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		
	}
	.slider{
		position: relative;
		flex-direction: row;
		height: 40px;
		align-items: center;
		
		justify-content: center;
	}
	.slider-left{
		height: 40px;
		flex-direction: row;
		align-items: center;
	}
	.left{
		flex: 1;
		height: 3px;
	}
	.slider-right{
		height: 40px;
		flex-direction: row;
		align-items: center;
	}
	.right{
		height: 3px;
		background-color: rgba(0,0,0,0.3);
		flex: 1;
	}
	.block{
		position: absolute;
		height: 40px;
		width: 40px;
		border-radius: 20px;
		justify-content: center;
		align-items: center;
		z-index: 999999;
	}
	.block-inner{
		height: 20px;
		width: 20px;
		border-radius: 10px;
		justify-content: center;
		align-items: center;
	}
	.block-inner-inner{
		height: 10px;
		width: 10px;
		border-radius: 5px;
		
	}
</style>
