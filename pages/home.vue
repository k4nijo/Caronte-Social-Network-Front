<template>
  <v-container>
    <Feed />
  </v-container>
</template>

<script>
export default {
  name: 'home',
  middleware: 'auth',
  layout: 'main',
}
</script>

<style lang="scss" scoped></style>
