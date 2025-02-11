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
  mounted() {
    this.$refs.audio.src = this.musicInfo.address
    this.$refs.audio.play()
  },
}
</script>
