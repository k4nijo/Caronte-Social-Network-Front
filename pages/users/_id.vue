<template>
  <v-container class="size mx-auto pa-0">
    <v-card class="pa-0">
      <v-row class="pa-0 mx-0 backG" align="center">
        <v-col cols="12" class="mt-2" align="center">
          <v-avatar size="150"
            ><img :src="this.userInfo.photo" alt=""
          /></v-avatar>
        </v-col>
      </v-row>
      <v-row class="mx-0 text-center backG" align="center">
        <v-col class="text-center titletext texT">
          {{ this.userInfo.name.toUpperCase() }}
          {{ this.userInfo.surname.toUpperCase() }}
        </v-col>
      </v-row>
      <v-row class="mx-0 text-center pt-0 mt-0 backG">
        <v-col> @ {{ this.userInfo.username }} </v-col>
      </v-row>
      <v-row>
        <v-col class="contentext text-center">{{
          this.userInfo.description
        }}</v-col>
      </v-row>
      <v-row class="mx-0">
        <v-col class="c2" align="center" v-if="this.userInfo.premium">
          <v-icon color="purple" class="mx-auto">mdi-medal</v-icon>
        </v-col>
        <v-col class="text-center">
          {{ this.userInfo.influence }} Points
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col class="text-center pa-2">FOLLOWERS</v-col>
        <v-col class="text-center pa-2">FOLLOWING</v-col>
        <v-col class="text-center pa-2">SUBSCRIBERS</v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">{{ this.userInfo.followers.length }}</v-col>
        <v-col class="text-center">{{ this.userInfo.following.length }}</v-col>
        <v-col class="text-center">{{
          this.userInfo.subscribers.length
        }}</v-col>
      </v-row>
      <v-row class="mb-0 size">
        <v-col align="center">
          <v-btn small class="primary"> Follow </v-btn>
        </v-col>
        <v-col align="center">
          <v-btn small class="primary"> Message </v-btn>
        </v-col>
        <v-col align="center">
          <v-btn small class="primary"> Subscribe </v-btn>
        </v-col>
      </v-row>
      <v-row class="pl-10 mt-10">
        <v-col class="contentext">Latest Contributions</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row></v-row>
      <v-row>
        <v-col>
          <PostResume :feed="userInfo.posts" />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'userid',
  layout: 'main',
  data() {
    return {
      userInfo: [],
    }
  },
  async asyncData({ $axios, route }) {
    let { data } = await $axios.get(`/api/users/${route.params.id}`)

    return { userInfo: data }
  },
}
</script>

<style lang="scss" scoped>
.size {
  max-width: 800px;
}
</style>
