<template>
  <div>
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
      </div>
    </div>
    <div class="keyboard">
      <div class="octave">
        <div class="keys">
          <div class="C" @mousedown="down($event, 0)" @mouseup="up($event, 0)" @mouseover="down($event, 0)" @mouseout="up($event, 0)">
            <div class="text-bottom">C</div>
          </div>
          <div class="Db black" @mousedown="down($event, 1)" @mouseup="up($event, 1)" @mouseover="down($event, 1)" @mouseout="up($event, 1)">
            <div class="text-bottom">Db</div>
          </div>
          <div class="D" @mousedown="down($event, 2)" @mouseup="up($event, 2)" @mouseover="down($event, 2)" @mouseout="up($event, 2)">
            <div class="text-bottom">D</div>
          </div>
          <div class="E" @mousedown="down($ev33ent, 3)" @mouseup="up($event, 3)" @mouseover="down($event, 3)" @mouseout="up($event, 3)">
            <div class="text-bottom">E</div>
          </div>
          <div class="Eb black" @mousedown="down($event, 4)" @mouseup="up($event, 4)" @mouseover="down($event, 4)" @mouseout="up($event, 4)">
            <div class="text-bottom">Eb</div>
          </div>
          <div class="F" @mousedown="down($event, 5)" @mouseup="up($event, 5)" @mouseover="down($event, 5)" @mouseout="up($event, 5)">
            <div class="text-bottom">F</div>
          </div>
          <div class="Gb black" @mousedown="down($event, 6)" @mouseup="up($event, 6)" @mouseover="down($event, 6)" @mouseout="up($event, 6)">
            <div class="text-bottom">Gb</div>
          </div>
          <div class="G" @mousedown="down($event, 7)" @mouseup="up($event, 7)" @mouseover="down($event, 7)" @mouseout="up($event, 7)">
            <div class="text-bottom">G</div>
          </div>
          <div class="Ab black" @mousedown="down($event, 8)" @mouseup="up($event, 8)" @mouseover="down($event, 8)" @mouseout="up($event, 8)">
            <div class="text-bottom">Ab</div>
          </div>
          <div class="A" @mousedown="down($event, 9)" @mouseup="up($event, 9)" @mouseover="down($event, 9)" @mouseout="up($event, 9)">
            <div class="text-bottom">A</div>
          </div>
          <div class="Bb black" @mousedown="down($event, 10)" @mouseup="up($event, 10)" @mouseover="down($event, 10)" @mouseout="up($event, 10)">
            <div class="text-bottom">Bb</div>
          </div>
          <div class="B" @mousedown="down($event, 11)" @mouseup="up($event, 11)" @mouseover="down($event, 11)" @mouseout="up($event, 11)">
            <div class="text-bottom">B</div>
          </div>
        </div>
      </div>
      <div class="octave">
        <div class="keys">
          <div class="C" @mousedown="down($event, 12)" @mouseup="up($event, 12)" @mouseover="down($event, 12)" @mouseout="up($event, 12)">
            <div class="text-bottom">C</div>
          </div>
          <div class="Db black" @mousedown="down($event, 13)" @mouseup="up($event, 13)" @mouseover="down($event, 13)" @mouseout="up($event, 13)">
            <div class="text-bottom">Db</div>
          </div>
          <div class="D" @mousedown="down($event, 14)" @mouseup="up($event, 14)" @mouseover="down($event, 14)" @mouseout="up($event, 14)">
            <div class="text-bottom">D</div>
          </div>
          <div class="E" @mousedown="down($event, 15)" @mouseup="up($event, 15)" @mouseover="down($event, 15)" @mouseout="up($event, 15)">
            <div class="text-bottom">E</div>
          </div>
          <div class="Eb black" @mousedown="down($event, 16)" @mouseup="up($event, 16)" @mouseover="down($event, 16)" @mouseout="up($event, 16)">
            <div class="text-bottom">Eb</div>
          </div>
          <div class="F" @mousedown="down($event, 17)" @mouseup="up($event, 17)" @mouseover="down($event, 17)" @mouseout="up($event, 17)">
            <div class="text-bottom">F</div>
          </div>
          <div class="Gb black" @mousedown="down($event, 18)" @mouseup="up($event, 18)" @mouseover="down($event, 18)" @mouseout="up($event, 18)">
            <div class="text-bottom">Gb</div>
          </div>
          <div class="G" @mousedown="down($event, 19)" @mouseup="up($event, 19)" @mouseover="down($event, 19)" @mouseout="up($event, 19)">
            <div class="text-bottom">G</div>
          </div>
          <div class="Ab black" @mousedown="down($event, 20)" @mouseup="up($event, 20)" @mouseover="down($event, 20)" @mouseout="up($event, 20)">
            <div class="text-bottom">Ab</div>
          </div>
          <div class="A" @mousedown="down($event, 21)" @mouseup="up($event, 21)" @mouseover="down($event, 21)" @mouseout="up($event, 21)">
            <div class="text-bottom">A</div>
          </div>
          <div class="Bb black" @mousedown="down($event, 22)" @mouseup="up($event, 22)" @mouseover="down($event, 22)" @mouseout="up($event, 22)">
            <div class="text-bottom">Bb</div>
          </div>
          <div class="B" @mousedown="down($event, 23)" @mouseup="up($event, 23)" @mouseover="down($event, 23)" @mouseout="up($event, 23)">
            <div class="text-bottom">B</div>
          </div>
        </div>
      </div>
      <div class="octave">
        <div class="keys">
          <div class="C" @mousedown="down($event, 24)" @mouseup="up($event, 24)" @mouseover="down($event, 24)" @mouseout="up($event, 24)">
            <div class="text-bottom">C</div>
          </div>
          <div class="Db black" @mousedown="down($event, 25)" @mouseup="up($event, 25)" @mouseover="down($event, 25)" @mouseout="up($event, 25)">
            <div class="text-bottom">Db</div>
          </div>
          <div class="D" @mousedown="down($event, 26)" @mouseup="up($event, 26)" @mouseover="down($event, 26)" @mouseout="up($event, 26)">
            <div class="text-bottom">D</div>
          </div>
          <div class="E" @mousedown="down($event, 27)" @mouseup="up($event, 27)" @mouseover="down($event, 27)" @mouseout="up($event, 27)">
            <div class="text-bottom">E</div>
          </div>
          <div class="Eb black" @mousedown="down($event, 28)" @mouseup="up($event, 28)" @mouseover="down($event, 28)" @mouseout="up($event, 28)">
            <div class="text-bottom">Eb</div>
          </div>
          <div class="F" @mousedown="down($event, 29)" @mouseup="up($event, 29)" @mouseover="down($event, 29)" @mouseout="up($event, 29)">
            <div class="text-bottom">F</div>
          </div>
          <div class="Gb black" @mousedown="down($event, 30)" @mouseup="up($event, 30)" @mouseover="down($event, 30)" @mouseout="up($event, 30)">
            <div class="text-bottom">Gb</div>
          </div>
          <div class="G" @mousedown="down($event, 31)" @mouseup="up($event, 31)" @mouseover="down($event, 31)" @mouseout="up($event, 31)">
            <div class="text-bottom">G</div>
          </div>
          <div class="Ab black" @mousedown="down($event, 32)" @mouseup="up($event, 32)" @mouseover="down($event, 32)" @mouseout="up($event, 32)">
            <div class="text-bottom">Ab</div>
          </div>
          <div class="A" @mousedown="down($event, 33)" @mouseup="up($event, 33)" @mouseover="down($event, 33)" @mouseout="up($event, 33)">
            <div class="text-bottom">A</div>
          </div>
          <div class="Bb black" @mousedown="down($event, 34)" @mouseup="up($event, 34)" @mouseover="down($event, 34)" @mouseout="up($event, 34)">
            <div class="text-bottom">Bb</div>
          </div>
          <div class="B" @mousedown="down($event, 35)" @mouseup="up($event, 35)" @mouseover="down($event, 35)" @mouseout="up($event, 35)">
            <div class="text-bottom">B</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VirtualKeyboard',
  props: ['outputs'],
  data () {
    return {
      octave: 4,
      selectedOutput: undefined
    }
  },
  mounted () {
    this.$watch('outputs', outs => { this.selectedOutput = outs[0] })
  },
  methods: {
    selectOutput (output) {
      console.log(output)
      this.selectedOutput = output
    },
    down (ev, offset) {
      if (ev.buttons === 1) {
        ev.target.classList.add('active')
        let event = {
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
        }
        this.$emit('noteon', event)

        if (this.selectedOutput) {
          this.selectedOutput.device.noteon(event)
        }
      }
    },
    up (ev, offset) {
      ev.target.classList.remove('active')
      let event = {
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
      }
      this.$emit('noteoff', event)
      if (this.selectedOutput) {
        this.selectedOutput.device.noteoff(event)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
  display: inline-flex;
  align-items: center;
}

.col {
  display: inline-flex;
  align-items: center;
  flex-direction: column;
}

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
  background-color: darkgrey;
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
