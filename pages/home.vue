<template>
  <div>
    <v-container class="mx-auto">
      <Feed />
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  middleware: 'auth',
  layout: 'main',
}
</script>

<style lang="scss" scoped></style>
