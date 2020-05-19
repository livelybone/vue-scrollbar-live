<template>
  <div
    class="scrollbar-wrap"
    :style="$_wrapStyle"
    @click="$emit('wrapClick', $event)"
    ref="wrap"
  >
    <div class="scrollbar-content" :style="$_contentStyle" ref="content">
      <slot />
    </div>
    <template v-if="!isMobile && width.content && height.content">
      <Bar
        v-for="(barInfo, type) in scrollbars"
        :type="type"
        :marginToWrap="marginToWrap"
        :parentScroll="scrollPos[barInfo.scrollPropName]"
        :clientSize="barInfo.size.content"
        :scrollSize="barInfo.size.contentInner"
        :key="type"
        @scrollTo="setScroll($event, 'drag')"
      />
    </template>
  </div>
</template>

<script>
import { Utils } from '@livelybone/mouse-events'
import { getNativeScrollbarWidth } from '@livelybone/scroll-get'
import Bar from './Bar'
import { listenDomChange } from '../utils/listen-dom-change'
import { insertStyle } from '../utils/utils'

export default {
  name: 'Scrollbar',
  components: { Bar },
  props: {
    isMobile: Boolean,
    maxHeight: [Number, String],
    scrollTo: [Number, Object],
    marginToWrap: {
      default: 5,
      type: Number,
    },
  },
  data() {
    return {
      width: { parent: 0, content: 0, contentInner: 0 },
      height: { parent: 0, content: 0, contentInner: 0 },
      scrollPos: { scrollLeft: 0, scrollTop: 0 },
      isTop: true,
      isBottom: true,
      isLeft: true,
      isRight: true,
      nativeScrollbarWidth: { x: 0, y: 0 },
    }
  },
  computed: {
    scrollbars() {
      return {
        x: { scrollPropName: 'scrollLeft', size: this.width },
        y: { scrollPropName: 'scrollTop', size: this.height },
      }
    },
    $_maxHeight() {
      if (typeof this.maxHeight === 'number') return `${this.maxHeight}px`
      if (/%/.test(this.maxHeight)) {
        return this.maxHeight.replace(
          /(\d+)%/g,
          (m, percent) => `${(this.height.parent * percent) / 100}px`,
        )
      }
      return this.maxHeight
    },
    $_wrapStyle() {
      return {
        position: 'relative',
        height: this.isMobile
          ? 'auto !important'
          : `${this.height.content}px !important`,
        maxHeight: `${this.$_maxHeight} !important`,
        padding: '0 !important',
        overflow: 'hidden !important',
      }
    },
    $_contentStyle() {
      if (this.isMobile) {
        return {
          maxHeight: this.$_maxHeight,
          overflow: 'scroll',
        }
      }
      const { x, y } = this.nativeScrollbarWidth
      return {
        width: `calc(100% + ${y}px) !important`,
        maxHeight: `calc(${this.$_maxHeight.replace(
          /(^calc\()|(\)$)/g,
          '',
        )} + ${x}px) !important`,
        overflow: 'scroll',
      }
    },
    maxScroll() {
      return {
        scrollLeft: this.width.contentInner - this.width.content,
        scrollTop: this.height.contentInner - this.height.content,
      }
    },
  },
  watch: {
    scrollTo: {
      handler(val) {
        this.$scrollTo(val)
      },
      immediate: true,
    },
    isBottom(val) {
      if (val) this.$emit('reachBottom')
    },
    isTop(val) {
      if (val) this.$emit('reachTop')
    },
    isLeft(val) {
      if (val) this.$emit('reachLeft')
    },
    isRight(val) {
      if (val) this.$emit('reachRight')
    },
  },
  methods: {
    updateScrollbarWidth() {
      this.nativeScrollbarWidth = getNativeScrollbarWidth(this.$refs.content)
    },
    updateHeight() {
      if (!this.$refs.content || typeof window === 'undefined') return

      const {
        scrollHeight,
        clientHeight,
        scrollWidth,
        clientWidth,
      } = this.$refs.content
      this.height.content = clientHeight
      this.height.contentInner = scrollHeight
      this.height.parent = this.$refs.wrap.parentElement.clientHeight

      this.width.content = clientWidth
      this.width.contentInner = scrollWidth
      this.width.parent = this.$refs.wrap.parentElement.clientWidth
    },
    getHeight() {
      this.updateHeight()
    },
    $scrollTo(val) {
      this.$nextTick(() => {
        if (val) {
          const pos = { scrollLeft: 0, scrollTop: 0 }
          if (val.x || val.y) {
            pos.scrollLeft = +val.x * this.maxScroll.scrollLeft
            pos.scrollTop = +val.y * this.maxScroll.scrollTop
          } else {
            pos.scrollLeft = +val * this.maxScroll.scrollLeft
            pos.scrollTop = +val * this.maxScroll.scrollTop
          }
          this.setScroll(pos, 'drag')
        }
      })
    },
    scroll(e) {
      const { scrollTop, scrollLeft } = this.$refs.content
      this.setScroll({ scrollTop, scrollLeft })
      this.$emit('scroll', e)
    },
    setScroll({ scrollTop, scrollLeft }, type = 'scroll') {
      const needScroll = type !== 'scroll'
      if (scrollTop !== undefined) {
        this.setPos(scrollTop, 'scrollTop', needScroll)
      }
      if (scrollLeft !== undefined) {
        this.setPos(scrollLeft, 'scrollLeft', needScroll)
      }
      this.judgeOnBoundary()
    },
    setPos(val, type, needScroll) {
      this.scrollPos[type] = val
      if (needScroll) this.$refs.content[type] = val
    },
    judgeOnBoundary() {
      this.isTop = this.scrollPos.scrollTop === 0
      this.isBottom = this.scrollPos.scrollTop === this.maxScroll.scrollTop
      this.isLeft = this.scrollPos.scrollLeft === 0
      this.isRight = this.scrollPos.scrollLeft === this.maxScroll.scrollLeft
    },
  },
  created() {
    const inPcBrowser = !this.isMobile && typeof window !== 'undefined'

    if (inPcBrowser) insertStyle()

    this.$once('hook:mounted', () => {
      if (inPcBrowser) {
        this.updateScrollbarWidth()
        this.$once(
          'hook:beforeDestroy',
          Utils.$addListener(this.$refs.content, 'scroll', this.scroll),
        )
      }

      this.updateHeight()
      this.$on(
        'hook:beforeDestroy',
        listenDomChange(this, () => {
          this.$emit('domChange')
          this.updateScrollbarWidth()
          this.updateHeight()
        }),
      )
    })
  },
}
</script>
