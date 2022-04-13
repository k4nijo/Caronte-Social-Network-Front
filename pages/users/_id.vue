<template>
  <v-container class="size mx-auto pa-0">
    <v-card class="pa-0">
      <v-row class="pa-0 mx-0 backG" align="center">
        <v-col cols="12" class="mt-2" align="center">
          <v-avatar size="150"
            ><img :src="this.userInfo.photo" alt=""
          /></v-avatar>
        </v-col>
      </v-row>
      <v-row class="mx-0 text-center backG" align="center">
        <v-col class="text-center titletext texT">
          {{ this.userInfo.name.toUpperCase() }}
          {{ this.userInfo.surname.toUpperCase() }}
        </v-col>
      </v-row>
      <v-row class="mx-0 text-center pt-0 mt-0 backG">
        <v-col> @ {{ this.userInfo.username }} </v-col>
      </v-row>
      <v-row>
        <v-col class="contentext text-center">{{
          this.userInfo.description
        }}</v-col>
      </v-row>
      <v-row class="mx-0">
        <v-col class="c2" align="center" v-if="this.userInfo.premium">
          <v-icon color="purple" class="mx-auto">mdi-medal</v-icon>
        </v-col>
        <v-col class="text-center">
          {{ this.userInfo.influence }} Points
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col class="text-center pa-2">FOLLOWERS</v-col>
        <v-col class="text-center pa-2">FOLLOWING</v-col>
        <v-col class="text-center pa-2">SUBSCRIBERS</v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">{{ this.userInfo.followers.length }}</v-col>
        <v-col class="text-center">{{ this.userInfo.following.length }}</v-col>
        <v-col class="text-center">{{
          this.userInfo.subscribers.length
        }}</v-col>
      </v-row>
      <v-row class="mb-0 size">
        <v-col align="center">
          <v-btn small class="primary"> Follow </v-btn>
        </v-col>
        <v-col align="center">
          <v-btn small class="primary"> Message </v-btn>
        </v-col>
        <v-col align="center">
          <v-dialog
            max-width="800px"
            overlay-opacity="0.8"
            overlay-color="primary"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn small class="primary" v-bind="attrs" v-on="on">
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
                          >Mensual Plan</v-col
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
      <v-row class="pl-10 mt-10">
        <v-col class="contentext">Latest Contributions</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row></v-row>
      <v-row>
        <v-col>
          <PostResume :feed="userInfo.posts" />
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
    }
  },
  async asyncData({ $axios, route }) {
    let { data } = await $axios.get(`/api/users/${route.params.id}`)

    return { userInfo: data }
  },
  methods: {
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
          successUrl: 'http://localhost:3000/home',
          cancelUrl: 'http://localhost:3000/home',
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
          successUrl: 'http://localhost:3000/home',
          cancelUrl: 'http://localhost:3000/home',
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
          successUrl: 'http://localhost:3000/home',
          cancelUrl: 'http://localhost:3000/home',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.size {
  max-width: 800px;
}
.c1 {
  background-color: green;
}
.c2 {
  background-color: red;
}
.c3 {
  background-color: blue;
}
</style>
