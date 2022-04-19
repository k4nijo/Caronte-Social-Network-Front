export const state = () => ({
  posts: [],
  filteredPosts: [],
  onePost: {},
  filter: {
    search: '',
    category: '',
    order: 'publishDate',
  },
})

export const getters = {
  getPosts(state) {
    return state.posts
  },
  getFilteredPosts(state) {
    return state.filteredPosts
  },
}

export const actions = {
  async fetchAllPosts({ commit }) {
    const posts = await this.$axios.get('/api/post')
    await commit('setPosts', posts.data)
    await commit('setFilteredPosts', posts.data)
  },
  async filterOrder({ commit }, order) {
    await commit('setOrder', order)
    await commit('orderPosts')
  },
  async filterCategory({ commit, dispatch }, category) {
    await commit('setFilterCategory', category)
    dispatch('filterPosts')
  },
  async filterSearch({ commit, dispatch }, search) {
    await commit('setFilterSearch', search)
    dispatch('filterPosts')
  },
  async filterPosts({ commit }) {
    await commit('filterPosts')
    await commit('orderPosts')
  },
}

import * as Filters from '~/helpers/filters'

export const mutations = {
  setPosts(state, posts) {
    state.posts = [...posts]
  },
  setFilteredPosts(state, posts) {
    state.filteredPosts = [...posts]
  },
  setFilterCategory(state, category) {
    state.filter.category = category
  },
  setFilterSearch(state, search) {
    state.filter.search = search
  },
  setOrder(state, order) {
    state.filter.order = order
  },
  filterPosts(state) {
    const posts = [...state.posts]
    state.filteredPosts = posts
    state.filteredPosts = Filters.filterPosts(state.filter, posts)
  },
  orderPosts(state) {
    const posts = [...state.filteredPosts]
    state.filteredPosts = Filters.orderPosts(state.filter.order, posts).sort(
      (a, b) => b.publishDate - a.publishDate
    )
  },
}
