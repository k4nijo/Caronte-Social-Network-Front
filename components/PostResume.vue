<template>
  <div>
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
        <v-btn icon small>
          <v-icon>mdi-dots-horizontal</v-icon>
        </v-btn>
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
        <div class="btnNum">
          <v-btn
            small
            icon
            :class="
              post.likes.some((elem) => elem === $auth.user._id)
                ? 'green lighten-2'
                : 'white'
            "
            depressed
            @click="like(post, i)"
            ><v-icon
              :color="
                post.likes.some((elem) => elem === $auth.user._id)
                  ? 'white'
                  : 'green'
              "
              >mdi-chevron-up</v-icon
            >
          </v-btn>
          {{ post.likes.length }}
        </div>

        <div class="btnNum">
          <v-btn
            small
            icon
            :class="
              post.dislikes.some((elem) => elem === $auth.user._id)
                ? 'red lighten-2'
                : 'white'
            "
            depressed
            @click="dislike(post, i)"
            ><v-icon
              :color="
                post.dislikes.some((elem) => elem === $auth.user._id)
                  ? 'white'
                  : 'red'
              "
              >mdi-chevron-down</v-icon
            >
          </v-btn>
          {{ post.dislikes.length }}
        </div>

        <div>
          <v-btn class="white" icon depressed
            ><v-icon color="grey darken-2">mdi-comment-multiple-outline</v-icon>
          </v-btn>
          {{ post.comments.length }}
        </div>

        <v-btn icon @click="toBookmarks(post, i)">
          <div v-if="post.bookedTimes.some((elem) => elem === $auth.user._id)">
            <v-icon color="teal darken-3">mdi-bookmark</v-icon>
          </div>
          <div v-else>
            <v-icon>mdi-bookmark-outline</v-icon>
          </div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'PostResume',
  props: ['feed'],
  methods: {
    async like(post, idx) {
      if (post.likes.some((elem) => elem === this.$auth.user._id)) {
        await this.$axios.$put(`/api/post/${this.feed[idx]._id}`, {
          likes: this.$auth.user._id,
        })
        const userIdx = post.likes.findIndex(
          (elem) => elem === this.$auth.user._id
        )
        this.feed[idx].likes.splice(userIdx, 1)
      } else {
        if (post.dislikes.some((elem) => elem === this.$auth.user._id)) {
          await this.$axios.$put(`/api/post/${this.feed[idx]._id}`, {
            dislikes: this.$auth.user._id,
          })
          const userIdx = post.dislikes.findIndex(
            (elem) => elem === this.$auth.user._id
          )
          this.feed[idx].dislikes.splice(userIdx, 1)
        }
        await this.$axios.$put(`/api/post/${this.feed[idx]._id}`, {
          likes: this.$auth.user._id,
        })
        this.feed[idx].likes.push(this.$auth.user._id)
      }
    },
    async dislike(post, idx) {
      if (post.dislikes.some((elem) => elem === this.$auth.user._id)) {
        await this.$axios.$put(`/api/post/${this.feed[idx]._id}`, {
          dislikes: this.$auth.user._id,
        })
        const userIdx = post.dislikes.findIndex(
          (elem) => elem === this.$auth.user._id
        )
        this.feed[idx].dislikes.splice(userIdx, 1)
      } else {
        if (post.likes.some((elem) => elem === this.$auth.user._id)) {
          await this.$axios.$put(`/api/post/${this.feed[idx]._id}`, {
            likes: this.$auth.user._id,
          })
          const userIdx = post.likes.findIndex(
            (elem) => elem === this.$auth.user._id
          )
          this.feed[idx].likes.splice(userIdx, 1)
        }
        await this.$axios.$put(`/api/post/${this.feed[idx]._id}`, {
          dislikes: this.$auth.user._id,
        })
        this.feed[idx].dislikes.push(this.$auth.user._id)
      }
    },
    async toBookmarks(post, idx) {
      if (post.bookedTimes.some((elem) => elem === this.$auth.user._id)) {
        await this.$axios.$put(`/api/post/${this.feed[idx]._id}`, {
          bookedTimes: this.$auth.user._id,
        })
        const userIdx = post.bookedTimes.findIndex(
          (elem) => elem === this.$auth.user._id
        )
        this.feed[idx].bookedTimes.splice(userIdx, 1)
      } else {
        await this.$axios.$put(`/api/post/${this.feed[idx]._id}`, {
          bookedTimes: this.$auth.user._id,
        })
        this.feed[idx].bookedTimes.push(this.$auth.user._id)
      }
    },
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
.btnNum {
  font-size: 14px;
}
</style>
