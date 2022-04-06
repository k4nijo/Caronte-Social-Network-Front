<template>
  <div>
    Hola estoy en posts
    <div>{{ posts }}</div>
  </div>
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

<style lang="scss" scoped></style>
