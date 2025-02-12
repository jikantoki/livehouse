<template lang="pug">
  .object.tap(:style="`animation-duration: ${timeLimit}ms;`")
    img(src="/assets/node.png")
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
  animation-timing-function: linear;
  position: absolute;
  width: 25%;
  aspect-ratio: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 70%;
  }
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
