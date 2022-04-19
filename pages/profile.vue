<template>
  <v-container class="size mx-auto pa-0 mt-10">
    <v-card class="pa-0">
      <v-row class="pa-0 mx-0 blue-grey lighten-3" align="center">
        <v-col cols="12" class="mt-2" align="start">
          <v-avatar size="150" class="avatarBorder"
            ><img :src="this.$auth.user.photo" alt=""
          /></v-avatar>
        </v-col>
      </v-row>
      <v-row class="mx-0" align="center">
        <v-col class="titletext texT">
          {{ name }}
          {{ surname }}
        </v-col>
      </v-row>
      <v-row class="mx-0 pt-0 mt-0">
        <v-col> @ {{ this.$auth.user.username }} </v-col>
      </v-row>
      <v-row class="mx-0">
        <v-col class="contentext">{{ this.$auth.user.description }}</v-col>
      </v-row>
      <v-row class="ml-2 mb-1">
        <v-col cols="2">
          <span class="numStyle">{{ this.$auth.user.followers.length }}</span>
          Followers</v-col
        >
        <v-col cols="2"
          ><span class="numStyle">{{ this.$auth.user.following.length }}</span>
          Following</v-col
        >
        <v-col cols="2"
          ><span class="numStyle">{{
            this.$auth.user.subscribers.length
          }}</span>
          Subscribers</v-col
        >
      </v-row>
      <v-divider></v-divider>
      <v-row class="mx-0 my-2">
        <v-col class="" align="end" v-if="this.$auth.user.premium">
          <v-icon color="#F9A825" class="mx-auto">mdi-medal</v-icon>
        </v-col>
        <v-col v-else class="pt-1" align="end" cols="6">
          <v-progress-circular
            :rotate="360"
            :size="40"
            :width="4"
            :value="(this.$auth.user.influence / premiumLvl) * 100"
            color="secondary"
            class="sizeprog"
          >
            {{ (this.$auth.user.influence / premiumLvl) * 100 }}%
          </v-progress-circular>
        </v-col>
        <v-col class="" align="start">
          {{ this.$auth.user.influence }} Points
        </v-col>
      </v-row>
      <v-divider></v-divider>

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
    return {
      premiumLvl: '',
    }
  },
  computed: {
    name() {
      return this.$auth.user.name.toUpperCase()
    },
    surname() {
      return this.$auth.user.surname.toUpperCase()
    },
  },
  mounted() {
    this.premiumLvl = parseInt(process.env.premiumLvl)
  },
}
</script>

<style lang="scss" scoped>
.avatarBorder {
  border: 4px solid white;
}
.numStyle {
  font-weight: bold;
}
.titletext {
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  line-height: 30px;
  font-weight: 600;
}
.size {
  max-width: 800px;
}
.sizeprog {
  font-size: 0.9rem;
}
.followbtn:hover {
  background-color: rgb(203, 75, 75);
}
</style>
