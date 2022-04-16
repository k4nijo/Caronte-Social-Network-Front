<template>
  <v-container class="px-0">
    <v-row v-for="(post, i) in feed" :key="i">
      <v-col>
        <PostResume :post="post" />
      </v-col>
    </v-row>
    <SnackBarPost />
  </v-container>
</template>

<script>
export default {
  name: 'home',
  layout: 'main',
  data() {
    return {
      feed: '',
    }
  },
  async asyncData({ $axios }) {
    let { data } = await $axios.get('/api/user/feed?sort=-1')
    return { feed: data }
  },
}
</script>

<style lang="scss" scoped></style>
