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
      state.categories = payload
      sortCategories(state, payload);
    }
  },

  SET_CATEGORY(state, payload) {
    state.categories.push(payload)
    state.totalCategories++;
    sortCategories(state, state.categories);
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

  saveCategory({commit}, payload){
    commit('SET_CATEGORY', payload);
  },

  clear({commit}){
    commit('SET_TOTAL', 0)
    commit('SET_CATEGORIES', [])
  }
}

const sortCategories = (state, payload, sortKey = null) => {
  switch(sortKey) {
    case "acs_id":
      state.currentSortKey = 'acs_id'
      state.keyValues = payload.sort((a, b) => Number(a.pk) - Number(b.pk));
      break;
    default://desc ID
      state.currentSortKey = null
      state.keyValues = payload.sort((a, b) => Number(b.pk) - Number(a.pk));
  }
}
