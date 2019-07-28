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
    <template v-if="!isMobile">
      <Bar
        v-for="(barInfo, type) in scrollbars"
        :type="type"
        :marginToWrap="marginToWrap"
        :parentScroll="scrollPos[barInfo.scrollPropName]"
        :clientSize="barInfo.size.wrap"
        :scrollSize="barInfo.size.content"
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
      width: { wrap: 0, content: 0 },
      height: { wrap: 0, content: 0 },
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
      return typeof this.maxHeight === 'number'
        ? `${this.maxHeight}px`
        : this.maxHeight
    },
    $_wrapStyle() {
      return {
        position: 'relative',
        height: this.isMobile
          ? 'auto !important'
          : `${this.height.wrap}px !important`,
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
        maxHeight: `calc(${this.$_maxHeight} + ${x}px) !important`,
        overflow: 'scroll !important',
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
      const fn = () => {
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
      }

      fn()
      this.$on('hook:updated', fn)
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
    insertStyle() {
      const id = 'scroll-bar'
      const styleExist = document.getElementById(id)
      if (!styleExist) {
        const style = document.createElement('style')
        style.id = id
        style.innerText =
          '.scrollbar-content::-webkit-scrollbar{width:0;height:0;}' +
          '.scrollbar{position:absolute;border-radius:.25em;background:#eee;box-shadow:0 0 2px rgba(0,0,0,0.1);opacity:0;pointer-events:none}' +
          '.scrollbar-y{right:0.25em;width:.5em}' +
          '.scrollbar-x{bottom:0.25em;height:.5em}' +
          '.scrollbar-wrap:hover .scrollbar{opacity:1;pointer-events:initial}'
        document.head.appendChild(style)
      }
    },
  },
  created() {
    if (!this.isMobile) {
      this.insertStyle()
      this.$once('hook:mounted', () => {
        this.nativeScrollbarWidth = getNativeScrollbarWidth(this.$refs.content)
        this.getHeight()
        this.bind()
      })
    }
  },
}
</script>
