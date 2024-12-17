import * as types from '@/store/mutation-types'

const state = {
    tokn     : '',
    userId   : '',  // 아이디ID
    userNm   : '',  // 아이디명
    roleCd   : '',  // 역할코드
}

const getters = {
    tokn     : state => state.tokn    ,
    userId   : state => state.userId  ,  // 아이디ID
    userNm   : state => state.userNm  ,  // 아이디명
    roleCd   : state => state.roleCd  ,  // 역할코드
}

const mutations = {
    [types.TOKN     ](state, value) {	state.tokn     = value;    },
    [types.USER_ID  ](state, value) {	state.userId   = value;    },
    [types.USER_NM  ](state, value) {	state.userNm   = value;    },
    [types.ROLE_CD  ](state, value) {	state.roleCd   = value;    },
}

export default {
    state,
    getters,
    mutations
}