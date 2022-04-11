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
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            active-class="active"
            v-bind="attrs"
            v-on="on"
            @click="dialog"
            class="primary px-4"
            >Publish</v-btn
          >
        </template>
        <v-card>
          <v-card-text>
            <v-container>
              <v-row class="mt-4">
                <v-col cols="12">
                  <v-text-field
                    counter
                    maxLength="30"
                    label="Title*"
                    v-model="titleContent"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <label for=""> Premium</label>
                  <v-switch
                    :disabled="!user.premium"
                    insent
                    v-model="premium"
                    label="Premium"
                  ></v-switch>
                </v-col>
                <v-col cols="6">
                  <label for="">Category</label>
                  <v-select
                    :items="categories"
                    label="Category*"
                    v-model="pickedCategory"
                    solo
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    counter
                    outlined
                    auto-grow
                    name="input-7-4"
                    label="Content*"
                    maxlength="700"
                    placeholder="Write your message"
                    v-model="postContent"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" class="mx-auto">
                  <v-file-input @change="uploadImage"></v-file-input>
                </v-col>
              </v-row>
              <v-divider></v-divider>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            {{ imageURL }}
            <v-btn
              color="primary"
              :disabled="!postDisabled"
              @click="createPost"
            >
              Publish
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-icon class="px-4">mdi-bell-outline</v-icon>
      <nuxt-link to="/profile">
        <v-avatar color="grey" class="mr-4 px-4" size="45">
          <img :src="user.photo" alt="" />
        </v-avatar>
      </nuxt-link>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  name: 'UserBar',
  data() {
    return {
      photo: '',
      user: {},
      categories: ['general', 'fundamental', 'technical'],
      pickedCategory: '',
      postContent: '',
      titleContent: '',
      imageURL: '',
      premium: false,
      dialog: false,
      searchQuery: '',
    }
  },
  computed: {
    postDisabled() {
      return (
        this.postContent.length > 0 &&
        this.titleContent.length > 0 &&
        this.pickedCategory !== ''
      )
    },
  },
  methods: {
    uploadImage(e) {
      this.imageURL = URL.createObjectURL(e)

      var xhr = new XMLHttpRequest()
      xhr.responseType = 'blob'

      xhr.onload = function () {
        var recoveredBlob = xhr.response

        var reader = new FileReader()

        reader.onload = function () {
          var blobAsDataUrl = reader.result
          window.location = blobAsDataUrl
        }

        reader.readAsDataURL(recoveredBlob)
      }

      xhr.open('GET', this.imageURL)
      xhr.send()
    },
    async createPost() {
      await this.$axios.$post(`/api/post`, {
        title: this.titleContent,
        content: this.postContent,
        category: this.pickedCategory,
        premium: this.premium,
        images: this.imageURL,
      })
      this.dialog = false
      this.$store.commit('toggleSnackbar')
    },
    openDialog() {
      this.dialog = true
    },
  },
  async fetch() {
    const user = await this.$axios.$get('/api/user/profile')

    this.user = user
    this.photo = user.photo
  },
}
</script>

<style lang="scss" scoped>
.input {
  max-width: 40%;
}
.v-btn:focus::before {
  opacity: 0;
}
</style>
