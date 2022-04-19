<template>
  <v-container class="px-0 mx-auto mt-10 tabClass">
    <v-card flat max-width="800px" class="px-0 mx-auto tabClass">
      <v-row class="mx-0 tabClass">
        <v-tabs class="tabClass">
          <v-col class="tabClass">
            <v-tab to="/explore" class="tabClass"> Posts </v-tab>
          </v-col>
          <v-col class="tabClass">
            <v-tab to="/explore/users" class="tabClass"> Users </v-tab>
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

<style lang="scss" scoped>
.tabClass {
  background-color: #f9fbfc;
}
</style>
