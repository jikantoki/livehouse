<template lang="pug">
  v-main
    p Livehouse V0.1
    router-link(to='/play?demo=1')
      v-btn Play Demo
    p BGM by DOVA-SYNDROME &amp; Sheero Music
  iframe(src="/BGM/title.mp3?autoplay=1&loop=1" allow="autoplay" style="display:none" loop)
</template>

<script>
import HelloWorld from '/src/components/HelloWorld.vue'
import { ScreenOrientation } from '@capacitor/screen-orientation'

export default {
  components: {
    HelloWorld,
  },
  mounted() {
    try {
      ScreenOrientation.lock({
        orientation: 'landscape-primary',
      })
        .then(() => {
          console.log('画面を固定しました')
        })
        .catch((e) => {
          console.log(e)
        })
    } catch (e) {
      console.log(e)
    }
  },
}
</script>
