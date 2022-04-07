<template>
  <v-card width="97%" class="mx-auto mt-2" max-width="800px">
    <v-toolbar class="elevation-1">
      <v-text-field
        input
        prepend-icon="mdi-magnify"
        placeholder="Search"
        clearable
        class="input mt-4"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn class="primary px-4">Publish</v-btn>
      <v-icon class="px-4">mdi-bell-outline</v-icon>
      <v-avatar color="grey" class="mr-4 px-4" size="45">
        <img :src="this.photo" alt="" />
      </v-avatar>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  name: 'UserBar',
  data() {
    return {
      photo: '',
    }
  },
  async fetch() {
    const user = await this.$axios.$get('/api/user/profile')

    this.photo = user.photo
  },
}
</script>

<style lang="scss" scoped>
.input {
  max-width: 40%;
}
</style>
