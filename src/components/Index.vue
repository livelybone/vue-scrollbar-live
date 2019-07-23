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
    <Bar
      v-for="(scrollType, type) in scrollbars"
      :type="type"
      :marginToWrap="marginToWrap"
      :parentScroll="scrollPos[scrollType]"
      :clientSize="type === 'x' ? width.wrap : height.wrap"
      :scrollSize="type === 'x' ? width.content : height.content"
      :key="type"
      @scrollTo="setScroll($event, 'drag')"
    />
  </div>
</template>

<script>
import { Utils } from '@livelybone/mouse-events'
import { getNativeScrollbarWidth } from '@livelybone/scroll-get'
import Bar from './Bar'

export default {
  name: 'Scrollbar',
  components: { Bar },
  props: {
    maxHeight: [Number, String],
    scrollTo: [Number, Object],
    marginToWrap: {
      default: 5,
      type: Number,
    },
  },
  data() {
    return {
      width: { wrap: 0, content: 0 },
      height: { wrap: 0, content: 0 },
      scrollPos: { scrollLeft: 0, scrollTop: 0 },
      isTop: true,
      isBottom: true,
      isLeft: true,
      isRight: true,
      nativeScrollbarWidth: { horizontal: 0, vertical: 0 },
    }
  },
  computed: {
    scrollbars() {
      const obj = {}
      const { horizontal, vertical } = this.nativeScrollbarWidth
      if (horizontal) obj.y = 'scrollTop'
      if (vertical) obj.x = 'scrollLeft'
      return obj
    },
    $_useNativeScrollbar() {
      const { horizontal, vertical } = this.nativeScrollbarWidth
      return !vertical && !horizontal
    },
    $_maxHeight() {
      return typeof this.maxHeight === 'number'
        ? `${this.maxHeight}px`
        : this.maxHeight
    },
    $_wrapStyle() {
      return {
        height: this.$_useNativeScrollbar ? 'auto' : `${this.height.wrap}px`,
        maxHeight: this.$_maxHeight,
        overflow: 'hidden',
      }
    },
    $_contentStyle() {
      if (this.$_useNativeScrollbar) {
        return {
          maxHeight: this.$_maxHeight,
          overflow: 'scroll',
        }
      }
      const scrollbarWidth = this.nativeScrollbarWidth
      return {
        width: `calc(100% + ${scrollbarWidth.horizontal}px)`,
        maxHeight: `calc(${this.$_maxHeight} + ${scrollbarWidth.vertical}px)`,
        overflow: 'scroll',
      }
    },
    maxScroll() {
      return {
        scrollLeft: this.width.content - this.width.wrap,
        scrollTop: this.height.content - this.height.wrap,
      }
    },
  },
  watch: {
    scrollTo: {
      handler(val) {
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
    getHeight() {
      if (this.$refs.content) {
        const {
          scrollHeight,
          clientHeight,
          scrollWidth,
          clientWidth,
        } = this.$refs.content
        this.height.wrap = clientHeight
        this.height.content = scrollHeight

        this.width.wrap = clientWidth
        this.width.content = scrollWidth
      }
    },
    scroll() {
      const { scrollTop, scrollLeft } = this.$refs.content
      this.setScroll({ scrollTop, scrollLeft })
    },
    setScroll(
      { scrollTop = undefined, scrollLeft = undefined },
      type = 'scroll',
    ) {
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
      if (needScroll) {
        this.$refs.content[type] = val
      }
    },
    judgeOnBoundary() {
      this.isTop = this.scrollPos.scrollTop === 0
      this.isBottom = this.scrollPos.scrollTop === this.maxScroll.scrollTop
      this.isLeft = this.scrollPos.scrollLeft === 0
      this.isRight = this.scrollPos.scrollLeft === this.maxScroll.scrollLeft
    },
    bind() {
      this.$once(
        'hook:beforeDestroy',
        Utils.$addListener(this.$refs.content, 'scroll', this.scroll),
      )
    },
  },
  mounted() {
    this.nativeScrollbarWidth = getNativeScrollbarWidth()
    if (!this.$_useNativeScrollbar) {
      this.getHeight()
      this.$on('hook:updated', () => {
        this.getHeight()
      })

      this.bind()
    }
  },
}
</script>
