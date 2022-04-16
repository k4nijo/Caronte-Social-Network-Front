<template>
  <v-card flat class="d-flex my-4">
    <div class="username">
      <v-avatar color="grey" size="55">
        <img :src="user.photo" :alt="user.name" />
      </v-avatar>
      {{ user.name }} {{ user.surname }}
      <label class="mention">@{{ user.username }}</label>
    </div>
    <v-spacer></v-spacer>
    <v-card-actions>
      <v-btn class="mr-4 primary">Follow</v-btn>
      <v-icon class="mr-4">mdi-send-outline</v-icon>
      <v-icon class="mr-4">mdi-dots-horizontal</v-icon>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'UserCard',
  props: ['user'],
}
</script>

<style lang="scss" scoped>
.mention {
  font-size: 14px;
  color: #757575;
}
</style>
