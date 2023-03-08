import Vue from 'vue'
import VueI18n from 'vue-i18n'
import customZH from './zh.js' // 中文包
import customEn from './en.js' // 英文包
import zht from './zht.js' // 英文包
import my from './my.js' // 英文包
import phi from './phi.js' // 英文包
import th from './th.js' // 英文包
import vt from './vt.js' // 英文包
import jp from './jp.js'


Vue.use(VueI18n)// 完成全局注册

export default new VueI18n ({
	locale: uni.getStorageSync('language') || 'en',
	messages: {
		zh: {
			...customZH
		},
		en: {
			...customEn
		},
		zht: {
			...zht
		},
		my: {
			...my
		},
		phi: {
			...phi
		},
		th: {
			...th
		},
		vt: {
			...vt
		},
		jp: {
			...jp
		}
	}
})