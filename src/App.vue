<template>
  <div id="app">
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
</style>
