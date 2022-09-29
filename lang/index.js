import Vue from 'vue'
import VueI18n from 'vue-i18n'
import customZH from './zh.js' // 中文包
import customEn from './en.js' // 英文包

Vue.use(VueI18n)// 完成全局注册

export default new VueI18n ({
	locale: uni.getStorageSync('language') || 'en',
	messages: {
		zh: {
			...customZH
		},
		en: {
			...customEn
		}
	}
})