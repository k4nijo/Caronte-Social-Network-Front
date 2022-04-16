<template>
  <v-container class="px-0 mx-auto">
    <v-card max-width="800px" class="px-0 mx-auto">
      <v-row class="mx-0">
        <v-tabs>
          <v-col>
            <v-tab to="/explore"> Posts </v-tab>
          </v-col>
          <v-col>
            <v-tab to="/explore/users"> Users </v-tab>
          </v-col>
        </v-tabs>
      </v-row>
      <v-row>
        <v-col>
          <NuxtChild />
        </v-col>
      </v-row>
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
