<template>
  <div class="back" v-show="$store.state.backview">
    <slot></slot>
    <div class="row">
      <div v-if="hasEventInputs" @mousedown="connectInput($event, $parent)" @mouseup="connectInput($event, $parent)">
        EventInputs
      </div>
      <div v-if="hasEventOutputs" @mousedown="connectOutput($event, $parent)" @mouseup="connectOutput($event, $parent)">
        EventOutputs
      </div>
      <div v-if="hasAudioInputs" @mousedown="connectInput($event, $parent)" @mouseup="connectInput($event, $parent)">
        AudioInputs
      </div>
      <div v-if="hasAudioOutputs" @mousedown="connectOutput($event, $parent)" @mouseup="connectOutput($event, $parent)">
        AudioOutputs
      </div>
    </div>
  </div>
</template>

<script>

var selectedInput
var selectedOutput

export default {
  name: 'Back',
  props: ['hasEventInputs', 'hasEventOutputs', 'hasAudioInputs', 'hasAudioOutputs'],
  methods: {
    connectInput (ev, device) {
      console.log('connectInput', ev, device)
      selectedInput = device
      if (ev.type === 'mouseup') {
        this.connect(selectedInput, selectedOutput)
      }
    },
    connectOutput (ev, device) {
      console.log('connectOutput', ev, device)
      selectedOutput = device

      if (ev.type === 'mouseup') {
        this.connect(selectedInput, selectedOutput)
      }
    },
    connect (input, output) {
      if (input && output) {
        if (input !== output) {
          console.log('would connect', input, output)
          selectedInput = undefined
          selectedOutput = undefined
        } else {
          console.log('not connecting an obvious loop', input, output)
        }
      }
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
