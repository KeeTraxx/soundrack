<template>
  <div class="equalizer">
    <front class="gameboy">
      <canvas class="display" ref="canvas" width="760" height="140"></canvas>
      <span>
      </span>
    </front>
    <back>
      Back
    </back>
  </div>
</template>

<script>
let colors = ['#1d2213', '#494f3e', '#626e4c']
// colors = ['#f00', '#0f0', '#00f']
export default {
  name: 'Equalizer',
  props: ['input', 'output'],
  data () {
    return {
      analyser: undefined,
      dataArray: []
    }
  },
  mounted () {
    this.analyser = this.$store.state.audioContext.createAnalyser()
    this.analyser.fftSize = 256
    var bufferLength = this.analyser.frequencyBinCount
    this.dataArray = new Uint8Array(bufferLength)

    let canvasCtx = this.$refs.canvas.getContext('2d')

    canvasCtx.clearRect(0, 0, 760, 140)
    this.input.connect(this.analyser)
    this.analyser.connect(this.output)
    requestAnimationFrame(this.draw)
  },
  methods: {
    draw () {
      let canvasCtx = this.$refs.canvas.getContext('2d')
      this.analyser.getByteFrequencyData(this.dataArray)
      canvasCtx.clearRect(0, 0, 760, 140)
      let barWidth = (760 / this.dataArray.length) * 1.5
      let barHeight
      let x = 5

      for (var i = 0; i < this.dataArray.length; i++) {
        barHeight = this.dataArray[i] / 2
        for (var h = 0; h < barHeight; h += 8) {
          let c = Math.min(2, h / 45 * 2)
          canvasCtx.fillStyle = colors[~~c]
          if (c === 2) {
            canvasCtx.strokeStyle = colors[1]
            canvasCtx.strokeRect(x, 130 - h, barWidth, 6)
          } else {
            canvasCtx.fillRect(x, 130 - h, barWidth, 6)
          }
        }

        x += barWidth + 3
      }
      requestAnimationFrame(this.draw)
    }
  }
}
</script>

<style scoped>
.equalizer {
  width: 100%;
  height: 240px;
}
span {
  vertical-align: top;
}
</style>
