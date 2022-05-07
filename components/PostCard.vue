<template>
  <v-container class="px-0">
    <v-card
      max-width="566px"
      min-width="320px"
      class="mx-auto my-1 elevation-0 cardStyle"
    >
      <v-row class="mx-0" align="center">
        <v-col cols="2" class="colwidth">
          <v-avatar>
            <img :src="post.user.photo" alt="" />
          </v-avatar>
        </v-col>
        <v-col align="start"
          ><NuxtLink
            style="text-decoration: none; color: inherit"
            :to="`/users/${post.user._id}`"
          >
            {{ name }}
          </NuxtLink>
          <span v-if="post.user.premium"><v-icon>mdi-medal</v-icon></span>
          <span>@{{ post.user.username }} · {{ post.timeAgo }}</span>
        </v-col>
        <v-col align="center" class="pa-0" cols="2"
          ><v-icon v-if="isMobile">mdi-dots-vertical</v-icon
          ><v-icon v-else>mdi-dots-horizontal</v-icon></v-col
        >
      </v-row>

      <v-row class="mx-0">
        <v-col
          ><v-chip label :color="categoryColor" class="white--text" small>{{
            post.category
          }}</v-chip></v-col
        >
        <v-col>{{ post.premium }}</v-col>
      </v-row>

      <v-row class="mx-0">
        <v-col>{{ post.title }}</v-col>
      </v-row>

      <v-row class="mx-0">
        <v-col>{{ post.summary }}</v-col>
      </v-row>

      <v-row class="mx-0" align="center">
        <v-col align="center"
          ><v-btn icon small><v-icon>mdi-chevron-up</v-icon></v-btn
          >{{ post.likes.length }}</v-col
        >
        <v-col align="center"
          ><v-btn icon small><v-icon>mdi-chevron-down</v-icon></v-btn
          >{{ post.dislikes.length }}</v-col
        >
        <v-col align="center"
          ><v-btn icon small
            ><v-icon>mdi-comment-multiple-outline</v-icon> </v-btn
          >{{ post.comments.length }}</v-col
        >
        <v-col align="center"
          ><v-btn icon small><v-icon>mdi-bookmark</v-icon></v-btn></v-col
        >
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'PostCard',
  props: ['post'],
  data() {
    return {
      isMobile: false,
    }
  },
  computed: {
    name() {
      return `${this.post.user.name} ${this.post.user.surname}`
    },
    categoryColor() {
      return this.post.category === 'fundamental'
        ? 'blue-grey darken-2'
        : this.post.category === 'technical'
        ? 'teal lighten-2'
        : 'brown lighten-2'
    },
  },
  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 600
    },
  },
  mounted() {
    this.onResize()
  },
}
</script>

<style lang="scss" scoped>
.rowcolor {
  background-color: blue;
}
.colcolor1 {
  background-color: yellow;
}
.colcolor2 {
  background-color: green;
}
.colcolor3 {
  background-color: red;
}
.colcolor4 {
  background-color: orange;
}
.colwidth {
  max-width: 55px;
}
</style>
