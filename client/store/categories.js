export const state = () => ({
  totalCategories:0,
  categories:[],
})

export const getters = {
  allCategories:(state) => {
    return state.categories
  },
  totalCategories:(state) => {
    return state.totalCategories
  },
}

export const mutations = {
  SET_CATEGORIES(state, payload){

    if (payload.length > 0 ) {
      state.categories = payload;
    }
  },

  SET_TOTAL(state, payload){
    state.totalCategories = payload
  },
}

export const actions = {
  categories({commit}, payload){
    commit('SET_CATEGORIES', payload)
  },

  totalCategories({ commit}, payload){
    commit('SET_TOTAL', payload)
  },
}
