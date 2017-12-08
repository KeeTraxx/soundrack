<template>
  <div class="midiinput">
    <front class="gameboy">
      <h1>Midi devices</h1>
      <ul class="minidisplay">
        <li v-for="input in inputs" v-bind:key="input.id">{{input.name}}</li>
      </ul>
    </front>
    <back ref="back" has-event-outputs="true">
      Back
    </back>
  </div>
</template>

<script>
import WebMidi from 'webmidi'

export default {
  name: 'MidiInput',
  data () {
    return {
      inputs: WebMidi.inputs
    }
  },
  mounted () {
    WebMidi.enable(err => {
      if (err) return console.log(err)
      console.log('WebMidi enabled!')
      WebMidi.addListener('connected', ev => {
        try {
          if (ev.port.type === 'input') {
            ev.port.addListener('noteon', 'all', ev => {
              this.$emit(ev.type, ev)
            })

            ev.port.addListener('noteoff', 'all', ev => {
              this.$emit(ev.type, ev)
            })
          }
        } catch (err) {
          // Do nothing, bug on MidiJS
        }
      })
    })
  }
}
</script>

<style scoped>
.midiinput {
  width: 25%;
  height: 280px;
}
</style>
