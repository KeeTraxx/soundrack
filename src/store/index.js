import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let audioContext = new AudioContext()
let mixer = []

for (var i = 0; i < 16; i++) {
  mixer.push(audioContext.createGain())
}

let state = {
  audioContext,
  mixer,
  backview: false
}

export default new Vuex.Store({
  state
})
