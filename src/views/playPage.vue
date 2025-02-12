<template lang="pug">
  v-main
    p {{ musicInfo.title }}
    router-link(to='/')
      v-btn back
    .point
      p 現在のポイント:{{ point }}
    .play-table-wrap
      .play-table(ref="playTable")
        .touch-line
        table
          tbody
            tr.move-object-zone
              th(ref="tapZone0") a
              th(ref="tapZone1") b
              th(ref="tapZone2") c
              th(ref="tapZone3") d
    .object-buffer(style="display: none;")
      .tapObject-wrap.no-tap(ref="tapObject")
        tapObject(:timeLimit="objectTimeLimit")
      .ng-score-wrap.no-tap(ref="NGScoreObject")
        scoreObject(:state="0")
      .perfect-score-wrap.no-tap(ref="perfectScoreObject")
        scoreObject(:state="1")
      .great-score-wrap.no-tap(ref="greatScoreObject")
        scoreObject(:state="2")
      .early-score-wrap.no-tap(ref="earlyScoreObject")
        scoreObject(:state="3")
      .later-score-wrap.no-tap(ref="laterScoreObject")
        scoreObject(:state="4")
  audio(ref="audio")
</template>

<script>
import tapObject from '@/components/tapObject.vue'
import scoreObject from '@/components/scoreObject.vue'

