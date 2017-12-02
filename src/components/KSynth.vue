<template>
  <div>
    <h1>KSynth</h1>
    <div>
      <select v-model="type">
        <option>sine</option>
        <option>square</option>
        <option>sawtooth</option>
        <option>triangle</option>
      </select>
    </div>
  </div>
</template>

<script>

let oscillator

function midi2freq (d) {
  // Taken from https://en.wikipedia.org/wiki/MIDI_tuning_standard#Frequency_values
  return Math.pow(2, (d - 69) / 12) * 440
}

export default {
  name: 'KSynth',
  props: ['output'],
  data () {
    return {
      type: 'sine'
    }
  },
  created () {
  },
  methods: {
    noteon (ev) {
      let gainNode = this.$store.state.audioContext.createGain()
      gainNode.gain.value = ev.velocity
      oscillator = this.$store.state.audioContext.createOscillator()
      oscillator.type = this.type
      oscillator.frequency.value = midi2freq(ev.note.number)
      oscillator.connect(gainNode)
      gainNode.connect(this.output)
      oscillator.start()
    },
    noteoff (ev) {
      oscillator.stop()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
