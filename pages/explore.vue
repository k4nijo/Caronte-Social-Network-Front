<template>
  <v-container class="mx-auto">
    <v-card max-width="800px" class="mx-auto">
      <v-tabs>
        <v-tab to="/explore"> Posts </v-tab>
        <v-tab to="/explore/users"> Users </v-tab>
      </v-tabs>
      <NuxtChild />
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'explore',
  middleware: 'auth',
  layout: 'main',
}
</script>

<style lang="scss" scoped></style>
