<template>
  <v-container>
    <v-card width="80%" class="mx-auto elevation-1 my-10 c2">
      <v-row class="mx-auto rankingtitle elevation-1">
        <v-col cols="9" class="titletext white--text">Ranking User</v-col>
        <v-col cols="3" align="center"
          ><NuxtLink to="/explore/users" class="username grey-text"
            >See All</NuxtLink
          ></v-col
        >
      </v-row>
      <v-row class="mt-1">
        <v-col cols="4" align="center" class="font">Avatar</v-col>
        <v-col cols="4" align="center" class="font">Username</v-col>
        <v-col cols="4" align="center" class="font">Points</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="mx-auto mt-1" v-for="(user, i) in ranking" :key="i">
        <v-col cols="4" align="center">
          <v-avatar size="45" class="my-0"><img :src="user.photo" /></v-avatar>
        </v-col>
        <v-col cols="5" class="username mt-2" align="center">{{
          user.username
        }}</v-col>
        <v-col
          cols="3"
          class="username mt-2"
          align="center"
          :class="
            user.premium === 'true' ? 'workspace_premium' : 'username mt-2'
          "
          >{{ user.influence }}</v-col
        >
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
    this.ranking = await this.$axios.$get('/api/users/ranking')
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
