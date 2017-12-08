<template>
  <div class="midiinput">
    <front class="gameboy">
      <ul class="display">
        <li v-for="(output, i) in outputs" :class="{active: output == selectedOutput}" :key="i" @click="selectOutput(output)">{{output.name}}</li>
      </ul>
      <h1>Midi devices</h1>
      <ul class="minidisplay">
        <li v-for="input in inputs" v-bind:key="input.id">{{input.name}}</li>
      </ul>
    </front>
    <back has-outputs="true">
      Back
    </back>
  </div>
</template>

<script>
import WebMidi from 'webmidi'

export default {
  name: 'MidiInput',
  props: ['outputs'],
  data () {
    return {
      inputs: WebMidi.inputs,
      selectedOutput: undefined
    }
  },
  methods: {
    selectOutput (output) {
      console.log(output)
      this.selectedOutput = output
    }
  },
  mounted () {
    this.$watch('outputs', outs => { this.selectedOutput = outs[0] })
    WebMidi.enable(err => {
      if (err) return console.log(err)
      console.log('WebMidi enabled!')
      WebMidi.addListener('connected', ev => {
        try {
          if (ev.port.type === 'input') {
            ev.port.addListener('noteon', 'all', ev => {
              this.$emit(ev.type, ev)
              if (this.selectedOutput) {
                this.selectedOutput.device.$emit(ev.type, ev)
              }
            })

            ev.port.addListener('noteoff', 'all', ev => {
              this.$emit(ev.type, ev)
              if (this.selectedOutput) {
                this.selectedOutput.device.$emit(ev.type, ev)
              }
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
