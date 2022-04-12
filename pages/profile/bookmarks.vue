<template>
  <v-container>
    <PostResume :feed="bookmarks" />
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
