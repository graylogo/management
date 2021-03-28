<template>
  <div class="container">
       <h1>欢迎使用本系统！</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {

    };
  },
  created() {

  },
  methods: {

  }
};
</script>

<style scoped lang="scss">
.container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('../assets/logo.png')  no-repeat ;
    background-size: contain;
    h1{
        font-size: 32px;
    }
}
</style>
