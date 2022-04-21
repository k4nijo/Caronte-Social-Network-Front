<template>
  <v-container class="size mx-auto pa-0 mt-10">
    <v-card flat class="pa-0">
      <v-row class="mx-0">
        <v-col cols="10"></v-col>
        <v-col align="center" cols="2"
          ><v-btn icon small @click="toRouteBefore"
            ><v-icon class="ml-2">mdi-arrow-left-thin</v-icon></v-btn
          ></v-col
        >
      </v-row>
      <v-row class="pa-0 mx-0 blue-grey lighten-3 pt-10" align="center">
        <v-col cols="12" class="mt-2" align="start">
          <v-avatar size="150" class="avatarBorder"
            ><img :src="this.userInfo.photo" alt=""
          /></v-avatar>
        </v-col>
      </v-row>
      <v-row class="mx-0 ml-2">
        <v-col cols="6" class="titletext texT">
          {{ name }}
          {{ surname }}
        </v-col>
        <v-col align="center" class="" v-show="!following">
          <v-btn small class="primary" @click="follow"> Follow </v-btn>
        </v-col>
        <v-col align="center" v-show="following">
          <v-hover v-slot="{ hover }">
            <v-btn
              small
              :class="hover ? 'red--text' : '#B71C1C'"
              @click="unfollow"
            >
              <span v-if="hover">Unfollow</span><span v-else>Following</span>
            </v-btn>
          </v-hover>
        </v-col>
        <v-col align="center">
          <v-btn small class="primary" @click="toRoom"> Message </v-btn>
        </v-col>
        <v-col align="center">
          <v-dialog
            max-width="800px"
            overlay-opacity="0.8"
            overlay-color="primary"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                class="primary"
                :disabled="suscribed || !userInfo.premium"
                v-bind="attrs"
                v-on="on"
              >
                Subscribe
              </v-btn>
            </template>
            <v-container class="px-0 py-0">
              <v-card class="py-12" max-width="800px">
                <v-row class="mx-0">
                  <v-col
                    cols="12"
                    class="text-center titletext my-4"
                    style="font-size: 20px"
                    >Join {{ this.userInfo.name }}'s community by subscribing to
                    one of these plans</v-col
                  >
                </v-row>
                <v-row justify="space-between" class="mx-0">
                  <v-col class="ml-2" cols="3">
                    <v-card class="elevation-16">
                      <v-row
                        ><v-col class="titletext text-center"
                          >Weekly Plan</v-col
                        ></v-row
                      >
                      <v-row>
                        <v-col class="text-center"> 4,99 $ </v-col>
                      </v-row>
                      <v-row>
                        <v-col align="center">
                          <v-icon x-large color="#58007F">mdi-sail-boat</v-icon>
                        </v-col>
                      </v-row>
                      <v-row
                        ><v-col align="center"
                          ><v-btn class="secondary" @click="checkoutWeek"
                            >Buy</v-btn
                          >
                        </v-col></v-row
                      >
                    </v-card>
                  </v-col>
                  <v-col class="" cols="3"
                    ><v-card class="elevation-16">
                      <v-row class="mx-0"
                        ><v-col class="titletext text-center mx-0 px-0"
                          >Monthly Plan</v-col
                        ></v-row
                      >
                      <v-row>
                        <v-col class="text-center"> 18,99 $ </v-col>
                      </v-row>
                      <v-row>
                        <v-col align="center">
                          <v-icon x-large color="#58007F">mdi-airplane</v-icon>
                        </v-col>
                      </v-row>
                      <v-row
                        ><v-col align="center"
                          ><v-btn class="secondary" @click="checkoutMonth"
                            >Buy</v-btn
                          ></v-col
                        ></v-row
                      >
                    </v-card></v-col
                  >
                  <v-col class="mr-2" cols="3"
                    ><v-card class="elevation-16">
                      <v-row>
                        <v-col class="titletext text-center"
                          >Annual Plan
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="text-center"> 199,99 $ </v-col>
                      </v-row>
                      <v-row>
                        <v-col align="center">
                          <v-icon color="#58007F" x-large
                            >mdi-rocket-launch</v-icon
                          >
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col align="center">
                          <v-btn class="secondary" @click="checkoutYear">
                            Buy
                          </v-btn></v-col
                        >
                      </v-row>
                    </v-card></v-col
                  >
                </v-row>
              </v-card>
            </v-container>
          </v-dialog>
        </v-col>
      </v-row>
      <v-row class="mx-0 ml-2 pt-0 mt-0">
        <v-col> @ {{ this.userInfo.username }} </v-col>
      </v-row>
      <v-row class="mx-0 ml-2">
        <v-col class="">{{ this.userInfo.description }}</v-col>
      </v-row>
      <v-row class="ml-2 mb-1">
        <v-col cols="2">
          <span class="numStyle">{{ this.userInfo.followers.length }}</span>
          Followers</v-col
        >
        <v-col cols="2"
          ><span class="numStyle">{{ this.userInfo.following.length }}</span>
          Following</v-col
        >
        <v-col cols="2"
          ><span class="numStyle">{{ this.userInfo.subscribers.length }}</span>
          Subscribers</v-col
        >
      </v-row>
      <v-divider></v-divider>
      <v-row class="mx-0 my-1">
        <v-col class="" align="end" v-if="this.userInfo.premium">
          <v-icon color="#F9A825" class="mx-auto mt-2">mdi-medal</v-icon>
        </v-col>
        <v-col v-else class="" align="end" cols="6">
          <v-progress-circular
            :rotate="360"
            :size="40"
            :width="4"
            :value="(this.userInfo.influence / premiumLvl) * 100"
            color="secondary"
            class="sizeprog"
          >
            {{ (this.userInfo.influence / premiumLvl) * 100 }}%
          </v-progress-circular>
        </v-col>
        <v-col class="mt-2" align="start">
          {{ this.userInfo.influence }} Points
        </v-col>
      </v-row>
      <v-divider></v-divider>

      <v-row class="mb-0 size ml-1"> </v-row>
      <v-row class="pl-3 mt-10">
        <v-col class="titletext">Latest Contributions</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="mt-8"></v-row>
      <v-row v-for="(post, i) in userInfo.posts" :key="i" no-gutters>
        <v-col>
          <PostResume :post="post" />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'userid',
  layout: 'main',
  data() {
    return {
      userInfo: [],
      premiumLvl: '',
    }
  },
  async asyncData({ $axios, route }) {
    let { data } = await $axios.get(`/api/users/${route.params.id}`)

    return { userInfo: data }
  },
  computed: {
    following() {
      return this.userInfo.followers.some(
        (elem) => elem === this.$auth.user._id
      )
    },
    suscribed() {
      return this.userInfo.subscribers.some(
        (elem) => elem === this.$auth.user._id
      )
    },
    name() {
      return this.userInfo.name.toUpperCase()
    },
    surname() {
      return this.userInfo.surname.toUpperCase()
    },
  },
  methods: {
    async follow() {
      await this.$axios.post(`/api/user/following/${this.userInfo._id}`)
      this.userInfo.followers.push(this.$auth.user._id)
    },
    async unfollow() {
      await this.$axios.delete(`/api/user/following/${this.userInfo._id}`)

      const idx = this.userInfo.followers.findIndex(
        (elem) => elem === this.$auth.user._id
      )
      this.userInfo.followers.splice(idx, 1)
    },
    toRouteBefore() {
      this.$router.back()
    },
    async toRoom() {
      const room = await this.$axios.post(`/api/user/chatroom`, {
        user2: this.userInfo._id,
      })
      this.$router.replace(`/room/${room.data._id}`)
    },
    checkoutWeek() {
      if (this.$stripe) {
        const card = this.$stripe.redirectToCheckout({
          lineItems: [
            {
              price: 'price_1Ko2U8FrLXtApQnILdo2HyTi',
              quantity: 1,
            },
          ],
          mode: 'subscription',
          successUrl: 'https://caronte.netlify.app/home',
          cancelUrl: `https://caronte.netlify.app/users/${this.userInfo._id}`,
        })
      }
    },
    checkoutMonth() {
      if (this.$stripe) {
        const card = this.$stripe.redirectToCheckout({
          lineItems: [
            {
              price: 'price_1Ko2UqFrLXtApQnIRSqnkOeV',
              quantity: 1,
            },
          ],
          mode: 'subscription',
          successUrl: 'https://caronte.netlify.app/home',
          cancelUrl: `https://caronte.netlify.app/users/${this.userInfo._id}`,
        })
      }
    },
    checkoutYear() {
      if (this.$stripe) {
        const card = this.$stripe.redirectToCheckout({
          lineItems: [
            {
              price: 'price_1Ko2VYFrLXtApQnI6DHhZFyK',
              quantity: 1,
            },
          ],
          mode: 'subscription',
          successUrl: 'https://caronte.netlify.app/home',
          cancelUrl: `https://caronte.netlify.app/users/${this.userInfo._id}`,
        })
      }
    },
  },
  mounted() {
    this.premiumLvl = process.env.premiumLvl
  },
}
</script>

<style lang="scss" scoped>
.numStyle {
  font-weight: bold;
}
.titletext {
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  line-height: 30px;
  font-weight: 600;
}
.size {
  max-width: 800px;
}
.sizeprog {
  font-size: 0.9rem;
}
.followbtn:hover {
  background-color: rgb(203, 75, 75);
}
.backG {
  background-color: #f9f9f9;
}
.avatarBorder {
  border: 4px solid white;
}
</style>
