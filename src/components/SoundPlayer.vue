<template>
  <div class="soundplayer">
    <front class="gameboy">
      <div class="row">
        <div class="display">
          <div class="row fixed">
            <div v-if="loading" style="flex-grow: 1;">Loading... please wait!</div>
            <ul v-show="!loading" ref="instrumentList" class="instrument-list">
              <li @click="loadInstrument(i)" :class="{active: instrument && instrument.name == i}" v-for="i in availableInstruments" :key="i">
                {{i}}
              </li>
            </ul>
            <p>{{msg}}</p>
          </div>
        </div>
      </div>
      <h1>SoundPlayer</h1>
    </front>
    <back has-event-inputs="true" has-audio-outputs="true">
      Back
    </back>
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
      activenotes: {},
      msg: ''
    }
  },
  mounted () {
    fetch('https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/names.json')
      .then(res => res.json())
      .then(json => {
        this.availableInstruments = json
        this.loadInstrument('bright_acoustic_piano')
      }).catch(err => {
        console.log('errrerd', err)
        this.msg = 'Failed to fetch instruments'
      })

    this.$watch('instrument', i => {
      if (!i) return
      let index = this.availableInstruments.indexOf(i.name)
      let item = this.$refs.instrumentList.children[index]

      console.log(this.$refs.instrumentList)
      this.$refs.instrumentList.scrollTop = item.offsetTop - this.$refs.instrumentList.offsetTop - 50
    })

    this.$on('noteon', this.noteon)
    this.$on('noteoff', this.noteoff)
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
      if (!this.instrument[ev.note.number].source) return
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.soundplayer {
  width: 50%;
  height: 300px;
}

.instrument-list {
  height: 160px;
  overflow: auto;
  width: 100%;
}
li {
  margin-bottom: 0.2em;
  cursor: pointer;
}

li:hover {
  text-decoration: underline;
}
</style>
