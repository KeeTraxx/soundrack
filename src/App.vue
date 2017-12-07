<template>
  <div id="app">
    <button @click="$store.state.backview = !$store.state.backview">switch view</button>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import 'assets/reset.css';

#app {
  width: 960px;
  margin: 0 auto;
}

html, body {
  margin: 0;
  padding: 0;
}
</style>
