<template>
  <v-container class="pa-0 mx-auto size">
    <v-card class="pa-0">
      <v-row class="pa-0 mx-0">
        <v-col><NuxtChild /></v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'room',
  layout: 'main',
}
</script>

<style lang="scss" scoped>
.size {
  max-width: 800px;
}
</style>
