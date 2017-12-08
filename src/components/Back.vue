<template>
  <div class="back" v-show="$store.state.backview">
    <slot></slot>
    <div class="row">
      <div v-if="hasEventInputs" @mousedown="connectEventInput($event, $parent)" @mouseup="connectEventInput($event, $parent)">
        EventInputs
      </div>
      <div v-if="hasEventOutputs" @mousedown="connectEventOutput($event, $parent)" @mouseup="connectEventOutput($event, $parent)">
        EventOutputs
      </div>
      <div v-if="hasAudioInputs" @mousedown="connectAudioInput($event, $parent)" @mouseup="connectAudioInput($event, $parent)">
        AudioInputs
      </div>
      <div v-if="hasAudioOutputs" @mousedown="connectAudioOutput($event, $parent)" @mouseup="connectAudioOutput($event, $parent)">
        AudioOutputs
      </div>
    </div>
  </div>
</template>

<script>

var selectedEventInput
var selectedEventOutput
var selectedAudioInput
var selectedAudioOutput

export default {
  name: 'Back',
  props: ['hasEventInputs', 'hasEventOutputs', 'hasAudioInputs', 'hasAudioOutputs'],
  data () {
    return {
      outgoingAudioConnections: [],
      incomingAudioConnections: [],
      outgoingEventConnections: [],
      incomingEventConnections: []
    }
  },
  methods: {
    connectEventInput (ev, device) {
      console.log('connectInput', ev, device)
      selectedEventInput = device
      if (ev.type === 'mouseup') {
        this.connectEvent(selectedEventInput, selectedEventOutput)
      }
    },
    connectEventOutput (ev, device) {
      console.log('connectOutput', ev, device)
      selectedEventOutput = device

      if (ev.type === 'mouseup') {
        this.connectEvent(selectedEventInput, selectedEventOutput)
      }
    },
    connectEvent (input, output) {
      if (input && output) {
        if (input !== output) {
          console.log('would connect', input, output)
          output.$on('noteon', ev => {
            input.$emit('noteon', ev)
          })

          output.$on('noteoff', ev => {
            input.$emit('noteoff', ev)
          })

          selectedEventInput = undefined
          selectedEventOutput = undefined
        } else {
          console.log('not connecting an obvious loop', input, output)
        }
      }
    },
    connectAudioInput (ev, device) {
      console.log('connectInput', ev, device)
      selectedAudioInput = device
      if (ev.type === 'mouseup') {
        this.connectAudio(selectedAudioInput, selectedAudioOutput)
      }
    },
    connectAudioOutput (ev, device) {
      console.log('connectOutput', ev, device)
      selectedAudioOutput = device

      if (ev.type === 'mouseup') {
        this.connectAudio(selectedAudioInput, selectedAudioOutput)
      }
    },
    connectAudio (input, output) {
      if (input && output) {
        if (input !== output) {
          console.log('would connect', input, output)
          output.outputNode.connect(input.inputNode)
          selectedAudioInput = undefined
          selectedAudioOutput = undefined
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
