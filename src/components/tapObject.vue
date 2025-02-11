<template lang="pug">
  .object.tap(:style="`animation-duration: ${timeLimit}ms;`") ●
</template>

<script>
export default {
  props: {
    /** ミリ秒後にオブジェクト削除 */
    timeLimit: {
      type: Number,
      default: 1500,
    },
  },
  mounted() {
    setTimeout(() => {
      this.$emit('ended')
    }, this.timeLimit)
  },
}
</script>

<style lang="scss" scoped>
.object {
  animation-name: move-object;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.3, 0, 1, 0.7);
  position: absolute;
  font-size: 10em;
  overflow: hidden;
}

@keyframes move-object {
  0% {
    top: -30%;
  }
  100% {
    top: 100%;
  }
}
</style>
