import { createApp } from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import mitt from 'mitt'
import { createPinia } from 'pinia'

import $ from 'jquery'

// jqGrid 관련 임포트
import 'jqGrid/js/i18n/grid.locale-kr.js'

// 그리드 핸들링 관련 모듈 2개 필수 (드래그 및 에디트 등...)
// import 'jquery-ui/dist/jquery-ui.js'
import 'jqGrid/js/jquery.jqGrid.min.js'
import { CmonUtil } from '@/utils/CmonUtil.js'
import { ValdUtil } from '@/utils/ValdUtil.js'
import { DateUtil } from '@/utils/DateUtil.js'

const app = createApp(App)
const pinia = createPinia()
const emitter = mitt();

window.$ = $;
window.jQuery = $;
window.emitter = emitter;


app.config.globalProperties.$store = store;
app.config.globalProperties.emitter = emitter;
app.config.globalProperties.CmonUtil = CmonUtil;
app.config.globalProperties.ValdUtil = ValdUtil;
app.config.globalProperties.DateUtil = DateUtil;

app.use(store);
app.use(pinia)
app.use(router).mount('#app')
