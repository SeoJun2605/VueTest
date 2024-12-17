import * as types from '@/store/mutation-types'

const state = {
    showLoading: false
}

const getters = {
    showLoading: state => state.showLoading
    // showLoading: function(state) {
    //     return state.showLoading;
    // }
}

const mutations = {
    [types.SHOW_LOADING](state, value) {
    // showLoading(state, value) {
        state.showLoading = value
    }
}

export default {
    state,
    getters,
    mutations
}
