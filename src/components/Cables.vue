<template>
  <svg v-if="$store.state.backview">
    <circle cx="300" cy="300" r="20" />
  </svg>
</template>

<script>
export default {
  name: 'Cables'
}
</script>

<style scoped>
svg {
  position: absolute;
  width: 960px;
  height: 960px;
  pointer-events: none;
}
</style>
