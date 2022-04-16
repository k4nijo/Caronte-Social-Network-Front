export const state = () => ({
  users: [],
  filteredUsers: [],
  filter: {
    search: '',
  },
})

export const getters = {
  getUsers(state) {
    return state.users
  },
  getFilteredUsers(state) {
    return state.filteredUsers
  },
}

export const actions = {
  async fetchAllUsers({ commit }) {
    const users = await this.$axios.get('/api/users')
    await commit('setUsers', users.data)
    await commit('setFilteredUsers', users.data)
  },
  async filterSearch({ commit, dispatch }, search) {
    await commit('setFilterSearch', search)
    dispatch('filterUsers')
  },
  async filterUsers({ commit }) {
    await commit('filterUsers')
  },
}

import * as Filters from '~/helpers/filters'

export const mutations = {
  setUsers(state, users) {
    state.users = [...users]
  },
  setFilteredUsers(state, users) {
    state.filteredUsers = [...users]
  },
  setFilterSearch(state, search) {
    state.filter.search = search
  },
  filterUsers(state) {
    const users = [...state.users]
    state.filteredUsers = users
    state.filteredUsers = Filters.filterUsers(state.filter, users)
  },
}
