export const state = () => ({
  category: 'general',
  snackbar: false,
})

export const mutations = {
  toggleSnackbar(state) {
    state.snackbar = !state.snackbar
  },
}

export const actions = {
  async login(state, { email, password }) {
    let { data } = await this.$auth.loginWith('local', {
      data: {
        email,
        password,
      },
    })
    return data
  },
}
