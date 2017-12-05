<template>
  <div class="rack">
    <equalizer class="rack-item" :input="$store.state.mixer[0]" :output="$store.state.audioContext.destination"></equalizer>
    <div class="row">
      <virtual-keyboard style="flex-grow: 1" class="rack-item" :outputs="outputs"></virtual-keyboard>
      <midi-input class="rack-item" :outputs="outputs"></midi-input>
    </div>
    <div class="row">
      <sound-player class="rack-item" ref="soundplayer" :output="$store.state.mixer[0]"></sound-player>
      <k-synth  class="rack-item" ref="ksynth" :output="$store.state.mixer[0]"></k-synth>
    </div>
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
      output: undefined,
      outputs: []
    }
  },
  mounted () {
    this.output = this.$refs.soundplayer
    this.outputs.push(
      {
        name: 'SoundPlayer',
        device: this.$refs.soundplayer
      },
      {
        name: 'KSynth',
        device: this.$refs.ksynth
      })
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

.row {
  display: inline-flex;
  align-items: center;
}

.col {
  display: inline-flex;
  align-items: center;
  flex-direction: column;
}

.rack > div {
  width: 960px;
  margin: 5px 0;
  padding: 10px 10px;
}

.rack-item {
  border: 20px solid pink;
  border-width: 28px 10px 10px 10px;
  border-image-source: url("../assets/img/gb-background.png");
  border-image-slice: 28 164 86 86 fill;
  border-image-width: auto;
  border-image-outset: 0;
  border-image-repeat: stretch;
}

.display {
  color: #0f380f;
  border: 20px solid pink;
  border-width: 23px 42px 22px 43px;
  border-image-source: url("../assets/img/gb-display.png");
  border-image-slice: 41 156 39 60 fill;
  border-image-width: auto;
  border-image-outset: 0;
  border-image-repeat: stretch;
}

.display li {
  cursor: pointer;
}
.display li.active {
  color: #7b8c5a;
  background-color: #0f380f;
}

.minidisplay {
  background-color: #7b8c5a;
  color: #0f380f;
  padding: 0.5em;
  display: inline-block;
  border: 3px inset grey;
  border-radius: 0.3em;
  margin: 0.3em;
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

html,
body {
  height: 100%;
  font-family: "Audiowide", cursive;
  color: #3a2292;
  background-image: linear-gradient(to bottom, #121, #010);
  background-color: #010;
  background-repeat: no-repeat;

  user-select: none;
}
</style>
