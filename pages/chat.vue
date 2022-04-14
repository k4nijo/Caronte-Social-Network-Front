<template>
  <v-container class="pa-0 mx-auto size">
    <NuxtLink style="text-decoration: none" :to="`/room/${rooms[0]._id}`">
      <v-card flat class="mx-0">
        <v-row class="mx-0">
          <v-col class="" cols="1">
            <v-badge
              bordered
              bottom
              :color="connected(0) ? 'green' : 'grey'"
              dot
              offset-x="10"
              offset-y="10"
            >
              <v-avatar> <img :src="user.photo" alt="" /> </v-avatar>
            </v-badge>
          </v-col>
          <v-col class="" cols="5"
            ><div>
              <span class="name">{{ user.name }} {{ user.surname }}</span>
              <span class="mention">@ {{ user.username }}</span>
            </div>
            <div class="message">
              {{ rooms[0].messages[rooms[0].messages.length - 1].user.name }}
              escribió:
              {{ rooms[0].messages[rooms[0].messages.length - 1].message }}
            </div></v-col
          >
          <v-col cols="6" class="date mt-6" align="end" justify="end">
            {{
              new Date(
                rooms[0].messages[rooms[0].messages.length - 1].date
              ).toLocaleString('en-US', { hour12: true })
            }}
          </v-col>
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
  methods: {
    connected(idx) {
      return this.rooms[idx].user1._id === this.$auth.user._id
        ? this.rooms[idx].user2.online
        : this.rooms[idx].user1.online
    },
  },
  async asyncData({ $auth, $axios }) {
    const rooms = await $axios.get(`/api/user/chatroom`)
    const userlogged =
      rooms.data[0].user1._id === $auth.user._id
        ? rooms.data[0].user2
        : rooms.data[0].user1

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
// .test1 {
//   background-color: blue;
// }
// .test2 {
//   background-color: red;
// }
.name {
  font-weight: bold;
}
.message {
  font-size: 0.9rem;
}
.mention {
  font-size: 14px;
  color: #757575;
}
.date {
  font-size: 0.8rem;
}
</style>
