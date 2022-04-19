<template>
  <v-container class="px-0 mt-4">
    <v-row v-for="(post, i) in feed" :key="i" class="my-0" no-gutters>
      <v-col class="my-0">
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
