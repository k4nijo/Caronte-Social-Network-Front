<template>
  <v-container class="d-flex-colum justify-center">
    <v-card
      v-for="(post, i) in feed"
      :key="i"
      class="ma-1 mx-auto elevation-4"
      max-width="800px"
    >
      <div class="title pt-4 ml-3 mr-10">
        <v-avatar color="grey" class="mr-4" size="55"
          ><img :src="post.user.photo" alt="John"
        /></v-avatar>
        <div class="username">{{ post.user.name }} {{ post.user.surname }}</div>
        <div class="ml-2 timeAgo">
          @{{ post.user.username }} ·
          {{ post.timeAgo }}
        </div>
        <v-spacer></v-spacer>
        <v-icon>mdi-dots-horizontal</v-icon>
      </div>

      <div class="title ml-10 mt-4">
        <div class="titletext">{{ post.title }}</div>
        <v-chip
          :color="
            post.category === 'general'
              ? 'brown lighten-2'
              : post.category === 'fundamental'
              ? 'blue-grey darken-2'
              : 'teal lighten-2'
          "
          class="ml-4"
          label
          small
          text-color="white"
        >
          {{ post.category }}
        </v-chip>
      </div>

      <div class="ml-10 my-4 mr-10">
        <div class="contentext">{{ post.summary }}</div>
      </div>

      <div v-if="post.images.length > 0" class="postimg my-1">
        <img class="imgstyle" :src="post.images[0]" alt="" />
      </div>
      <div v-else></div>

      <v-card-actions class="d-flex justify-space-around post">
        <v-btn class="white" depressed
          ><v-icon color="green" class="mr-4">mdi-chevron-up</v-icon>
          {{ post.likes.length }}</v-btn
        >
        <v-btn class="white" depressed
          ><v-icon color="red" class="mr-4">mdi-chevron-down</v-icon
          >{{ post.dislikes.length }}</v-btn
        >
        <v-btn class="white" depressed
          ><v-icon class="mr-4">mdi-comment-multiple-outline</v-icon
          >{{ post.comments.length }}</v-btn
        >
        <v-icon>mdi-bookmark-outline</v-icon>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Feed',
  data() {
    return {
      feed: [],
    }
  },
  async fetch() {
    this.feed = await this.$axios.$get('/api/user/feed?sort=-1')
  },
}
</script>

<style lang="scss" scoped>
.post {
  margin-inline: 8vw;
}
.title {
  display: flex;
  align-items: center;
}
.timeAgo {
  font-size: 14px;
  color: #757575;
}
.postimg {
  display: flex;
  justify-content: center;
}
.imgstyle {
  border-radius: 10px;
  width: 400px;
  height: 200px;
}
</style>
