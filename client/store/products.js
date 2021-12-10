export const state = () => ({
  totalProducts:0,
  products:[],
})

export const getters = {
  allProducts:(state) => {
    return state.products
  },
}

export const mutations = {
  SET_PRODUCTS(state, payload){

    if (payload.length > 0 ) {
      state.products = payload;
    }
  },

  SET_TOTAL(state, payload){
    state.totalProducts = payload
  },
}

export const actions = {
  products({commit}, payload){
    commit('SET_PRODUCTS', payload)
  },

  totalProducts({ commit}, payload){
    commit('SET_TOTAL', payload)
  },
}
