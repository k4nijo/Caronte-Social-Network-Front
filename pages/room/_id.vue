<template>
  <v-container class="pa-0">
    <v-row class="pa-0 mx-0">
      <v-col>
        <Messages :room="room.messages" :user="room" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'roomid',
  layout: 'main',
  data() {
    return {
      room: '',
    }
  },
  async asyncData({ $axios, route }) {
    let { data } = await $axios.get(`/api/user/chatroom/${route.params.id}`)

    return { room: data, messages: data.messages }
  },
}
</script>

<style lang="scss" scoped></style>
