<template>
  <div>
    <div class="">
      <v-text-field
        :value="search"
        class=""
        placeholder="Search by Post Title"
        @input="handleSearch"
      />
    </div>
    <div>
      <v-btn class="text-center" @click="handleCategoryFilter('general')">
        General
      </v-btn>
      <v-btn class="text-center" @click="handleCategoryFilter('fundamental')">
        Fundamental
      </v-btn>
      <v-btn class="text-center" @click="handleCategoryFilter('technical')">
        Technical
      </v-btn>
    </div>
  </div>
</template>

<script>
import { debounce } from '~/helpers/index'

export default {
  name: 'PostFilter',
  computed: {
    search() {
      return this.$store.state.posts.filter.search
    },
    category() {
      return this.$store.state.posts.filter.category
    },
  },
  methods: {
    handleSearch: debounce(function (e) {
      this.$store.dispatch('posts/filterSearch', e)
    }, 500),
    handleCategoryFilter(category) {
      this.$store.dispatch('posts/filterCategory', category)
    },
  },
}
</script>

<style lang="scss" scoped></style>
