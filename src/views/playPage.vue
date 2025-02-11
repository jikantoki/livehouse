<template lang="pug">
  v-main
    p {{ musicInfo.title }}
    router-link(to='/')
      v-btn back
  audio(ref="audio")
</template>

<script>
export default {
  data() {
    return {
      musicInfo: {
        address: '/BGM/demo.mp3',
        title: 'DEMO SONG',
      },
    }
  },
  async mounted() {
    this.$refs.audio.src = this.musicInfo.address
    await this.eventPromisify(this.$refs.audio, 'canplaythrough')
    this.$refs.audio.play()
  },
  methods: {
    /**
     * @param {EventTarget} eventTarget
     * @param {string} eventName
     */
    eventPromisify(eventTarget, eventName) {
      return new Promise((resolve, reject) => {
        eventTarget.addEventListener(eventName, (...args) => resolve(...args))
        eventTarget.addEventListener('error', (...args) => reject(...args))
      })
    },
  },
}
</script>