export default {
  components: {
    tapObject,
    scoreObject,
  },
  data() {
    return {
      /** 楽曲と譜面の情報 */
      musicInfo: {
        /** 音楽ファイルの場所 */
        address: '/BGM/demo.mp3',
        /** 曲名 */
        title: 'DEMO SONG',
        /** 楽曲情報 */
        info: {
          /** ミリ秒遅れて始まる */
          timeSet: 1496,
          bpm: 175,
        },
      },
      /** タップするやつの前もって表示される時間 */
      objectTimeLimit: 3000,
      /** 曲が終わったらTrueになる */
      musicEnded: false,
      /** OK判定を出す時間基準（前後ズレミリ秒） */
      judgeTime: 500,
      /** 現在のポイント */
      point: 0,
    }
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
    sleep(time) {
      return new Promise((resolve) => {
        setTimeout(resolve, time)
      })
    },
  },
  async mounted() {
    /** 外部ファイルから譜面情報を読み取り */
    const musicInfoJs = await fetch('/scores/demosong.js')
    const musicInfoText = await musicInfoJs.text()
    let musicInfo
    eval(musicInfoText)
    this.musicInfo = musicInfo

    /** 一小節にかかる時間ミリ秒 */
    const measure = (60 / this.musicInfo.info.bpm) * 4 * 1000
    this.$refs.audio.src = this.musicInfo.address
    this.$refs.audio.load()
    await this.eventPromisify(this.$refs.audio, 'canplaythrough')
    this.$refs.audio.addEventListener('ended', () => {
      this.musicEnded = true
    })
    this.$refs.audio.currentTime = 0

    //クリック時のデフォルトの挙動設定
    const defaultAudio = new Audio('/SE/click-table-default.mp3')
    await this.eventPromisify(defaultAudio, 'canplaythrough')
    const perfectAudio = new Audio('/SE/click-table-perfect.mp3')
    await this.eventPromisify(perfectAudio, 'canplaythrough')

    /** 当たり判定時の音の設定 */
    const clickTableDefault = () => {
      const audio = defaultAudio.cloneNode()
      audio.play()
    }
    const clickTablePerfect = () => {
      const audio = perfectAudio.cloneNode()
      audio.play()
    }
    this.$refs.tapZone0.addEventListener('touchstart', clickTableDefault)
    this.$refs.tapZone1.addEventListener('touchstart', clickTableDefault)
    this.$refs.tapZone2.addEventListener('touchstart', clickTableDefault)
    this.$refs.tapZone3.addEventListener('touchstart', clickTableDefault)

    setTimeout(() => {
      this.$refs.audio.play()
    }, this.objectTimeLimit)

    //譜面表示処理
    const tapObject = this.$refs.tapObject
    setTimeout(async () => {
      await Promise.all(
        this.musicInfo.levels.easy.map(async (levels, index) => {
          await this.sleep(measure * index)
          if (!this.$refs.playTable) {
            return
          }
          if (!levels || !levels[0]) {
            return
          }
          const length = levels.length
          const oneTime = measure / length
          for (const tasc of levels) {
            if (tasc) {
              let node
              switch (tasc.action) {
                case 'tap':
                  node = tapObject.cloneNode(true)
                  break
                default:
                  break
              }
              const div = node.getElementsByTagName('div')[0]
              switch (tasc.keyboard) {
                case 0:
                  break
                case 1:
                  div.style.left = '25%'
                  break
                case 2:
                  div.style.left = '50%'
                  break
                case 3:
                  div.style.left = '75%'
                  break
                default:
                  break
              }
              if (this.$refs.playTable) {
                this.$refs.playTable.append(node)
              } else {
                break
              }
            }
            await this.sleep(oneTime)
          }
        })
      )
      //最後の数字は、タイミング調整用
    }, this.musicInfo.info.timeSet + this.objectTimeLimit * 0.05)

    //譜面判定処理
    setTimeout(async () => {
      const NGScore = this.$refs.NGScoreObject
      const perfectScore = this.$refs.perfectScoreObject
      const greatScore = this.$refs.greatScoreObject
      const earlyScore = this.$refs.earlyScoreObject
      const laterScore = this.$refs.laterScoreObject
      await Promise.all(
        this.musicInfo.levels.easy.map(async (levels, index) => {
          await this.sleep(measure * index)
          if (!this.$refs.playTable) {
            return
          }
          if (!levels || !levels[0]) {
            return
          }
          const length = levels.length
          const oneTime = measure / length
          for (const tasc of levels) {
            if (tasc) {
              switch (tasc.action) {
                case 'tap':
                  break
                default:
                  break
              }
              let ref
              switch (tasc.keyboard) {
                case 0:
                  ref = this.$refs.tapZone0
                  break
                case 1:
                  ref = this.$refs.tapZone1
                  break
                case 2:
                  ref = this.$refs.tapZone2
                  break
                case 3:
                  ref = this.$refs.tapZone3
                  break
                default:
                  break
              }
              if (this.$refs.playTable && ref) {
                /** 判定を開始した時間（ミリ秒） */
                const judgeStartTime = Date.now()
                /** 完璧な当たり判定とのズレミリ秒 */
                let score = null
                /** ゲームに反映させるポイント */
                let point = null
                /** 当たり判定処理 */
                const clicked = () => {
                  if (point) {
                    return
                  }
                  clickTablePerfect()
                  const timeDelay = Date.now() - judgeStartTime
                  score = timeDelay - this.judgeTime / 2
                  point = this.judgeTime / 2 - Math.abs(score)
                  this.point += point

                  let node
                  if (point > (this.judgeTime / 2) * 0.8) {
                    node = perfectScore.cloneNode(true)
                  } else if (point > (this.judgeTime / 2) * 0.5) {
                    node = greatScore.cloneNode(true)
                  } else if (score < 0) {
                    node = earlyScore.cloneNode(true)
                  } else {
                    node = laterScore.cloneNode(true)
                  }
                  const div = node.getElementsByTagName('div')[0]
                  switch (tasc.keyboard) {
                    case 0:
                      break
                    case 1:
                      div.style.left = '25%'
                      break
                    case 2:
                      div.style.left = '50%'
                      break
                    case 3:
                      div.style.left = '75%'
                      break
                    default:
                      break
                  }
                  if (this.$refs.playTable) {
                    this.$refs.playTable.append(node)
                  }
                }
                ref.removeEventListener('touchstart', clickTableDefault)
                ref.addEventListener('click', clicked)
                setTimeout(() => {
                  ref.addEventListener('touchstart', clickTableDefault)
                  ref.removeEventListener('click', clicked)
                }, this.judgeTime)
                await this.sleep(oneTime)
                if (!point) {
                  const node = NGScore.cloneNode(true)
                  const div = node.getElementsByTagName('div')[0]
                  switch (tasc.keyboard) {
                    case 0:
                      break
                    case 1:
                      div.style.left = '25%'
                      break
                    case 2:
                      div.style.left = '50%'
                      break
                    case 3:
                      div.style.left = '75%'
                      break
                    default:
                      break
                  }
                  if (this.$refs.playTable) {
                    this.$refs.playTable.append(node)
                  } else {
                    break
                  }
                }
                continue
              } else {
                break
              }
            }
            await this.sleep(oneTime)
          }
        })
      )
      //最後の数字は判定タイミング微調整用
    }, this.musicInfo.info.timeSet + this.objectTimeLimit - this.judgeTime / 2 + 0)
  },
}
</script>

<style lang="scss" scoped>
.play-table-wrap {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  perspective: 400px;
  width: max-content;
  .play-table {
    transform: rotateX(143deg);
    transform-origin: bottom;
    position: relative;
    .touch-line {
      position: fixed;
      bottom: 6em;
      width: 100%;
      height: 1px;
      background: black;
      pointer-events: none;
    }
    table {
      border-collapse: collapse;
      tbody {
        tr.move-object-zone > th {
          border: solid 1px;
          height: 140em;
          width: 10em;
        }
      }
    }
  }
}
.no-tap {
  pointer-events: none;
}
</style>
