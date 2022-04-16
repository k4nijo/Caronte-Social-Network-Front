<template>
  <v-container>
    <v-row v-for="(post, i) in bookmarks" :key="i">
      <v-col>
        <PostResume :post="post" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'mybookmarks',
  data() {
    return {
      bookmarks: [],
    }
  },
  async asyncData({ $axios }) {
    let { data } = await $axios.get('/api/user/bookmarks')

    return { bookmarks: data }
  },
}
</script>

<style lang="scss" scoped></style>
