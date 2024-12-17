import mitt from 'mitt'

const state = {
    emitter: mitt()
}

const getters = {
    emitter: state => state.emitter
}

export default {
    state,
    getters,
}