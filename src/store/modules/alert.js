import * as types from '@/store/mutation-types'

const state = {
    alertDialog: false,
    alertTitle: '',
    alertContent: ''
}

const getters = {
    alertDialog: state => state.alertDialog,
    alertTitle: state => state.alertTitle,
    alertContent: state => state.alertContent
}

const mutations = {
    [types.ALERT_DIALOG](state, value) {
        state.alertDialog = value;
    },
    [types.ALERT_TITLE](state, value) {
        state.alertTitle = value;
    },
    [types.ALERT_CONTENT](state, value) {
        state.alertContent = value;
    },
}

export default {
    state,
    getters,
    mutations
}
