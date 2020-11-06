const state = {
    token: '',
    // token: '' || state.token,
}
const getters = {

}
const mutations = {
    addToken(state,payload){
        debugger
        state.token = payload
    }
}
const actions = {
    aysncAddToken({state,commit,rootState},payload){
        setTimeout(() => {
            state.token = payload
            console.log('token',payload)
        }, 1000);
    }
}
export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions,
};
