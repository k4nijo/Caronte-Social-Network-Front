<template>
  <v-container>
    <v-card flat v-for="(elem, idx) in users" :key="idx" class="d-flex my-4">
      <div class="username">
        <v-avatar color="grey" size="55">
          <img :src="elem.photo" :alt="elem.name" />
        </v-avatar>
        {{ elem.name }} {{ elem.surname }}
        <label class="mention">@{{ elem.username }}</label>
      </div>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-btn class="mr-4 primary">Follow</v-btn>
        <v-icon class="mr-4">mdi-send-outline</v-icon>
        <v-icon class="mr-4">mdi-dots-horizontal</v-icon>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      users: [],
    }
  },
  async asyncData({ $axios }) {
    let { data } = await $axios.get('/api/users')
    return { users: data }
  },
}
</script>

<style lang="scss" scoped>
.mention {
  font-size: 14px;
  color: #757575;
}
</style>
