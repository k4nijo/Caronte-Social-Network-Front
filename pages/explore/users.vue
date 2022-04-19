<template>
  <v-container class="white elevation-1">
    <v-row v-for="(user, i) in filteredUsers" :key="i" no-gutters>
      <v-col>
        <UserCard :user="user" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'users',
  layout: 'main',
  computed: {
    ...mapGetters({
      users: 'users/getUsers',
      filteredUsers: 'users/getFilteredUsers',
    }),
  },
  async fetch({ store }) {
    await store.dispatch('users/fetchAllUsers')
  },
  mounted() {
    if (!this.users.length) {
      this.$store.dispatch('users/fetchAllUsers')
    }
  },
}
</script>

<style lang="scss" scoped></style>
