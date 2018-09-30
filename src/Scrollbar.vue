<template>
  <div class="scrollbar-wrap" :style="_wrapStyle" @click.stop="$emit('wrapClick', $event)"
       ref="wrap">
    <div class="scrollbar-content" :style="_contentStyle" ref="content">
      <slot/>
    </div>
    <div v-if="showBar" class="scrollbar" :draggable="false" :style="_barStyle"
         @mousedown.stop="drag"></div>
  </div>
</template>

<script>
import * as MouseWheel from '@livelybone/mouse-wheel'
import * as Touch from '@livelybone/touch'

const eventTypes = {
  start: { pc: 'mousedown', mobile: 'touchstart' },
  move: { pc: 'mousemove', mobile: 'touchmove' },
  end: { pc: 'mouseup', mobile: 'touchend' },
}
export default {
  name: 'Scrollbar',
  mounted() {
    this.getHeight()
    if (this.scrollTo) this.setDelta({ percent: this.scrollTo })
    if (this.isMobile) {
      this.bindPan()
    } else {
      this.bind()
    }
  },
  updated() {
    this.getHeight()
  },
  beforeDestroy() {
    if (this.isMobile) this.bindRes.touchObserver.destroy()
    else this.bindRes()
  },
  props: {
    isMobile: Boolean,
    maxHeight: [Number, String],
    scrollTo: Number,
    wrapStyle: Object,
    contentStyle: Object,
    barStyle: Object,
  },
  data() {
    return {
      height: { wrap: 0, content: 0 },
      bindRes: null,
      scrollDelta: 0,
      isBottom: false,
      isTop: true,
      begin: { showBar: false, x: 0, y: 0, scrollDelta: 0 },
      prevent: null,
    }
  },
  computed: {
    eventTypeKey() {
      return this.isMobile ? 'mobile' : 'pc'
    },
    wrapHeight() {
      return typeof this.maxHeight === 'number' ? `${this.maxHeight}px` : this.maxHeight
    },
    showBar() {
      const { height: { wrap, content } } = this
      return content && wrap < content
    },
    _wrapStyle() {
      const maxHeight = this.wrapHeight
      return { ...this.wrapStyle, maxHeight }
    },
    _barStyle() {
      if (!this.showBar) return null
      const { height: { wrap, content } } = this
      return {
        ...this.barStyle,
        ...(this.begin.showBar ? { display: 'block' } : {}),
        height: `${(wrap * wrap) / content}px`,
        top: `${this.scrollDelta}px`,
      }
    },
    _contentStyle() {
      const { height: { wrap, content } } = this
      return {
        ...this.contentStyle,
        top: `${(-this.scrollDelta * content) / wrap}px`,
      }
    },
    maxTop() {
      const { height: { wrap, content } } = this
      return wrap - content >= 0 ? 0 : wrap - wrap * wrap / content
    },
  },
  watch: {
    scrollTo(val) {
      this.setDelta({ percent: val })
    },
    isBottom(val) {
      if (val) {
        this.$emit('reachBottom')
      }
    },
    isTop(val) {
      if (val) {
        this.$emit('reachTop')
      }
    },
  },
  methods: {
    getHeight() {
      if (this.$refs.wrap) {
        this.height.wrap = this.$refs.wrap.clientHeight
        this.height.content = this.$refs.content.clientHeight
      }
    },
    scroll(ev) {
      const { height: { wrap, content } } = this
      if (ev.dy) {
        this.setDelta({ delta: ev.dy / content * wrap })
      } else if (ev.deltaY) {
        this.setDelta({ value: (ev.deltaY / content * wrap) + this.begin.scrollDelta })
      }
      if (ev.type.indexOf('End') > 0) {
        this.isBottom = this.scrollDelta >= this.maxTop
        this.isTop = this.scrollDelta <= 0
      }
    },
    drag(ev) {
      const e = ev || window.event
      if (e.type === eventTypes.start[this.eventTypeKey]) {
        this.begin.x = e.clientX
        this.begin.y = e.clientY
        this.begin.scrollDelta = this.scrollDelta
        this.begin.showBar = true
        window.addEventListener(eventTypes.move[this.eventTypeKey], this.drag)
        window.addEventListener(eventTypes.end[this.eventTypeKey], this.drag)
        this.$emit('startDrag', this.begin)
      } else if (e.type === eventTypes.move[this.eventTypeKey]) {
        this.setDelta({ value: e.clientY - this.begin.y + this.begin.scrollDelta })
      } else if (e.type === eventTypes.end[this.eventTypeKey]) {
        this.begin.showBar = false
        window.removeEventListener(eventTypes.move[this.eventTypeKey], this.drag)
        window.removeEventListener(eventTypes.end[this.eventTypeKey], this.drag)
        this.$emit('endDrag', { ...this.begin, x: e.clientX, y: e.clientY })
      }
    },
    setDelta({ delta = 0, value = 0, percent = 0 }) {
      if (delta) this.scrollDelta += delta
      else if (value) this.scrollDelta = value
      else if (percent) this.scrollDelta = percent * this.maxTop
      if (this.scrollDelta > this.maxTop) {
        this.scrollDelta = this.maxTop
      } else if (this.scrollDelta < 0) {
        this.scrollDelta = 0
      }
    },
    bind() {
      this.bindRes = MouseWheel.bind(this.$refs.wrap, this.scroll, ({ dy, e, type }) => {
        if (type === 'wheelStart') {
          this.prevent = !((this.isBottom && dy >= 0) || (this.isTop && dy <= 0))
        }
        if (this.prevent) {
          e.preventDefault()
        }
        if (type === 'wheelEnd') {
          this.prevent = null
        }
      })
    },
    bindPan() {
      const deltaYFn = ev => ev.centerDelta && -ev.centerDelta.deltaY || 0
      this.bindRes = Touch.pan(this.$refs.wrap, (ev) => {
        if (ev.type === 'panStart') this.begin.scrollDelta = this.scrollDelta
        this.begin.showBar = ev.type !== 'panEnd'
        this.scroll({
          deltaY: deltaYFn(ev),
          type: ev.type,
        })
      }, (ev) => {
        if (ev.type === 'touchmove' && this.prevent === null) {
          const dy = deltaYFn(ev)
          this.prevent = !((this.isBottom && dy >= 0) || (this.isTop && dy <= 0))
        }
        if (this.prevent) {
          ev.event.preventDefault()
        }
        if (ev.type === 'touchend') {
          this.prevent = null
        }
      })
    },
  },
}
</script>
