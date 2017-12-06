<template>
  <div>
    <div class="display">
      <ul>
        <li :class="{active: o == type}" v-for="o in oscillatorTypes" v-bind:key="o" @click="type = o">{{o}}</li>
      </ul>
    </div>
    <h1>KSynth</h1>
  </div>
</template>

<script>
function midi2freq (d) {
  // Taken from https://en.wikipedia.org/wiki/MIDI_tuning_standard#Frequency_values
  return Math.pow(2, (d - 69) / 12) * 440
}

let oscillators = []

export default {
  name: 'KSynth',
  props: ['output'],
  data () {
    return {
      type: 'sine',
      oscillatorTypes: ['sine', 'square', 'sawtooth', 'triangle']
    }
  },
  mounted () {
    this.$on('noteon', this.noteon)
    this.$on('noteoff', this.noteoff)
  },
  methods: {
    noteon (ev) {
      if (oscillators[ev.note.number]) {
        oscillators[ev.note.number].stop()
      }
      let gainNode = this.$store.state.audioContext.createGain()
      gainNode.gain.value = ev.velocity
      oscillators[ev.note.number] = this.$store.state.audioContext.createOscillator()
      oscillators[ev.note.number].type = this.type
      oscillators[ev.note.number].frequency.value = midi2freq(ev.note.number)
      oscillators[ev.note.number].connect(gainNode)
      gainNode.connect(this.output)
      oscillators[ev.note.number].start()
    },
    noteoff (ev) {
      if (oscillators[ev.note.number]) {
        oscillators[ev.note.number].stop()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
