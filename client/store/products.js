export const state = () => ({
  totalProducts:0,
  products:[],
})

export const getters = {
  allProducts:(state) => {
    return state.products
  },
  totalProducts:(state) => {
    return state.totalProducts
  },
}

export const mutations = {
  SET_PRODUCTS(state, payload){

    state.products = payload;

    if (payload.length > 0 ) {
      sortProducts(state, state.products)
    }
  },

  SET_PRODUCT(state, payload) {
    state.products.push(payload)
    state.totalProducts++;

    sortProducts(state, state.products)
  },

  SET_TOTAL(state, payload){
    state.totalProducts = payload
  },

  DELETE_PRODUCT(state, pk){
    let productIndex = state.products.findIndex(product => product.pk === pk)
    state.products.splice(productIndex, 1)

    if(state.totalProducts > 0){
      state.totalProducts--;
    }
  }

}

export const actions = {
  products({commit}, payload){
    commit('SET_PRODUCTS', payload)
  },

  totalProducts({ commit}, payload){
    commit('SET_TOTAL', payload)
  },

  saveProduct({commit}, payload){
    commit('SET_PRODUCT', payload);
  },

  deleteProduct({commit}, pk){
    commit('DELETE_PRODUCT', pk);
  },
}

const sortProducts = (state, payload, sortKey = null) => {
  switch(sortKey) {
    case "acs_id":
      state.currentSortKey = 'acs_id'
      state.products = payload.sort((a, b) => Number(a.pk) - Number(b.pk));
      break;
    default://desc ID
      state.currentSortKey = null
      state.products = payload.sort((a, b) => Number(b.pk) - Number(a.pk));
  }
}
