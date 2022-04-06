<template>
  <div>
    <v-card>
      <v-tabs>
        <v-tab to="/explore"> Posts </v-tab>
        <v-tab to="/explore/users"> Users </v-tab>
      </v-tabs>
    </v-card>
    <NuxtChild />
  </div>
</template>

<script>
export default {
  name: 'explore',
  layout: 'main',
}
</script>

<style lang="scss" scoped></style>
