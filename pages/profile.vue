<template>
  <v-container class="size mx-auto pa-0 mt-10">
    <v-card class="pa-0">
      <v-row class="pa-0 mx-0 backG" align="center">
        <v-col cols="12" class="mt-2" align="center">
          <v-avatar size="150"
            ><img :src="this.$auth.user.photo" alt=""
          /></v-avatar>
        </v-col>
      </v-row>
      <v-row class="mx-0 text-center backG" align="center">
        <v-col class="text-center titletext texT">
          {{ this.$auth.user.name.toUpperCase() }}
          {{ this.$auth.user.surname.toUpperCase() }}
        </v-col>
      </v-row>
      <v-row class="mx-0 text-center pt-0 mt-0 backG">
        <v-col> @ {{ this.$auth.user.username }} </v-col>
      </v-row>
      <v-row class="backG transf mx-0">
        <v-col class="contentext text-center">{{
          this.$auth.user.description
        }}</v-col>
      </v-row>
      <v-row class="mx-0">
        <v-col class="" align="end" v-if="this.$auth.user.premium">
          <v-icon color="#F9A825" class="mx-auto">mdi-medal</v-icon>
        </v-col>
        <v-col v-else class="pt-1" align="end" cols="6">
          <v-progress-circular
            :rotate="360"
            :size="40"
            :width="4"
            :value="(this.$auth.user.influence / 10) * 100"
            color="secondary"
            class="sizeprog"
          >
            {{ (this.$auth.user.influence / 10) * 100 }}%
          </v-progress-circular>
        </v-col>
        <v-col class="" align="start">
          {{ this.$auth.user.influence }} Points
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col class="text-center pa-2">FOLLOWERS</v-col>
        <v-col class="text-center pa-2">FOLLOWING</v-col>
        <v-col class="text-center pa-2">SUBSCRIBERS</v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">{{
          this.$auth.user.followers.length
        }}</v-col>
        <v-col class="text-center">{{
          this.$auth.user.following.length
        }}</v-col>
        <v-col class="text-center">{{
          this.$auth.user.subscribers.length
        }}</v-col>
      </v-row>
      <v-row class="mx-0 my-6">
        <v-tabs>
          <v-col>
            <v-tab to="/profile">POST</v-tab>
          </v-col>
          <v-col>
            <v-tab to="/profile/bookmarks">BOOKMARKS</v-tab>
          </v-col>
        </v-tabs>
      </v-row>
      <v-row>
        <NuxtChild />
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'profile',
  layout: 'main',
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.size {
  max-width: 800px;
}
.sizeprog {
  font-size: 0.9rem;
}
.c1 {
  background-color: green;
}
.c2 {
  background-color: red;
}
.c3 {
  background-color: blue;
}
.followbtn:hover {
  background-color: rgb(203, 75, 75);
}
.backG {
  background-color: #f9f9f9;
}
.transf {
  border-bottom-right-radius: 100px;
  border-bottom-left-radius: 100px;
  border-bottom: 1px solid #082640;
}
</style>
