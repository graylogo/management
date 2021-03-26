<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import jwt_decode from 'jwt-decode';
// 在根组件中设置token，保证刷新不会丢失
export default {
  name: 'Vue',
  created() {
    const token = localStorage.getItem('eleToken');
    if (token) {
      const decode = jwt_decode(token);
      this.$store.dispatch('setAuthenticated', !this.isEmpty(decode));
      this.$store.dispatch('setUser', decode);
    }
  },
  methods: {
    isEmpty(val) {
      return (
        val === undefined ||
            val === null ||
            (typeof val === 'object' && Object.keys(val).length === 0) ||
            (typeof val === 'string' && val.trim().length === 0)
      );
    }
  }
};
</script>
<style>
html,
body,
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    margin: 0;
}
</style>
