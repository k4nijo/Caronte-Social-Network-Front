<template>
  <v-card>
    <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="email" label="email"></v-text-field>
        <v-text-field v-model="password" label="password"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      let data = {
        email: this.email,
        password: this.password,
      }
      await this.$store.dispatch('login', data)
    },
  },
}
</script>

<style lang="scss" scoped></style>
