<template>
  <div>
    <h1>MIDI Inputs</h1>
    <ul>
      <li v-for="input in inputs" v-bind:key="input.id">{{input.name}}</li>
    </ul>
  </div>
</template>

<script>
import WebMidi from 'webmidi'

export default {
  name: 'MidiInput',
  props: ['output'],
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
