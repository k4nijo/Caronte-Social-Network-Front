<template>
  <div>
    <v-dialog
      scrollable
      overlay-color="primary"
      overlay-opacity="0.9"
      width="800px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-card
          v-bind="attrs"
          v-on="on"
          v-for="(post, i) in feed"
          :key="i"
          class="ma-1 mx-auto elevation-2 card"
          max-width="800px"
          height="100%"
          @click="openPost(i)"
          :ripple="{ class: 'blue-grey--text text--lighten-5' }"
        >
          <div class="title pt-4 ml-3 mr-10">
            <v-avatar color="grey" class="mr-4" size="55"
              ><img :src="post.user.photo" alt="John"
            /></v-avatar>
            <div class="username">
              <NuxtLink
                style="text-decoration: none; color: inherit"
                :to="`/users/${post.user._id}`"
                >{{ post.user.name }} {{ post.user.surname }}</NuxtLink
              >
            </div>
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

          <div
            v-if="post.images[0] !== '' && post.images.length > 0"
            class="postimg my-1"
          >
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
                @click.stop="like(post, i)"
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
                @click.stop="dislike(post, i)"
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
                ><v-icon color="grey darken-2"
                  >mdi-comment-multiple-outline</v-icon
                >
              </v-btn>
              {{ post.comments.length }}
            </div>

            <v-btn icon @click.stop="toBookmarks(post, i)">
              <div
                v-if="post.bookedTimes.some((elem) => elem === $auth.user._id)"
              >
                <v-icon color="teal darken-3">mdi-bookmark</v-icon>
              </div>
              <div v-else>
                <v-icon>mdi-bookmark-outline</v-icon>
              </div>
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
      <v-card class="ma-1 mx-auto elevation-4 card" height="100%">
        <div class="title pt-4 ml-3 mr-10">
          <div class="title pt-4 ml-3 mr-10">
            <v-avatar color="grey" class="mr-4" size="55"
              ><img :src="user.photo" alt="John"
            /></v-avatar>
            <div class="username">{{ user.name }} {{ user.surname }}</div>
            <div class="ml-2 timeAgo">
              @{{ user.username }} ·
              {{ postOpen.timeAgo }}
            </div>
          </div>
          <v-spacer></v-spacer>
          <v-btn icon small>
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </div>
        <div class="title ml-10 mt-4">
          <div class="titletext">{{ postOpen.title }}</div>
          <v-chip
            :color="
              postOpen.category === 'general'
                ? 'brown lighten-2'
                : postOpen.category === 'fundamental'
                ? 'blue-grey darken-2'
                : 'teal lighten-2'
            "
            class="ml-4"
            label
            small
            text-color="white"
          >
            {{ postOpen.category }}
          </v-chip>
        </div>
        <div class="ml-10 my-4 mr-10">
          <div class="contentext">{{ postOpen.content }}</div>
        </div>
        <div
          v-if="postOpenImages[0] !== '' && postOpenImages.length > 0"
          class="postimg my-1"
        >
          <img class="imgstyle" :src="postOpen.images[0]" alt="" />
        </div>
        <div v-else></div>
        <v-divider></v-divider>
        <v-card-actions class="d-flex justify-space-around post">
          <div class="btnNum">
            <v-btn
              small
              icon
              :class="
                postOpenLikes.some((elem) => elem === $auth.user._id)
                  ? 'green lighten-2'
                  : 'white'
              "
              depressed
              @click.stop="likeInd(postOpen, postOpenLikes)"
              ><v-icon
                :color="
                  postOpenLikes.some((elem) => elem === $auth.user._id)
                    ? 'white'
                    : 'green'
                "
                >mdi-chevron-up</v-icon
              >
            </v-btn>
            {{ postOpenLikes.length }}
          </div>

          <div class="btnNum">
            <v-btn
              small
              icon
              :class="
                postOpenDislikes.some((elem) => elem === $auth.user._id)
                  ? 'red lighten-2'
                  : 'white'
              "
              depressed
              @click.stop="dislikeInd(postOpen, postOpenDislikes)"
              ><v-icon
                :color="
                  postOpenDislikes.some((elem) => elem === $auth.user._id)
                    ? 'white'
                    : 'red'
                "
                >mdi-chevron-down</v-icon
              >
            </v-btn>
            {{ postOpenDislikes.length }}
          </div>

          <div>
            <v-btn class="white" icon depressed
              ><v-icon color="grey darken-2"
                >mdi-comment-multiple-outline</v-icon
              >
            </v-btn>
            {{ postOpenComments.length }}
          </div>

          <v-btn
            icon
            @click.stop="toBookmarksInd(postOpen, postOpenBookedTimes)"
          >
            <div
              v-if="postOpenBookedTimes.some((elem) => elem === $auth.user._id)"
            >
              <v-icon color="teal darken-3">mdi-bookmark</v-icon>
            </div>
            <div v-else>
              <v-icon>mdi-bookmark-outline</v-icon>
            </div>
          </v-btn>
        </v-card-actions>
        <v-divider></v-divider>
        <div class="title py-6 ml-5 mr-10">
          <v-avatar color="grey" class="mr-4" size="45"
            ><img :src="$auth.user.photo" alt="John"
          /></v-avatar>
          <v-expansion-panels flat class="mid">
            <v-expansion-panel>
              <v-expansion-panel-header>
                <template v-slot:default="{ open }">
                  <v-row no-gutters>
                    <v-col cols="8" class="text--secondary">
                      <v-fade-transition leave-absolute>
                        <span v-if="open" key="0">
                          Replying to @{{ user.username }}
                        </span>
                        <span v-else key="1"> Write your reply </span>
                      </v-fade-transition>
                    </v-col>
                  </v-row>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-text-field
                  v-model="commentContent"
                  placeholder="Write a comment"
                ></v-text-field>
                <v-divider></v-divider>
                <v-container class="mt-2">
                  <v-row>
                    <v-spacer></v-spacer>
                    <div class="text-center mr-2">
                      <v-progress-circular
                        color="secondary"
                        :value="commentContent.length / 1.5"
                      ></v-progress-circular>
                    </div>
                    <v-btn
                      :disabled="!isDisabled"
                      class="primary"
                      @click="reply(postOpen)"
                      >Reply</v-btn
                    >
                  </v-row>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <v-divider></v-divider>
        <div class="username ml-10 my-4">
          {{ postOpenComments.length }} Comments
        </div>
        <div
          class="my-2 ml-5"
          flat
          v-for="(comment, i) in postOpenComments"
          :key="i"
        >
          <div class="title pt-4 ml-3 mr-10">
            <v-avatar color="grey" class="mr-4" size="45"
              ><img :src="comment.user.photo" alt="John"
            /></v-avatar>
            <div class="username">
              {{ comment.user.name }} {{ comment.user.surname }}
            </div>
            <div class="ml-2 timeAgo">@{{ comment.user.username }} ·</div>
          </div>
          <div class="contentext comment mx-15 my-4">
            {{ comment.content }}
          </div>
          <div class="d-flex justify-space-around post">
            <div class="btnNum">
              <v-btn
                small
                icon
                :class="
                  postOpenComments[i].likes.some(
                    (elem) => elem === $auth.user._id
                  )
                    ? 'green lighten-2'
                    : 'white'
                "
                depressed
                @click.stop="commentLike(postOpen, postOpenComments, i)"
                ><v-icon
                  :color="
                    postOpenComments[i].likes.some(
                      (elem) => elem === $auth.user._id
                    )
                      ? 'white'
                      : 'green'
                  "
                  >mdi-chevron-up</v-icon
                >
              </v-btn>
              {{ comment.likes.length }}
            </div>

            <div class="btnNum">
              <v-btn
                small
                icon
                :class="
                  postOpenComments[i].disLikes.some(
                    (elem) => elem === $auth.user._id
                  )
                    ? 'red lighten-2'
                    : 'white'
                "
                depressed
                @click.stop="commentDislike(postOpen, postOpenComments, i)"
                ><v-icon
                  :color="
                    postOpenComments[i].disLikes.some(
                      (elem) => elem === $auth.user._id
                    )
                      ? 'white'
                      : 'red'
                  "
                  >mdi-chevron-down</v-icon
                >
              </v-btn>
              {{ comment.disLikes.length }}
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'PostResume',
  props: ['feed'],
  data() {
    return {
      postOpen: [],
      user: [],
      postOpenImages: [],
      postOpenLikes: [],
      postOpenDislikes: [],
      postOpenComments: [],
      postOpenBookedTimes: [],
      commentContent: '',
    }
  },
  computed: {
    isDisabled() {
      let content = this.commentContent.length > 0
      return content
    },
  },
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
    async openPost(idx) {
      this.postOpen = await this.$axios.$get(`/api/post/${this.feed[idx]._id}`)
      this.user = this.postOpen.user
      this.postOpenImages = this.postOpen.images
      this.postOpenLikes = this.postOpen.likes
      this.postOpenDislikes = this.postOpen.dislikes
      this.postOpenComments = this.postOpen.comments
      this.postOpenBookedTimes = this.postOpen.bookedTimes
    },
    async likeInd(post, postLike) {
      if (postLike.some((elem) => elem === this.$auth.user._id)) {
        await this.$axios.$put(`/api/post/${post._id}`, {
          likes: this.$auth.user._id,
        })
        const userIdx = postLike.findIndex(
          (elem) => elem._id === this.$auth.user._id
        )
        postLike.splice(userIdx, 1)

        const idx = this.feed.findIndex((elem) => elem._id === post._id)
        this.feed[idx].likes.splice(idx, 1)
      } else {
        if (
          this.postOpenDislikes.some((elem) => elem === this.$auth.user._id)
        ) {
          await this.$axios.$put(`/api/post/${post._id}`, {
            dislikes: this.$auth.user._id,
          })
          const userIdx = this.postOpenDislikes.findIndex(
            (elem) => elem._id === this.$auth.user._id
          )
          this.postOpenDislikes.splice(userIdx, 1)
          const idx = this.feed.findIndex((elem) => elem._id === post._id)
          this.feed[idx].dislikes.splice(idx, 1)
        }
        await this.$axios.$put(`/api/post/${post._id}`, {
          likes: this.$auth.user._id,
        })
        postLike.push(this.$auth.user._id)

        const idx = this.feed.findIndex((elem) => elem._id === post._id)
        this.feed[idx].likes.push(this.$auth.user._id)
      }
    },
    async dislikeInd(post, postDislike) {
      if (postDislike.some((elem) => elem === this.$auth.user._id)) {
        await this.$axios.$put(`/api/post/${post._id}`, {
          dislikes: this.$auth.user._id,
        })
        const userIdx = postDislike.findIndex(
          (elem) => elem._id === this.$auth.user._id
        )
        postDislike.splice(userIdx, 1)

        const idx = this.feed.findIndex((elem) => elem._id === post._id)
        this.feed[idx].dislikes.splice(idx, 1)
      } else {
        if (this.postOpenLikes.some((elem) => elem === this.$auth.user._id)) {
          await this.$axios.$put(`/api/post/${post._id}`, {
            likes: this.$auth.user._id,
          })
          const userIdx = this.postOpenLikes.findIndex(
            (elem) => elem._id === this.$auth.user._id
          )
          this.postOpenLikes.splice(userIdx, 1)
          const idx = this.feed.findIndex((elem) => elem._id === post._id)
          this.feed[idx].likes.splice(idx, 1)
        }
        await this.$axios.$put(`/api/post/${post._id}`, {
          dislikes: this.$auth.user._id,
        })
        postDislike.push(this.$auth.user._id)

        const idx = this.feed.findIndex((elem) => elem._id === post._id)
        this.feed[idx].dislikes.push(this.$auth.user._id)
      }
    },
    async toBookmarksInd(post, postBooked) {
      if (
        this.postOpenBookedTimes.some((elem) => elem === this.$auth.user._id)
      ) {
        await this.$axios.$put(`/api/post/${post._id}`, {
          bookedTimes: this.$auth.user._id,
        })
        const userIdx = postBooked.findIndex(
          (elem) => elem._id === this.$auth.user._id
        )
        postBooked.splice(userIdx, 1)
        const idx = this.feed.findIndex((elem) => elem._id === post._id)
        this.feed[idx].bookedTimes.splice(userIdx, 1)
      } else {
        await this.$axios.$put(`/api/post/${post._id}`, {
          bookedTimes: this.$auth.user._id,
        })
        postBooked.push(this.$auth.user._id)
        const idx = this.feed.findIndex((elem) => elem._id === post._id)
        this.feed[idx].bookedTimes.push(this.$auth.user._id)
      }
    },
    async commentLike(post, comment, i) {
      if (comment[i].likes.some((elem) => elem === this.$auth.user._id)) {
        await this.$axios.$put(
          `/api/post/${post._id}/comments/${comment[i]._id}`,
          {
            likes: this.$auth.user._id,
          }
        )
        const userIdx = comment[i].likes.findIndex(
          (elem) => elem._id === this.$auth.user._id
        )
        comment[i].likes.splice(userIdx, 1)
      } else {
        if (comment[i].disLikes.some((elem) => elem === this.$auth.user._id)) {
          await this.$axios.$put(
            `/api/post/${post._id}/comments/${comment[i]._id}`,
            {
              disLikes: this.$auth.user._id,
            }
          )
          const userIdx = comment[i].disLikes.findIndex(
            (elem) => elem._id === this.$auth.user._id
          )
          comment[i].disLikes.splice(userIdx, 1)
        }
        await this.$axios.$put(
          `/api/post/${post._id}/comments/${comment[i]._id}`,
          {
            likes: this.$auth.user._id,
          }
        )
        comment[i].likes.push(this.$auth.user._id)
      }
    },
    async commentDislike(post, comment, i) {
      if (comment[i].disLikes.some((elem) => elem === this.$auth.user._id)) {
        await this.$axios.$put(
          `/api/post/${post._id}/comments/${comment[i]._id}`,
          {
            disLikes: this.$auth.user._id,
          }
        )
        const userIdx = comment[i].disLikes.findIndex(
          (elem) => elem._id === this.$auth.user._id
        )
        comment[i].disLikes.splice(userIdx, 1)
      } else {
        if (comment[i].likes.some((elem) => elem === this.$auth.user._id)) {
          await this.$axios.put(
            `/api/post/${post._id}/comments/${comment[i]._id}`,
            {
              likes: this.$auth.user._id,
            }
          )
          const userIdx = comment[i].likes.findIndex(
            (elem) => elem._id === this.$auth.user._id
          )
          comment[i].likes.splice(userIdx, 1)
        }
        await this.$axios.$put(
          `/api/post/${post._id}/comments/${comment[i]._id}`,
          {
            disLikes: this.$auth.user._id,
          }
        )
        comment[i].disLikes.push(this.$auth.user._id)
      }
    },
    async reply(post) {
      const comment = await this.$axios.$post(
        `/api/post/${post._id}/comments`,
        {
          content: this.commentContent,
        }
      )
      const idx = this.feed.findIndex((elem) => elem._id === post._id)
      this.commentContent = ''
      this.postOpenComments.push(comment)
      this.feed[idx].comments.push(comment)
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
.comment {
  font-size: 14px;
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
.card:hover {
  background-color: rgb(251, 251, 251);
}
.v-card--link:focus::before {
  opacity: 0;
}
.mid {
  width: 90%;
}
// ::v-deep .v-dialog {
//   overflow-y: hidden;
// }
</style>
