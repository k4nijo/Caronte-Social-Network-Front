<template>
  <v-card flat height="100%" class="backCard ma-0 pa-0">
    <v-card-title class="justify-center">Login</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Email"
          v-model="email"
          prepend-icon="mdi-email-outline"
          clearable
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          :type="passVisible ? 'text' : 'Password'"
          prepend-icon="mdi-lock-outline"
          :append-icon="passVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
          @click:append="passVisible = !passVisible"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-subtitle class="text-center"
      >Don't you have an account yet? <a href="">Register now</a>
    </v-card-subtitle>
    <v-card-actions>
      <v-btn color="primary" class="mx-auto" @click="login">Login</v-btn>
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
      passVisible: false,
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

<style lang="scss" scoped>
.backCard {
  background-image: url(static/cardBack.png);
  background-size: cover;
}
</style>
