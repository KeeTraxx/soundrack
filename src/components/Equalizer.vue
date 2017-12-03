<template>
  <div>
    <canvas class="display" ref="canvas" width="760" height="140"></canvas>
    <h1>Equalizer</h1>
  </div>
</template>

<script>

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
      canvasCtx.fillStyle = 'rgb(0, 0, 0)'
      canvasCtx.fillRect(0, 0, 760, 140)
      let barWidth = (320 / this.dataArray.length) * 2.5
      let barHeight
      let x = 0
      let c = 0

      for (var i = 0; i < this.dataArray.length; i++) {
        barHeight = this.dataArray[i] / 2
        c = Math.min(100 + x, 255)
        canvasCtx.fillStyle = 'rgb(50,' + c + ',50)'
        canvasCtx.fillRect(x, 128 - barHeight, barWidth, barHeight)

        x += barWidth + 1
      }
      setTimeout(() => requestAnimationFrame(this.draw), 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
