<template>
  <v-container>
    <PostResume :feed="posts" />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
    }
  },
  async asyncData({ store, $axios }) {
    let { data } = await $axios.get(
      `/api/post?category=${store.state.category}`
    )
    return { posts: data }
  },
}
</script>

<style lang="scss" scoped>
.post {
  margin-inline: 8vw;
}
.title {
  display: flex;
  align-items: center;
}
.timeAgo {
  font-size: 14px;
  color: #757575;
}
.postimg {
  display: flex;
  justify-content: center;
}
.imgstyle {
  border-radius: 10px;
  width: 400px;
  height: 200px;
}
</style>
