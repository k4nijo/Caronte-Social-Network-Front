<template>
  <v-container>
    <NuxtLink :to="`/chat/${rooms[0]._id}`">
      <v-card flat>
        <v-row class="mx-0">
          <v-col
            ><v-avatar> <img :src="user.photo" alt="" /> </v-avatar
          ></v-col>
          <v-col class="">@ {{ user.username }} {{ rooms[0]._id }}</v-col>
        </v-row>
      </v-card>
    </NuxtLink>
  </v-container>
</template>

<script>
export default {
  name: 'chat',
  layout: 'main',
  data() {
    return {
      rooms: '',
      user: '',
    }
  },
  async asyncData({ $auth, $axios }) {
    const rooms = await $axios.get(`/api/user/chatroom`)

    return {
      rooms: rooms.data,
      user:
        rooms.data[0].user1 === $auth.user._id
          ? rooms.data[0].user1
          : rooms.data[0].user2,
    }
  },
}
</script>

<style lang="scss" scoped></style>
