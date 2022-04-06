<template>
  <v-container class="d-flex-colum justify-center">
    <v-card
      v-for="(post, i) in feed"
      :key="i"
      class="ma-1 elevation-4"
      min-width="60vw"
    >
      <v-card-subtitle>
        <v-avatar color="grey" class="mr-4" size="60"></v-avatar>
        {{ post.user.username }} · {{ post.timeAgo }}
      </v-card-subtitle>
      <v-card-title
        >{{ post.title }} {{ post.premium }}
        <v-chip color="brown lighten-2" label small text-color="white">
          {{ post.category }}
        </v-chip></v-card-title
      >
      <v-card-text>{{ post.summary }}</v-card-text>

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
    this.feed = await this.$axios.$get('/api/user/feed')
  },
}
</script>

<style lang="scss" scoped>
.post {
  margin-inline: 8vw;
}
</style>
