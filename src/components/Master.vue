<template>
  <div>
    <h1>Master</h1>
    <div>
      Dest: {{$store.state.audioContext.destination.channelInterpretation}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Master',
  data () {
    return {
      output: this.$store.state.audioContext.destination
    }
  },
  created () {
    console.log(this.$store.state.audioContext.destination.channelInterpretation)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
