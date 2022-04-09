<template>
  <v-card width="97%" class="mx-auto mt-2" max-width="800px">
    <v-toolbar class="elevation-1">
      <v-text-field
        input
        prepend-icon="mdi-magnify"
        placeholder="Search"
        clearable
        class="input mt-4"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-dialog max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" class="primary px-4">Publish</v-btn>
        </template>
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Legal first name*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Email*" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Password*"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    :items="['0-17', '18-29', '30-54', '54+']"
                    label="Age*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    :items="[
                      'Skiing',
                      'Ice hockey',
                      'Soccer',
                      'Basketball',
                      'Hockey',
                      'Reading',
                      'Writing',
                      'Coding',
                      'Basejump',
                    ]"
                    label="Interests"
                    multiple
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-icon class="px-4">mdi-bell-outline</v-icon>
      <v-avatar color="grey" class="mr-4 px-4" size="45">
        <img :src="this.photo" alt="" />
      </v-avatar>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  name: 'UserBar',
  data() {
    return {
      photo: '',
    }
  },
  async fetch() {
    const user = await this.$axios.$get('/api/user/profile')

    this.photo = user.photo
  },
}
</script>

<style lang="scss" scoped>
.input {
  max-width: 40%;
}
</style>
