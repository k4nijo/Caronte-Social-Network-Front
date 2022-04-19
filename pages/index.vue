<template>
  <v-container class="ma-0">
    <v-row class="c3" justify="center" align="center">
      <v-col cols="12" align="center">
        <v-card class="c4 elevation-20 ma-0">
          <v-row class="mx-0 logH">
            <v-col class=""></v-col>
            <v-col class="ma-0" align="center" justify="center">
              <Login />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'empty',
}
</script>

<style lang="scss">
.c3 {
  background-image: url(static/backlog.jpg);
  background-size: 100%;
  background-position-y: 60%;
  height: 100vh;
  width: 100vw;
}
.c4 {
  background-image: url(static/bgbull.jpg);
  background-size: cover;
  background-position-y: 100%;
  max-width: 50vw;
  height: 60vh;
}
.logH {
  height: 100%;
}

//Aqui ponemos las fuentes personalizadas, quitamos scoped
#app {
  @import url('https://fonts.googleapis.com/css2?family=Lora&family=Nunito:wght@300&display=swap');
  div .titletext {
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    line-height: 30px;
  }
  div .contentext {
    font-family: 'Lora', serif;
    font-size: 18px;
    line-height: 20px;
  }
  div .username {
    font-family: 'Nunito', sans-serif;
    font-size: 18px;
    line-height: 30px;
  }
}
</style>
