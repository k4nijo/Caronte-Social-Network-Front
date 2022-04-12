<template>
  <v-container class="size mx-auto pa-0">
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
      <v-row>
        <v-col class="contentext text-center">{{
          this.$auth.user.description
        }}</v-col>
      </v-row>
      <v-row class="mx-0">
        <v-col class="c2" align="center" v-if="this.$auth.user.premium">
          <v-icon color="purple" class="mx-auto">mdi-medal</v-icon>
        </v-col>
        <v-col class="text-center">
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
          this.$auth.user.following.length
        }}</v-col>
        <v-col class="text-center">{{
          this.$auth.user.followers.length
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
.c1 {
  background-color: blue;
}
.c2 {
  background-color: yellow;
}
.c3 {
  background-color: green;
}
.texT {
  font-weight: bold;
}
.backG {
  background-color: #f3f1f1;
}
</style>
