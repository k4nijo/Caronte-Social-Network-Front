<template>
  <v-app class="main">
    <v-navigation-drawer app permanent>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="grey--text text--darken-1">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-footer padless class="mx-2 white grey--text" fixed>
        <v-card-text class="text-center"
          >&copy; Caronte {{ new Date().getFullYear() }}</v-card-text
        ></v-footer
      >
    </v-navigation-drawer>
    <v-main min-width="100%" class="d-flex-colum justify-center">
      <div v-if="this.$route.name === 'explore'">
        <SearchBar />
      </div>
      <div v-else>
        <UserBar />
      </div>
      <Nuxt />
    </v-main>
    <v-navigation-drawer
      app
      permanent
      absolute
      right
      width="20%"
      height="100%"
    ></v-navigation-drawer>
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
        },
        {
          icon: 'mdi-scale-balance',
          title: 'MARKET',
        },
        {
          icon: 'mdi-robot-outline',
          title: 'PROFILE',
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
</style>
