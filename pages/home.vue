<template>
  <div>
    Hola!
    <v-container>
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
