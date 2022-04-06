export const state = () => ({
  category: 'general',
})

export const mutations = {}

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
