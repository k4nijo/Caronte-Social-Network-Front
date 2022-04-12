<template>
  <v-snackbar :value.sync="snackToogle">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="blue" text v-bind="attrs" @click="changeStatus">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackBarPost',
  data() {
    return {
      text: 'Post created and added to your profile',
    }
  },
  computed: {
    snackToogle() {
      return this.$store.state.snackbar
    },
  },
  methods: {
    changeStatus() {
      this.$store.commit('toggleSnackbar')
    },
  },
}
</script>

<style lang="scss" scoped></style>
