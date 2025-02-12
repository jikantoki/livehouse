<template lang="pug">
  .score-object
    p {{ text }}
</template>

<script>
export default {
  props: {
    /** 状態 */
    state: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      text: null,
    }
  },
  mounted() {
    switch (this.state) {
      case 0:
        this.text = 'Miss'
        break
      case 1:
        this.text = 'Perfect!'
        break
      case 2:
        this.text = 'Great!'
        break
      case 3:
        this.text = '早い！'
        break
      case 4:
        this.text = '遅い！'
        break
      default:
        this.text = 'Miss'
        break
    }
  },
}
</script>

<style lang="scss" scoped>
.score-object {
  position: absolute;
  width: 3.34em;
  text-align: center;
  overflow: hidden;
  bottom: 2em;
  font-size: 3em;
  animation-name: remove-object;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.3, 0, 1, 0.7);
}

@keyframes remove-object {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
