<template>
  <v-card width="97%" class="mx-auto">
    <v-toolbar>
      <v-text-field
        tag="inline"
        input
        prepend-icon="mdi-magnify"
        placeholder="Search"
        clearable
        class="input"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn tag="inline" class="primary px-4">Publish</v-btn>
      <v-icon class="px-4">mdi-bell-outline</v-icon>
      <v-avatar
        color="grey"
        class="mr-4 px-4"
        size="45"
        tag="inline"
      ></v-avatar>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.input {
  max-width: 40%;
}
</style>
