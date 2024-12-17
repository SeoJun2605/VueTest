import * as types from '@/store/mutation-types'

const state = {
    confirmDialog: false,
    confirmTitle: '',
    confirmContent: '',
    confirmYesText: '',
    confirmNoText: '',
    confirmYesVisible: true,
    confirmNoVisible: true,
    confirmYesCallback: null,
    confirmNoCallback: null
}

const getters = {
    confirmDialog: state => state.confirmDialog,
    confirmTitle: state => state.confirmTitle,
    confirmContent: state => state.confirmContent,
    confirmYesText: state => state.confirmYesText,
    confirmNoText: state => state.confirmNoText,
    confirmYesVisible: state => state.confirmYesVisible,
    confirmNoVisible: state => state.confirmNoVisible,
    confirmYesCallback: state => state.confirmYesCallback,
    confirmNoCallback: state => state.confirmNoCallback
}

const mutations = {
    [types.CONFIRM_DIALOG](state, value) {
        state.confirmDialog = value;        
    },
    [types.CONFIRM_TITLE](state, value) {
        state.confirmTitle = value;
    },
    [types.CONFIRM_CONTENT](state, value) {
        state.confirmContent = value;
    },
    [types.CONFIRM_YES_TEXT](state, value) {
        state.confirmYesText = value;
    },
    [types.CONFIRM_NO_TEXT](state, value) {
        state.confirmNoText = value;
    },
    [types.CONFIRM_YES_VISIBLE](state, value) {
        state.confirmYesVisible = value;
    },
    [types.CONFIRM_NO_VISIBLE](state, value) {
        state.confirmNoVisible = value;
    },
    [types.CONFIRM_YES_CALLBACK](state, value) {
        state.confirmYesCallback = value;
    },
    [types.CONFIRM_NO_CALLBACK](state, value) {
        state.confirmNoCallback = value;
    }
}

const actions = {
    
}

export default {
    state,
    getters,
    mutations,
    actions
}
