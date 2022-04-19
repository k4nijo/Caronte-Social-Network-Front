<template>
  <v-container class="pa-0 mx-auto">

    <v-card class="elevation-1">
      <v-row>
        <v-col class="titletext ml-2"> Recent Messages </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-card flat class="mx-0 mt-4" v-for="(elem, i) in rooms" :key="i">
        <NuxtLink
          style="text-decoration: none; color: inherit"
          :to="`/room/${elem._id}`"
        >
          <v-row class="mx-0">
            <v-col class="" cols="2">
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
            <v-col class="" cols="8"
              ><div>
                <span class="name"
                  >{{ user[i].name }} {{ user[i].surname }}</span
                >
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
            <v-col cols="1" class="mt-4" align="end">
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
            <!-- <v-col cols="4" class="date mt-6" align="end" justify="end">
            <div v-if="elem.messages.length > 0">
              {{
                new Date(
                  elem.messages[elem.messages.length - 1].date
                ).toLocaleString('en-US', { hour12: true })
              }}
            </div>
          </v-col> -->
          </v-row>
        </NuxtLink>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'ConversationResume',
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
  async fetch() {
    const rooms = await this.$axios.get(`/api/user/chatroom`)

    let roomOrdered = rooms.data.sort(
      (a, b) =>
        b.messages[b.messages.length - 1].date -
        a.messages[a.messages.length - 1].date
    )

    const userlogged = roomOrdered.map(
      (elem) =>
        (elem =
          elem.user1._id === this.$auth.user._id ? elem.user2 : elem.user1)
    )

    this.rooms = roomOrdered.slice(0, 3)
    this.user = userlogged
  },
}
</script>

<style lang="scss" scoped>

.name {
  font-weight: bold;
}
.message {
  font-size: 0.8rem;
}
.mention {
  font-size: 14px;
  color: #757575;
}
.date {
  font-size: 0.8rem;
}
.titletext {
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  line-height: 30px;
  font-weight: 600;
}
</style>
