<template>
  <v-container>
    <v-row>
      <v-col align="center"
        ><img src="caronte-logo.svg" alt="" height="100" width="100"
      /></v-col>
    </v-row>
    <v-row class="" justify="center" align="center">
      <v-col>
        <v-card flat class="ma-0 pa-0 bgcard">
          <v-card-title class="justify-center">Login</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form class="mx-10">
              <v-text-field
                class="white--text"
                color="white"
                label="Email"
                v-model="email"
                prepend-icon="mdi-email-outline"
                clearable
              ></v-text-field>
              <v-text-field
                v-model="password"
                color="white"
                label="Password"
                :type="passVisible ? 'text' : 'Password'"
                prepend-icon="mdi-lock-outline"
                :append-icon="
                  passVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                "
                @click:append="passVisible = !passVisible"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-subtitle class="text-center"
            >Don't you have an account yet?
            <a href="" class="grey--text">Register now</a>
          </v-card-subtitle>
          <v-card-actions>
            <v-btn color="primary" class="mx-auto" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
.bgcard {
  background-image: url(static/bgcard.png);
  background-size: cover;
}
.c1 {
  width: 100%;
}
</style>
