import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
    state: {
        user: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        logout(state) {
            state.user = null;
        },
    },
    actions: {
        loginUser({ commit }, user) {
            commit('setUser', user);
        },
        logoutUser({ commit }) {
            commit('logout');
        },
    },
    plugins: [createPersistedState()],
});

export default store;
