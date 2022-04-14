<template>
  <v-container class="pa-0 mx-auto size">
    <NuxtLink :to="`/room/${rooms[0]._id}`">
      <v-card flat class="mx-0">
        <v-row class="mx-0">
          <v-col class=""
            ><v-avatar> <img :src="user.photo" alt="" /> </v-avatar
          ></v-col>
          <v-col class=""
            ><div>@ {{ user.username }}</div>
            <div>
              {{ rooms[0].messages[rooms[0].messages.length - 1] }}
            </div></v-col
          >
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
    const userlogged =
      rooms.data[0].user1._id === $auth.user._id
        ? rooms.data[0].user2
        : rooms.data[0].user1

    console.log(rooms.data[0].user1._id === $auth.user._id)
    return {
      rooms: rooms.data,
      user: userlogged,
    }
  },
}
</script>

<style lang="scss" scoped>
.size {
  max-width: 800px;
}
</style>
