<template>
  <v-card width="97%" class="mx-auto mt-2" max-width="800px">
    <v-toolbar color="secondary" v-if="$route.name === 'explore'">
      <v-icon medium color="white"> mdi-magnify </v-icon>
      <v-text-field
        background-color="white"
        filled
        rounded
        dense
        clearable
        :value="searchPost"
        label="Search"
        placeholder="Search By Title"
        class="mt-6 mx-5"
        @input="handleSearchPost"
      />
    </v-toolbar>
    <v-toolbar color="secondary" v-else>
      <v-icon medium color="white"> mdi-magnify </v-icon>
      <v-text-field
        background-color="white"
        filled
        rounded
        dense
        clearable
        :value="searchUser"
        label="Search"
        placeholder="Search By Username"
        class="mt-6 mx-5"
        @input="handleSearchUser"
      />
    </v-toolbar>
  </v-card>
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

<style lang="scss" scoped></style>
