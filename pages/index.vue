<template>
  <v-row justify="center" align="center">
    <Login />
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'empty',
}
</script>

<style lang="scss">
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
