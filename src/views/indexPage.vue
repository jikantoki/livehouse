<template lang="pug">
  v-main
    p Livehouse V0.1
    router-link(to='/play?demo=1')
      v-btn Play Demo
    p BGM by DOVA-SYNDROME &amp; Sheero Music
  iframe(
    src="/BGM/title.mp3?autoplay=1&loop=1"
    allow="autoplay"
    style="display:none"
    loop
    ref="bgm"
    )
</template>

<script>
import { ScreenOrientation } from '@capacitor/screen-orientation'
import { AndroidFullScreen } from '@awesome-cordova-plugins/android-full-screen'

export default {
  components: {},
  mounted() {
    ScreenOrientation.lock({
      orientation: 'landscape-primary',
    })
      .then(() => {
        console.log('画面を固定しました')
      })
      .catch((e) => {
        console.log(e)
      })
    AndroidFullScreen.isImmersiveModeSupported()
      .then(() => AndroidFullScreen.immersiveMode())
      .catch(console.log)
  },
}
</script>

<style lang="scss" scoped>
.v-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
