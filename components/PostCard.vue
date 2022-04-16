<template>
  <v-container>
    <v-row>
      <v-col> {{ post.title }} </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
