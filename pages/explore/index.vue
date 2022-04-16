<template>
  <v-container>
    <v-row class="mx-auto">
      <v-col class="" align="end">
        <v-btn
          color="brown lighten-2"
          class="text-center white--text"
          @click="handleCategoryFilter('general')"
        >
          General
        </v-btn>
      </v-col>
      <v-col cols="3" class="" align="center">
        <v-btn
          class="text-center white--text"
          color="blue-grey darken-2"
          @click="handleCategoryFilter('fundamental')"
        >
          Fundamental
        </v-btn>
      </v-col>
      <v-col class="">
        <v-btn
          class="text-center white--text"
          color="teal lighten-2"
          @click="handleCategoryFilter('technical')"
        >
          Technical
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-for="(post, i) in filteredPosts" :key="i">
      <v-col>
        <PostResume :post="post" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'explore-index',
  layout: 'main',
  computed: {
    ...mapGetters({
      posts: 'posts/getPosts',
      filteredPosts: 'posts/getFilteredPosts',
    }),
    category() {
      return this.$store.state.posts.filter.category
    },
  },
  methods: {
    handleCategoryFilter(category) {
      this.$store.dispatch('posts/filterCategory', category)
    },
  },
  async fetch({ store }) {
    await store.dispatch('posts/fetchAllPosts')
  },
  mounted() {
    if (!this.posts.length) {
      this.$store.dispatch('posts/fetchAllPosts')
    }
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
.btn {
  background-color: #112233;
}
</style>
