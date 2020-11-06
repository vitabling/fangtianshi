import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import common from "./modules/common";//公共数据
import user from "./modules/user";//用户信息
import moduleB from "./modules/moduleB";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    common,
    user,
    moduleB,
  }
});
