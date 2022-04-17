<template>
  <v-container class="ma-0">
    <v-row class="c1" justify="center" align="center">
      <v-col cols="12" align="center">
        <v-card class="c2 elevation-20 backCard ma-0">
          <v-row class="mx-0 logH">
            <v-col class="logL"></v-col>
            <v-col class="ma-0">
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
.c1 {
  background-image: url(static/backlog.jpg);
  background-size: 100%;
  background-position-y: 60%;
  height: 100vh;
  width: 100vw;
}
.c2 {
  background-color: grey;
  max-width: 1500px;
  height: 60vh;
}
.test1 {
  background-color: blue;
}
.test2 {
  background-color: red;
}
.logH {
  height: 100%;
}
.logL {
  background-image: url(static/logCardLeft.png);
  background-size: contain;
}
.backCard {
  background-image: url(static/backGrande.jpg);
  background-size: cover;
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
