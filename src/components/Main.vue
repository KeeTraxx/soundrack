<template>
  <div class="rack">
    <equalizer :input="$store.state.mixer[0]" :output="$store.state.audioContext.destination"></equalizer>
    <sound-player :output="$store.state.mixer[0]"></sound-player>
    <k-synth ref="soundplayer" :output="$store.state.mixer[0]"></k-synth>
    <midi-input @noteon="$refs.soundplayer.noteon($event)" @noteoff="$refs.soundplayer.noteoff($event)"></midi-input>
    <virtual-keyboard @noteon="$refs.soundplayer.noteon($event)" @noteoff="$refs.soundplayer.noteoff($event)"></virtual-keyboard>
  </div>
</template>

<script>
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
  border: 20px solid pink;
  border-width: 28px 10px 10px 10px;
  border-image-source: url('/static/img/gb-background.png');
  border-image-slice: 28 164 86 86 fill;
  border-image-width: auto;
  border-image-outset: 0;
  border-image-repeat: stretch;

  margin: 24px 0;
}

.display {
  border: 20px solid pink;
  border-width: 23px 42px 22px 43px;
  border-image-source: url('/static/img/gb-display.png');
  border-image-slice: 41 156 39 60 fill;
  border-image-width: auto;
  border-image-outset: 0;
  border-image-repeat: stretch;
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

html, body {
  height: 100%;
  font-family: "Audiowide", cursive;
  color: #3a2292;
  background-image: linear-gradient(to bottom, #121, #010); 
  background-repeat: no-repeat;
}
</style>
