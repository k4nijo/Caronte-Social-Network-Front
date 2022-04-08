<template>
  <v-container>
    <PostResume :feed="feed" />
  </v-container>
</template>

<script>
export default {
  name: 'Feed',
  data() {
    return {
      feed: [],
    }
  },
  async fetch() {
    this.feed = await this.$axios.$get('/api/user/feed?sort=-1')
  },
}
</script>

<style lang="scss" scoped></style>
