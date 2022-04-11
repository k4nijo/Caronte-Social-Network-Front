<template>
  <v-container>
    <v-card class="size mx-auto">
      {{ portData }} {{ counter }}
      <v-row class="size mx-auto">
        <v-tabs>
          <v-col>
            <v-tab to="/portfolio"> Area Chart </v-tab>
          </v-col>
          <v-col>
            <v-tab to="/portfolio/pie"> Pie Chart </v-tab>
          </v-col>
        </v-tabs>
      </v-row>
      <v-row>
        <v-card flat class="mx-auto my-4 size">
          <NuxtChild />
        </v-card>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'portfolio',
  layout: 'main',
  data() {
    return {
      counter: 0,
      timer: '',
      portData: {},
    }
  },
  async asyncData({ $auth, $axios }) {
    const portId = $auth.user.portfolio[0]._id
    const portfolio = await $axios.get(`/api/user/portfolio/${portId}`)

    return { portData: portfolio.data }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.counter++
    }, 2000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
}
</script>

<style lang="scss" scoped>
.size {
  max-width: 800px;
}
</style>
