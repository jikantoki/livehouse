<template lang="pug">
  v-app
    router-view
</template>

<script>
import { App } from '@capacitor/app'
import { Toast } from '@capacitor/toast'
import { useTheme } from 'vuetify'
let theme

export default {
  name: 'App',
  setup() {
    theme = useTheme()
    theme.global.name.value = 'dark'
  },

  data: () => ({
    //
  }),

  mounted() {
    document.title = 'Livehouse'

    App.addListener('backButton', () => {
      console.log('back!')
      Toast.show({ text: 'Back button is disabled' })
      //this.$router.back()
    })
  },
}
</script>

<style>
* {
  user-select: none;
}
</style>
