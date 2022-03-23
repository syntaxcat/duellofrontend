import { createStore } from 'vuex'
import { boardStore } from './modules/boardStore.js'

// create a store instance
const store = createStore({
    strict: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        boardStore
    },
})

export default store
