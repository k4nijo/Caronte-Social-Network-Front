<template>
  <v-app-bar fixed max-width="800px" class="mx-auto primary">
    <v-row v-if="$route.name === 'explore'">
      <v-col cols="1" class="mt-6" align="end" justify="center">
        <v-icon medium color="white"> mdi-magnify </v-icon>
      </v-col>
      <v-col cols="11" class="mt-4 ml-0" align="start">
        <v-text-field
          background-color="white"
          filled
          rounded
          dense
          clearable
          full-width
          :value="searchPost"
          label="Search"
          placeholder="Search By Title"
          class="mx-5"
          @input="handleSearchPost"
        />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="1" class="mt-6" align="end">
        <v-icon medium color="white"> mdi-magnify </v-icon>
      </v-col>
      <v-col cols="11" class="mt-4" align="start">
        <v-text-field
          background-color="white"
          filled
          rounded
          dense
          clearable
          full-width
          :value="searchUser"
          label="Search"
          placeholder="Search By Username"
          class="mx-5"
          @input="handleSearchUser"
        />
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import { debounce } from '~/helpers/index'

export default {
  name: 'SearchBar',
  computed: {
    searchPost() {
      return this.$store.state.posts.filter.search
    },
    searchUser() {
      return this.$store.state.users.filter.search
    },
  },
  methods: {
    handleSearchPost: debounce(function (e) {
      this.$store.dispatch('posts/filterSearch', e)
    }, 500),
    handleSearchUser: debounce(function (e) {
      this.$store.dispatch('users/filterSearch', e)
    }, 500),
  },
}
</script>

<style lang="scss" scoped>
.c2 {
  background-color: green;
}
.c3 {
  background-color: yellow;
}
</style>
