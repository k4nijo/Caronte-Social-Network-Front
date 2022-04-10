<template>
  <v-snackbar :value.sync="snackToogle" timeout="2000"> {{ text }} </v-snackbar>
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
}
</script>

<style lang="scss" scoped></style>
