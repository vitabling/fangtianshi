const state = {
    categoryList:[] || state.categoryList,
}
const getters = {

}
const mutations = {
    addcategoryList(state,payload){
        debugger
        state.categoryList = payload
    }
}
const actions = {
    aysncaddcategoryList({state,commit,rootState},payload){
        setTimeout(() => {
            state.categoryList = payload
            console.log('categoryList',payload)
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
