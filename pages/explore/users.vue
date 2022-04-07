<template>
  <div>
    Hola estoy en Users
    <div>{{ users }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
    }
  },
  async asyncData({ $axios }) {
    let { data } = await $axios.get('/api/users')
    return { users: data }
  },
}
</script>

<style lang="scss" scoped></style>
