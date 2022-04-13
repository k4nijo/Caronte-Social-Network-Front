<template>
  <v-container class="glue">
    <v-card flat max-width="15vw" height="100vh" min-width="180px">
      <v-row class="" v-for="(item, i) in items" :key="i">
        <v-col cols="5" class="" align="end">
          <v-icon>{{ item.icon }}</v-icon>
        </v-col>
        <v-col cols="7" class="">
          <router-link
            :to="{ path: item.to }"
            router
            style="text-decoration: none; color: inherit"
          >
            {{ item.title }}
          </router-link>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          &copy; Caronte {{ new Date().getFullYear() }}
        </v-col>
      </v-row>
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
</style>
