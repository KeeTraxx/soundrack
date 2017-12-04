<template>
  <div>
    <h1>Virtual Keyboard</h1>
    <div class="keyboard">
      <div class="octave">
        <div class="C">C</div>
        <div class="Db">Db</div>
        <div class="D">D</div>
        <div class="E">E</div>
        <div class="Eb">Eb</div>
        <div class="F">F</div>
        <div class="Gb">Gb</div>
        <div class="G">G</div>
        <div class="Ab">Ab</div>
        <div class="A">A</div>
        <div class="Bb">Bb</div>
        <div class="B">B</div>
      </div>
      <div class="octave">
        <div class="C">C</div>
        <div class="Db">Db</div>
        <div class="D">D</div>
        <div class="E">E</div>
        <div class="Eb">Eb</div>
        <div class="F">F</div>
        <div class="Gb">Gb</div>
        <div class="G">G</div>
        <div class="Ab">Ab</div>
        <div class="A">A</div>
        <div class="Bb">Bb</div>
        <div class="B">B</div>
      </div>
    </div>
  </div>
</template>

<script>
// ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
export default {
  name: 'VirtualKeyboard',
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.keyboard {
  width: 100%;
}

.octave {
  width: 50%;
  display: inline-block;
}

.octave > div {
  display: inline-block;
  position: relative;
  width: 12.5%;
  background-color: white;
}

.octave .C {
  left: 0;
}

.octave .D {
  left: 12.5%;
}

.octave .E {
}
</style>
