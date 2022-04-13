<template>
  <v-app class="main">
    <v-container>
      <v-main>
        <v-row>
          <v-col cols="3">
            <LeftNavBar />
          </v-col>
          <v-col cols="6">
            <v-row>
              <v-col
                v-if="
                  this.$route.name === 'explore' ||
                  this.$route.name === 'explore-users'
                "
              >
                <SearchBar />
              </v-col>
              <v-col v-else>
                <UserBar />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <Nuxt />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="3">
            <RightNavBar />
          </v-col>
        </v-row>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'mainLayout',
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
v-app {
  margin: 0;
}
.main {
  background-color: #fafafa;
}
.c1 {
  background-color: red;
}
.c2 {
  background-color: green;
}
.c3 {
  background-color: yellow;
}
</style>
