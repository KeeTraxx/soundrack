<template>
  <div class="back" v-show="$store.state.backview">
    <slot></slot>
    <div class="row">
      <div v-if="hasInputs" @mousedown="connectInput($event, $parent)" @mouseup="connectInput($event, $parent)">
        Inputs
      </div>
      <div  v-if="hasOutputs" @mousedown="connectOutput($event, $parent)" @mouseup="connectOutput($event, $parent)">
        Outputs
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Back',
  props: ['hasInputs', 'hasOutputs'],
  methods: {
    connectInput (ev, device) {
      console.log('connectInput', ev, device)
    },
    connectOutput (ev, device) {
      console.log('connectOutput', ev, device)
    }
  }

}
</script>

<style scoped>
.row > * {
  flex-grow: 1;
  align-items: stretch;
}
.row {
  flex-grow: 1;
}
</style>
