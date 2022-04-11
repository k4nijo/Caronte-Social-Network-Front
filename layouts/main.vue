<template>
  <v-app class="main">
    <v-container class="pa-0">
      <v-row>
        <v-col></v-col>
        <v-col cols="2" class="">
          <LeftNavBar />
        </v-col>
        <v-col cols="6" class="">
          <v-main>
            <v-row>
              <v-col
                v-if="
                  this.$route.name === 'explore' ||
                  this.$route.name === 'explore-users'
                "
              >
                <SearchBar />
              </v-col>
              <v-col v-else>
                <UserBar />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <Nuxt />
              </v-col>
            </v-row> </v-main
        ></v-col>
        <v-col cols="3" class="">
          <RightNavBar />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'mainLayout',
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
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.main {
  background-color: #f4f6f9;
}
.marginL {
  margin-left: 580px;
}
.marginR {
  margin-right: 580px;
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
