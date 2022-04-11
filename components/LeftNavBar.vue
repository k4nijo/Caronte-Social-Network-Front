<template>
  <v-navigation-drawer permanent height="100%" class="glue">
    <img src="" alt="" />
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
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.glue {
  position: fixed;
  left: 550px;
}
</style>
