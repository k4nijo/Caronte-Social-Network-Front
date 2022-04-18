<template>
  <v-container class="glue">
    <v-card
      max-width="15vw"
      height="100vh"
      min-width="180px"
      class="img elevation-1"
    >
      <div class="mb-40">
        <v-row>
          <v-col align="center">
            <img
              class="mt-4"
              src="caronte-logo.svg"
              height="120"
              weight="120"
              alt=""
            />
          </v-col>
        </v-row>
      </div>
      <div class="mt-10">
        <v-list>
          <v-row class="" v-for="(item, i) in items" :key="i">
            <v-col class="" align="end">
              <v-list-item
                :to="{ path: item.to }"
                router
                style="text-decoration: none; color: inherit"
              >
                <v-col align="end">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-col>
                <v-col cols="7" class="" align="start">
                  {{ item.title }}
                </v-col>
              </v-list-item>
            </v-col>
          </v-row>
        </v-list>
        <v-row class="mt-4">
          <v-col align="center">
            <v-btn small icon @click="logout"
              ><v-icon>mdi-logout</v-icon>LOGOUT
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="mt-4">
          <v-col class="text-center">
            &copy; Caronte {{ new Date().getFullYear() }}
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'LeftNavBar',
  data() {
    return {
      items: [
        {
          icon: 'mdi-home-outline',
          title: 'HOME',
          to: '/home',
        },
        {
          icon: 'mdi-magnify',
          title: 'EXPLORE',
          to: '/explore',
        },
        {
          icon: 'mdi-wallet-travel',
          title: 'PORTFOLIO',
          to: '/portfolio',
        },
        {
          icon: 'mdi-scale-balance',
          title: 'MARKET',
          to: '/market',
        },
        {
          icon: 'mdi-robot-outline',
          title: 'PROFILE',
          to: '/profile',
        },
        {
          icon: 'mdi-account-multiple-outline',
          title: 'CHAT',
          to: '/chat',
        },
      ],
    }
  },
  methods: {
    async logout() {
      await this.$axios.put(`/api/user/profile`, {
        online: false,
      })
      await this.$auth.logout()
    },
  },
}
</script>

<style lang="scss" scoped>
.glue {
  position: fixed;
  height: 100vh;
}
.c1 {
  background-color: red;
}
.c2 {
  background-color: green;
}
.c3 {
  background-color: yellow;
}
.img {
  background-image: url(static/circuit5.svg);
  background-size: 680px 680px;
  background-position-x: center;
  background-position-y: 125%;
}
</style>
