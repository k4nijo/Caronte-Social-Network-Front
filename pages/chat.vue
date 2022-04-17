<template>
  <v-container class="pa-0 mx-auto size mt-10">
    <v-card class="mx-0 elevation-1">
      <v-row>
        <v-col class="titletext mb-2 ml-2">
          {{ rooms.length }} Chat Rooms Open
        </v-col>
      </v-row>
      <NuxtLink
        v-for="(elem, i) in rooms"
        :key="i"
        style="text-decoration: none; color: inherit"
        :to="`/room/${elem._id}`"
      >
        <v-row class="mx-0">
          <v-col class="" cols="1">
            <v-badge
              bordered
              bottom
              :color="connected(i) ? 'green' : 'grey'"
              dot
              offset-x="10"
              offset-y="10"
            >
              <v-avatar> <img :src="user[i].photo" alt="" /> </v-avatar>
            </v-badge>
          </v-col>
          <v-col class="" cols="4"
            ><div>
              <span class="name">{{ user[i].name }} {{ user[i].surname }}</span>
              <span class="mention">@ {{ user[i].username }}</span>
            </div>
            <div class="message" v-if="elem.messages.length > 0">
              {{ elem.messages[elem.messages.length - 1].user.name }}
              escribió:
              {{
                elem.messages[elem.messages.length - 1].message.length > 20
                  ? `${elem.messages[
                      elem.messages.length - 1
                    ].message.substring(0, 20)}...`
                  : elem.messages[elem.messages.length - 1].message
              }}
            </div>
          </v-col>
          <v-col cols="3" class="mt-4" align="end">
            <div
              v-if="
                elem.user1._id === $auth.user._id
                  ? elem.newMessages1 > 0
                  : elem.newMessages2 > 0
              "
            >
              <v-btn icon small class="green" color="white"
                >+{{
                  elem.user1._id === $auth.user._id
                    ? elem.newMessages1
                    : elem.newMessages2
                }}</v-btn
              >
            </div>
          </v-col>
          <v-col cols="4" class="date mt-6" align="end" justify="end">
            <div v-if="elem.messages.length > 0">
              {{
                new Date(
                  elem.messages[elem.messages.length - 1].date
                ).toLocaleString('en-US', { hour12: true })
              }}
            </div>
          </v-col>
        </v-row>
      </NuxtLink>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'chat',
  layout: 'main',
  data() {
    return {
      rooms: '',
      user: [],
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

    let roomOrdered = rooms.data.sort(
      (a, b) =>
        b.messages[b.messages.length - 1].date -
        a.messages[a.messages.length - 1].date
    )

    const userlogged = roomOrdered.map(
      (elem) =>
        (elem = elem.user1._id === $auth.user._id ? elem.user2 : elem.user1)
    )

    return {
      rooms: roomOrdered,
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
