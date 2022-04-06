<template>
  <v-card width="97%" class="mx-auto mt-2">
    <v-toolbar color="primary">
      <v-icon medium color="white"> mdi-magnify </v-icon>
      <v-text-field
        input
        label="Search"
        placeholder="Search"
        class="mt-6 mx-5"
        background-color="white"
        filled
        rounded
        dense
        clearable
      ></v-text-field>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  name: 'SearchBar',
}
</script>

<style lang="scss" scoped></style>
