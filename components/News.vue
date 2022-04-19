<template>
  <v-container class="mx-auto pa-0">
    <v-card class="elevation-1">
      <v-row class="ml-0">
        <v-col><span class="titletext mx-0">Latest News</span> </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row v-for="(notice, i) in news" :key="i" class="mt-2">
        <v-col class="ml-2" cols="2">
          <img :src="notice.imageurl" alt="" width="40px" />
        </v-col>
        <v-col align="start" class="mt-2">
          <v-row>{{ notice.title.substr(0, 40) }}...</v-row>
          <v-row
            ><a :href="notice.url" class="grey--text">Link to New</a></v-row
          >
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'News',
  data() {
    return {
      news: [],
    }
  },
  async fetch() {
    const list = await this.$axios.$get('/api/data/news')
    this.news = list.slice(0, 4)
  },
}
</script>

<style lang="scss" scoped>
.titletext {
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  line-height: 30px;
  font-weight: 600;
}
</style>
