<template>
  <v-container class="pa-0">
    <v-row class="mb-2">
      <v-col class="test1" justify="center" align="center" cols="1">
        <v-badge
          bordered
          bottom
          :color="isLoggedIn ? 'green' : 'grey'"
          dot
          offset-x="10"
          offset-y="10"
        >
          <v-avatar>
            <img
              :src="avatar ? newUser.user2.photo : newUser.user1.photo"
              alt=""
            />
          </v-avatar>
        </v-badge>
      </v-col>
      <v-col class="test2 line" cols="10">
        <div>
          <span
            >{{ avatar ? newUser.user2.name : newUser.user1.name }}
            {{ avatar ? newUser.user2.surname : newUser.user1.surname }}</span
          >
          <span class="mention">
            @{{
              avatar ? newUser.user2.username : newUser.user1.username
            }}</span
          >
        </div>
      </v-col>
      <v-col cols="1" class="mt-4">
        <v-btn icon small to="/chat">
          <v-icon>mdi-arrow-left-thin</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-card
      v-scroll.self="onScroll"
      min-height="70vh"
      max-height="70vh"
      class="back pa-2 overflow-y-auto"
    >
      <v-row
        :justify="message.user._id !== $auth.user._id ? 'start' : 'end'"
        class="mx-0 pa-0 my-2"
        v-for="(message, i) in newRoom"
        :key="i"
      >
        <v-col
          cols="10"
          :class="[
            message.user._id === $auth.user._id
              ? 'c2 borderR'
              : 'c1 borderL secondary',
          ]"
        >
          <div class="nameStyle">{{ message.user.name }}</div>
          <div>{{ message.message }}</div>
        </v-col>
      </v-row>
    </v-card>
    <v-row>
      <v-col cols="10">
        <v-text-field
          v-model="newMessage"
          placeholder="Write your message"
          @keydown.enter="sendMessage(newMessage)"
        ></v-text-field>
      </v-col>
      <v-col cols="2" align="end">
        <v-btn
          class="mt-4 mr-2"
          icon
          large
          :disabled="isDisabled"
          @click="sendMessage(newMessage)"
        >
          <v-icon large color="primary">mdi-send</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  scrollToTop: true,
  name: 'Messages',
  props: ['room', 'user'],
  data() {
    return {
      newMessage: '',
      scrollInvoked: 0,
      messages: [],
      timer: '',
      newUser: this.user,
      newRoom: this.room,
      oldRoom: '',
    }
  },
  computed: {
    isDisabled() {
      return this.newMessage.length > 0 ? false : true
    },
    avatar() {
      return this.newUser.user1._id === this.$auth.user._id
    },
    isLoggedIn() {
      return this.newUser.user1._id === this.$auth.user._id
        ? this.newUser.user2.online
        : this.newUser.user1.online
    },
  },
  methods: {
    async sendMessage(txt) {
      if (txt !== '') {
        const message = await this.$axios.post(
          `/api/user/chatroom/${this.$route.params.id}`,
          {
            message: txt,
          }
        )
        this.newMessage = ''
        this.room.push(message.data)
      }
    },
    onScroll() {
      this.scrollInvoked++
    },
    scrollToEnd() {
      const container = document.querySelector('.back')
      const scrollHeight = container.scrollHeight
      container.scrollTop = scrollHeight
    },
    async cleanNewMessages() {
      await this.$axios.put(`/api/user/chatroom/${this.$route.params.id}`)
    },
  },
  mounted() {
    this.scrollToEnd()
    this.cleanNewMessages()
    this.timer = setInterval(() => {
      this.$axios
        .get(`/api/user/chatroom/${this.$route.params.id}`)
        .then((res) => {
          this.oldRoom = this.newRoom
          this.newRoom = res.data.messages
          this.newUser = res.data

          return
        })
    }, 1000)
  },
  updated() {
    if (this.newRoom.length > this.oldRoom.length) {
      this.scrollToEnd()
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
}
</script>

<style lang="scss" scoped>
.c1 {
  color: #ffffff;
}
.c2 {
  background-color: #ffffff;
}
.borderL {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.borderR {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.nameStyle {
  font-weight: bold;
  font-size: 0.8rem;
}
.back {
  background-color: rgb(230, 228, 228);
}
// .test1 {
//   background-color: blue;
// }
// .test2 {
//   background-color: red;
// }
.line {
  line-height: 50px;
  font-weight: bold;
}
.mention {
  font-size: 14px;
  color: #757575;
}
</style>
