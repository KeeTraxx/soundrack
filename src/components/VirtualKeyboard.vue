<template>
  <div class="virtualkeyboard">
    <front class="gameboy">
      <div class="row">
        <ul class="display">
          <li v-for="(output, i) in outputs" :class="{active: output == selectedOutput}" :key="i" @click="selectOutput(output)">{{output.name}}</li>
        </ul>
        <div class="row">
          <div>Octave:</div>
          <div class="row">
            <button @click="octave > 0 && octave--">Down</button>
            <div class="minidisplay">{{octave}}</div>
            <button @click="octave < 10 && octave++">Up</button>
          </div>
          <p>Keyboard: 'C' = Note C</p>
        </div>
      </div>
      <div class="keyboard">
        <div v-for="i in [1,2,3]" :key="i" class="octave">
          <div class="keys">
            <div class="C" :class="{active: noteActive[octave*12+i*12+0]}" @mousedown="down($event, i*12+0)" @mouseup="up($event, i*12+0)" @mouseover="down($event, i*12+0)" @mouseout="up($event, i*12+0)">
              <div class="text-bottom">C</div>
            </div>
            <div class="Db black" :class="{active: noteActive[octave*12+i*12+1]}" @mousedown="down($event, i*12+1)" @mouseup="up($event, i*12+1)" @mouseover="down($event, i*12+1)" @mouseout="up($event, i*12+1)">
              <div class="text-bottom">Db</div>
            </div>
            <div class="D" :class="{active: noteActive[octave*12+i*12+2]}" @mousedown="down($event, i*12+2)" @mouseup="up($event, i*12+2)" @mouseover="down($event, i*12+2)" @mouseout="up($event, i*12+2)">
              <div class="text-bottom">D</div>
            </div>
            <div class="Eb black" :class="{active: noteActive[octave*12+i*12+3]}" @mousedown="down($event, i*12+3)" @mouseup="up($event, i*12+3)" @mouseover="down($event, i*12+3)" @mouseout="up($event, i*12+3)">
              <div class="text-bottom">Eb</div>
            </div>
            <div class="E" :class="{active: noteActive[octave*12+i*12+4]}" @mousedown="down($event, i*12+4)" @mouseup="up($event, i*12+4)" @mouseover="down($event, i*12+4)" @mouseout="up($event, i*12+4)">
              <div class="text-bottom">E</div>
            </div>
            <div class="F" :class="{active: noteActive[octave*12+i*12+5]}" @mousedown="down($event, i*12+5)" @mouseup="up($event, i*12+5)" @mouseover="down($event, i*12+5)" @mouseout="up($event, i*12+5)">
              <div class="text-bottom">F</div>
            </div>
            <div class="Gb black" :class="{active: noteActive[octave*12+i*12+6]}" @mousedown="down($event, i*12+6)" @mouseup="up($event, i*12+6)" @mouseover="down($event, i*12+6)" @mouseout="up($event, i*12+6)">
              <div class="text-bottom">Gb</div>
            </div>
            <div class="G" :class="{active: noteActive[octave*12+i*12+7]}" @mousedown="down($event, i*12+7)" @mouseup="up($event, i*12+7)" @mouseover="down($event, i*12+7)" @mouseout="up($event, i*12+7)">
              <div class="text-bottom">G</div>
            </div>
            <div class="Ab black" :class="{active: noteActive[octave*12+i*12+8]}" @mousedown="down($event, i*12+8)" @mouseup="up($event, i*12+8)" @mouseover="down($event, i*12+8)" @mouseout="up($event, i*12+8)">
              <div class="text-bottom">Ab</div>
            </div>
            <div class="A" :class="{active: noteActive[octave*12+i*12+9]}" @mousedown="down($event, i*12+9)" @mouseup="up($event, i*12+9)" @mouseover="down($event, i*12+9)" @mouseout="up($event, i*12+9)">
              <div class="text-bottom">A</div>
            </div>
            <div class="Bb black" :class="{active: noteActive[octave*12+i*12+10]}" @mousedown="down($event, i*12+10)" @mouseup="up($event, i*12+10)" @mouseover="down($event, i*12+10)" @mouseout="up($event, i*12+10)">
              <div class="text-bottom">Bb</div>
            </div>
            <div class="B" :class="{active: noteActive[octave*12+i*12+11]}" @mousedown="down($event, i*12+11)" @mouseup="up($event, i*12+11)" @mouseover="down($event, i*12+11)" @mouseout="up($event, i*12+11)">
              <div class="text-bottom">B</div>
            </div>
          </div>
        </div>
      </div>
    </front>
    <back>
      Back
    </back>
  </div>
</template>

<script>
let noteActive = {}
for (let i = 0; i < 128; i++) {
  noteActive[i] = false
}

