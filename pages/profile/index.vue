<template>
  <v-container>
    <PostResume :feed="personalPosts" />
  </v-container>
</template>

<script>
export default {
  name: 'mypost',
  data() {
    return {
      personalPosts: [],
    }
  },
  async asyncData({ $axios }) {
    let { data } = await $axios.get(`/api/user/profile/mypost`)

    return { personalPosts: data }
  },
}
</script>

<style lang="scss" scoped>
.c1 {
  background-color: blue;
}
</style>
