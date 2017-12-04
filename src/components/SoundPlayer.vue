<template>
  <div>
    <h1>SoundPlayer</h1>
    <div class="row">
      <div v-if="loading">Loading... please wait!</div>
      <div v-if="!loading">
        <ul class="instrument-list">
          <li @click="loadInstrument(instrument)" v-for="instrument in availableInstruments" v-bind:key="instrument">
            {{instrument}}
          </li>
        </ul>
      </div>
      <div>
        <h2>Current soundbank</h2>
        <p>{{instrument ? instrument.name : 'N/A'}}</p>
        <h2>Active notes</h2>
        <ul>
          <li v-for="(event, note) in activenotes" v-bind:key="note">
            {{note}} (number: {{event.note.number}} velocity: {{event.rawVelocity}})
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Promise from 'bluebird'

var BASE_URL = 'https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/'
let notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

function octave (n) {
  return ~~((n - 12) / 12)
}

function note (n) {
  return notes[(n - 12) % 12]
}

var soundmap = []

for (let i = 21; i <= 109; i++) {
  soundmap[i] = note(i) + octave(i)
}

export default {
  name: 'SoundPlayer',
  props: ['output'],
  data () {
    return {
      availableInstruments: [],
      instruments: {},
      instrument: undefined,
      loading: false,
      activenotes: {}
    }
  },
  mounted () {
    fetch('https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/names.json')
      .then(res => res.json())
      .then(json => {
        this.availableInstruments = json
        this.loadInstrument('bright_acoustic_piano')
      })
  },
  methods: {
    noteon (ev) {
      if (!this.instrument[ev.note.number]) return
      console.log('noteon', ev)
      let source = this.$store.state.audioContext.createBufferSource()
      let gainNode = this.$store.state.audioContext.createGain()
      gainNode.gain.value = ev.velocity
      source.buffer = this.instrument[ev.note.number].buffer
      source.connect(gainNode)
      gainNode.connect(this.output)
      source.start()
      this.instrument[ev.note.number].source = source
      this.instrument[ev.note.number].gainNode = gainNode
      this.$set(this.activenotes, ev.note.name + ev.note.octave, ev)
    },
    noteoff (ev) {
      if (!this.instrument[ev.note.number]) return
      console.log('noteoff', ev)

      this.instrument[ev.note.number].gainNode.gain.linearRampToValueAtTime(0, this.$store.state.audioContext.currentTime + 0.3)
      this.instrument[ev.note.number].source.stop(this.$store.state.audioContext.currentTime + 0.3)
      Vue.delete(this.activenotes, ev.note.name + ev.note.octave)
    },
    loadInstrument (instrumentName) {
      this.loading = true
      Promise.map(soundmap, v => {
        if (v === undefined) return
        return fetch(BASE_URL + instrumentName + '-mp3/' + v + '.mp3')
          .then(res => res.arrayBuffer())
          .then(buf => this.$store.state.audioContext.decodeAudioData(buf))
          .then(decoded => {
            return {
              buffer: decoded
            }
          }).catch(err => {
            console.log(err)
            return undefined
          })
      }).then(instrument => {
        instrument.name = instrumentName
        this.instruments[instrumentName] = instrument
        this.instrument = instrument
        this.loading = false
        console.log(instrumentName, 'loaded!')
      })
    },
    selectInstrument (index) {
      console.log(index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
  display: flex;
}

.row > div {
  padding: 10px;
}

.instrument-list {
  max-height: 160px;
  overflow: auto;
}
li {
  margin-bottom: 0.2em;
  cursor: pointer;
}

li:hover {
  text-decoration: underline;
}
</style>
