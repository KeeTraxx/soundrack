<template>
  <div class="front" v-show="!$store.state.backview">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Front'
}
</script>
