// import Vuex from 'vuex'
// import modules from '@/store/modules'

// export default new Vuex.Store({
//     modules: {
//         ...modules
//     }
// })

import { createStore } from 'vuex'
import modules from '@/store/modules'
// import createPersistedState from 'vuex-persistedstate'


const store = createStore({
    modules: {
        ...modules
    },
    // plugins: [createPersistedState({
    //    // 주목! : 여기에 쓴 모듈만 저장됩니다.
    //     paths: ["account"],
    // })]
});


export default store;

