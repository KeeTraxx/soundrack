<template>
  <div class="rack">
    <master ref="master"></master>
    <equalizer :input="$store.state.mixer[0]" :output="$store.state.audioContext.destination"></equalizer>
    <sound-player :output="$store.state.mixer[0]"></sound-player>
    <k-synth ref="soundplayer" :output="$store.state.mixer[0]"></k-synth>
    <midi-input @noteon="$refs.soundplayer.noteon($event)" @noteoff="$refs.soundplayer.noteoff($event)"></midi-input>
    <virtual-keyboard @noteon="$refs.soundplayer.noteon($event)" @noteoff="$refs.soundplayer.noteoff($event)"></virtual-keyboard>
  </div>
</template>

<script>
import Master from './Master'
import MidiInput from './MidiInput'
import SoundPlayer from './SoundPlayer'
import Equalizer from './Equalizer'
import KSynth from './KSynth'
import VirtualKeyboard from './VirtualKeyboard'

export default {
  name: 'Main',
  data () {
    return {
    }
  },
  created () {
    // this.$store.dispatch('loadInstrument', 'acoustic_grand_piano')
  },
  components: {
    Master,
    MidiInput,
    SoundPlayer,
    Equalizer,
    KSynth,
    VirtualKeyboard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url(https://fonts.googleapis.com/css?family=Audiowide);

.rack > div {
  width: 960px;
  margin: 50px 0;
  padding: 24px;
  border-radius: 0.8em;
  background-image: linear-gradient(to bottom, #222, black);
}

h1,
h2,
h3 {
  margin-bottom: 0.5em;
}

h1 {
  font-size: larger;
  margin-bottom: 0.5em;
}

h2 {
  font-size: large;
}

p {
  line-height: 1.5em;
  margin-bottom: 1em;
}

body {
  font-family: "Audiowide", cursive;
  color: green;
  background: black;
}
</style>
