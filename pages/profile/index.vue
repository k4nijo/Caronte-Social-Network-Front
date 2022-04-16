<template>
  <v-container>
    <v-row v-for="(post, i) in personalPosts" :key="i" class="my-0" no-gutters>
      <v-col>
        <PostResume :post="post" />
      </v-col>
    </v-row>
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
