<template>
  <div class="back" v-show="$store.state.backview">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Back'
}
</script>
