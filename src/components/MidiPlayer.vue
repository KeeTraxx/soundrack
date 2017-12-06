<template>
  <div ref="midiplayer">
    <ul class="display">
      <li v-for="(output, i) in outputs" :class="{active: output == selectedOutput}" :key="i" @click="selectOutput(output)">{{output.name}}</li>
    </ul>
    <h1>Jingle Bells Player</h1>
    <button @click="play()">Play</button>
    <button @click="stop()">Stop</button>
    <h2>(soon MIDI Player)</h2>
  </div>
</template>

<script>

import midiparser from 'midi-parser-js/src/midi-parser'

let mididata

export default {
  name: 'MidiPlayer',
  props: ['outputs', 'vkeyboard'],
  data () {
    return {
      selectedOutput: undefined,
      playing: false
    }
  },
  methods: {
    selectOutput (output) {
      console.log(output)
      this.selectedOutput = output
    },
    play () {
      this.playing = true
      this.iterateEvent(0)
    },
    stop () {
      this.playing = false
    },
    iterateEvent (index) {
      let event = mididata.track[1].event[index]

      if (this.playing && event) {
        if (event.deltaTime === 0) {
          console.log('emit', event)
          this.emitEvent(index, event)
        } else {
          setTimeout(() => {
            this.emitEvent(index, event)
          }, event.deltaTime / mididata.timeDivision * 250)
        }
      }
    },
    emitEvent (index, event) {
      if (!this.playing) return
      let octave
      switch (event.type) {
        case 9:
          octave = (~~(event.data[0] / 12)) - 2
          this.$emit('noteon', {
            channel: event.channel,
            note: {
              name: '',
              number: event.data[0],
              octave
            },
            rawVelocity: event.data[1],
            target: this.$refs.midiplayer,
            timestamp: this.$store.state.audioContext.currentTime,
            velocity: event.data[1] / 127
          })
          break
        case 8:
          octave = (~~(event.data[0] / 12)) - 2
          this.$emit('noteoff', {
            channel: event.channel,
            note: {
              name: '',
              number: event.data[0],
              octave
            },
            rawVelocity: event.data[1],
            target: this.$refs.midiplayer,
            timestamp: this.$store.state.audioContext.currentTime,
            velocity: event.data[1] / 127
          })
          break
      }
      this.iterateEvent(index + 1)
    }
  },
  mounted () {
    this.$watch('outputs', outs => { this.selectedOutput = outs[0] })
    fetch('static/jingle_bells.mid')
      .then(res => res.arrayBuffer())
      .then(buf => midiparser.parse(new Uint8Array(buf)))
      .then(midi => {
        mididata = midi
        console.log('ready midi')
      })

    this.$on('noteon', ev => {
      if (this.selectedOutput) {
        this.selectedOutput.device.$emit('noteon', ev)
      }
    })

    this.$on('noteoff', ev => {
      if (this.selectedOutput) {
        this.selectedOutput.device.$emit('noteoff', ev)
      }
    })
  }
}
</script>

<style>

</style>
