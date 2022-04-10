<template>
  <v-container>
    <PostResume :feed="feed" />
    <SnackBarPost />
  </v-container>
</template>

<script>
export default {
  name: 'home',
  layout: 'main',
  data() {
    return {
      feed: [],
    }
  },
  async asyncData({ $axios }) {
    let { data } = await $axios.get('/api/user/feed?sort=-1')
    return { feed: data }
  },
}
</script>

<style lang="scss" scoped></style>
