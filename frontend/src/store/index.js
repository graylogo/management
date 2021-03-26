import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const types = {
  SET_AUTHENTICATED: 'SET_AUTHENTICATED',
  SET_USER: 'SET_USER'
};

const state = {
  isAuthenticated: false,
  user: {}
};

// mutations 中修改state ，使用commit提交
// 通过this。$store.commit('add',payload)来触发mutation
const mutations = {
  // 前面中括号为了在vuex插件中查看
  [types.SET_AUTHENTICATED](state, isAuthenticated) {
    if (isAuthenticated) state.isAuthenticated = isAuthenticated;
    else state.isAuthenticated = false;
  },
  [types.SET_USER](state, user) {
    if (user) state.user = user;
    else state.user = {};
  }
};

// 处理异步操作
// 在action中，只能通过commit提交mutations来修改state
// 通过this.$store.dispatch('addAsync',payload)来触发action  payload使用第二个参数来接收
const actions = {
  setAuthenticated: ({ commit }, isAuthenticated) => {
    commit(types.SET_AUTHENTICATED, isAuthenticated);
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user);
  }
};

// 对state中的数据加工处理，形成新的数据，类似computed
const getters = {
  isAuthenticated: (state) => state.isAuthenticated,
  user: (state) => state.user
};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