function key2offset (ev) {
  let transpose = ev.shiftKey ? 24 : 12
  switch (ev.code) {
    case 'KeyA':
      return 8 + transpose
    case 'KeyZ':
      return 9 + transpose
    case 'KeyS':
      return 10 + transpose
    case 'KeyX':
      return 11 + transpose
    case 'KeyC':
      return 12 + transpose
    case 'KeyF':
      return 13 + transpose
    case 'KeyV':
      return 14 + transpose
    case 'KeyG':
      return 15 + transpose
    case 'KeyB':
      return 16 + transpose
    case 'KeyN':
      return 17 + transpose
    case 'KeyJ':
      return 18 + transpose
    case 'KeyM':
      return 19 + transpose
    case 'KeyK':
      return 20 + transpose
    case 'Comma':
      return 21 + transpose
    case 'KeyL':
      return 22 + transpose
    case 'Period':
      return 23 + transpose
    case 'Slash':
      return 24 + transpose
    case 'Quote':
      return 25 + transpose
    default:
      return undefined
  }
}

export default {
  name: 'VirtualKeyboard',
  props: ['outputs'],
  data () {
    return {
      octave: 4,
      selectedOutput: undefined,
      noteActive: noteActive
    }
  },
  mounted () {
    this.$watch('outputs', outs => { this.selectedOutput = outs[0] })
    window.addEventListener('keydown', (ev) => {
      let offset = key2offset(ev)
      if (!offset) return
      this.$emit('noteon', {
        channel: 1,
        note: {
          name: '',
          number: this.octave * 12 + offset,
          octave: this.octave
        },
        rawVelocity: 127,
        target: undefined,
        timestamp: this.$store.state.audioContext.currentTime,
        velocity: 1
      })
    })

    window.addEventListener('keyup', (ev) => {
      let offset = key2offset(ev)
      if (!offset) return
      this.$emit('noteoff', {
        channel: 1,
        note: {
          name: '',
          number: this.octave * 12 + offset,
          octave: this.octave
        },
        rawVelocity: 127,
        target: undefined,
        timestamp: this.$store.state.audioContext.currentTime,
        velocity: 1
      })
    })

    this.$on('noteon', ev => {
      this.noteActive[ev.note.number] = true
      // scroll to view if outside
      console.log(ev.note.octave)
      if (ev.note.octave + 1 < this.octave) {
        this.octave = ev.note.octave + 1
      } else if (ev.note.octave + 2 > this.octave + 3) {
        this.octave = ev.note.octave - 1
      }

      if (this.selectedOutput) {
        this.selectedOutput.device.noteon(ev)
      }
    })

    this.$on('noteoff', ev => {
      this.noteActive[ev.note.number] = false
      if (this.selectedOutput) {
        this.selectedOutput.device.noteoff(ev)
      }
    })
  },
  methods: {
    selectOutput (output) {
      this.selectedOutput = output
    },
    down (ev, offset) {
      if (ev.buttons === 1) {
        this.$emit('noteon', {
          channel: 1,
          note: {
            name: '',
            number: this.octave * 12 + offset,
            octave: this.octave
          },
          rawVelocity: 127,
          target: ev.target,
          timestamp: this.$store.state.audioContext.currentTime,
          velocity: 1
        })
      }
    },
    up (ev, offset) {
      this.$emit('noteoff', {
        channel: 1,
        note: {
          name: '',
          number: this.octave * 12 + offset,
          octave: this.octave
        },
        rawVelocity: 127,
        target: ev.target,
        timestamp: this.$store.state.audioContext.currentTime,
        velocity: 1
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.keyboard {
  width: 80%;
  display: flex;
  min-height: 100px;
  user-select: none;
}

.octave {
  flex-grow: 1;
}

.octave .keys {
  position: relative;
  height: 100%;
}

.octave > .keys > div {
  display: inline-block;
  position: absolute;
  width: 14.29%;
  height: 100%;
  background-color: white;
  border: 1px solid grey;
  vertical-align: bottom;

  -webkit-transition: background-color 600ms;
  -moz-transition: background-color 600ms;
  transition: background-color 600ms;
}

.octave > .keys > div.black {
  width: 8%;
  height: 65%;
  background-color: black;
  z-index: 100;
}

.text-bottom {
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 3px;
  color: darkgrey;
  pointer-events: none;
}

div.black > .text-bottom {
  display: none;
}

.octave > .keys > div.active {
  background-color: yellow;
  -webkit-transition: background-color 0s;
  -moz-transition: background-color 0s;
  transition: background-color 0s;
}

.octave .C {
  left: 0;
}
.octave .Db {
  left: 10.29%;
}

.octave .D {
  left: 14.29%;
}

.octave .Eb {
  left: 24.57%;
}

.octave .E {
  left: 28.57%;
}

.octave .F {
  left: 42.86%;
}

.octave .Gb {
  left: 53.14%;
}

.octave .G {
  left: 57.14%;
}

.octave .Ab {
  left: 67.43%;
}

.octave .A {
  left: 71.43%;
}

.octave .Bb {
  left: 81.71%;
}

.octave .B {
  left: 85.71%;
}
</style>
