<template>
  <v-container class="mx-auto pa-0">
    <v-card class="elevation-1">
      <v-row class="">
        <v-col cols="6" class="ml-2">Ranking User</v-col>
        <v-col cols="5" align="end"
          ><NuxtLink
            to="/explore/users"
            class="grey--text"
            style="text-decoration: none; color: inherit"
            >See All</NuxtLink
          ></v-col
        >
      </v-row>
      <v-row class="mt-1">
        <v-col cols="3" align="center" class="font">Avatar</v-col>
        <v-col cols="1"></v-col>
        <v-col cols="4" align="center" class="font">Username</v-col>
        <v-col cols="4" align="center" class="font">Points</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="mx-auto mt-1" v-for="(user, i) in ranking" :key="i">
        <v-col cols="3" align="center">
          <v-avatar size="45" class="my-0"><img :src="user.photo" /></v-avatar>
        </v-col>
        <v-col cols="1" align="start" class="pl-0 mt-2"
          ><v-icon color="#F9A825" align="start" v-if="user.premium"
            >mdi-medal</v-icon
          ></v-col
        >
        <v-col cols="5" class="mt-2" align="center">{{ user.username }}</v-col>
        <v-col cols="3" class="mt-2" align="center">{{ user.influence }}</v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'RankingUsers',
  data() {
    return {
      ranking: [],
    }
  },
  async fetch() {
    const users = await this.$axios.$get('/api/users/ranking')
    this.ranking = users.splice(0, 5)
  },
}
</script>

<style lang="scss" scoped>
.rankingtitle {
  background-color: #193040;
  border-radius: 3px;
}
.c2 {
  background-color: #f4f6f9;
}
.font {
  font-size: 12px;
  font-weight: 600;
}
</style>
