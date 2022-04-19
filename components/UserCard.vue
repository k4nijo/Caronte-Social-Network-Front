<template>
  <v-card flat class="d-flex my-4">
    <div class="username">
      <v-avatar color="grey" size="55">
        <img :src="user.photo" :alt="user.name" />
      </v-avatar>
      <NuxtLink
        :to="`/users/${user._id}`"
        style="text-decoration: none; color: inherit"
        class="username"
      >
        {{ user.name }} {{ user.surname }}
        <label class="mention">@{{ user.username }}</label>
      </NuxtLink>
    </div>
    <v-spacer></v-spacer>
    <v-card-actions>
      <v-btn
        small
        class="primary"
        v-show="!following && user._id !== this.$auth.user._id"
        width="93.11px"
        height="28px"
      >
        Follow
      </v-btn>
      <v-hover v-slot="{ hover }" v-show="following">
        <v-btn
          width="93.11px"
          height="28px"
          small
          :class="hover ? 'red--text' : '#B71C1C'"
        >
          <span v-if="hover">Unfollow</span><span v-else>Following</span>
        </v-btn>
      </v-hover>
      <v-btn icon v-show="user._id !== this.$auth.user._id"
        ><v-icon class="mr-4">mdi-send-outline</v-icon></v-btn
      >
      <v-btn icon v-show="user._id !== this.$auth.user._id"
        ><v-icon class="mr-4">mdi-dots-horizontal</v-icon></v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'UserCard',
  props: ['user'],
  computed: {
    following() {
      return this.user.followers.some((elem) => elem === this.$auth.user._id)
    },
  },
}
</script>

<style lang="scss" scoped>
.mention {
  font-size: 14px;
  color: #757575;
}
.username {
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  line-height: 30px;
  font-weight: 500;
}
</style>
