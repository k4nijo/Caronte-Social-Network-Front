export const actions = {
  async login(state, {
    email, password
  }) {
    let {
      data
    } = await this.$auth.loginWith("local", {
      data: {
        email, password
      }
    })
    console.log(data)
    return data
  }
}