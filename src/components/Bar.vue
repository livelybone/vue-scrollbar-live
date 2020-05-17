<template>
  <div
    v-show="$_show"
    class="scrollbar"
    :class="'scrollbar-' + type"
    :style="$_barStyle"
    :draggable="false"
  ></div>
</template>

<script>
import { DragMove } from '@livelybone/mouse-events'

const scrollbarType = {
  x: {
    posPropName: 'left',
    parentScrollPos: 'scrollLeft',
    deltaName: 'deltaX',
    sizeName: 'width',
  },
  y: {
    posPropName: 'top',
    parentScrollPos: 'scrollTop',
    deltaName: 'deltaY',
    sizeName: 'height',
  },
}

const showStyle = {
  opacity: 1,
  pointerEvents: 'initial',
}

export default {
  name: 'Bar',
  props: {
    type: String,
    parentScroll: Number,
    marginToWrap: {
      type: Number,
      default: 5,
    },
    clientSize: Number,
    scrollSize: Number,
  },
  data() {
    return {
      sPosition: 0,
      showBar: false,
      unbind: null,
      startPosition: 0,
    }
  },
  computed: {
    $_show() {
      return this.scrollSize > this.clientSize
    },
    $_scrollbarType() {
      return scrollbarType[this.type]
    },
    size() {
      return (
        (this.clientSize / this.scrollSize) * this.clientSize -
        this.marginToWrap * 2
      )
    },
    positionRange() {
      return {
        min: this.marginToWrap,
        max: this.clientSize - this.marginToWrap - this.size,
      }
    },
    $_barStyle() {
      return {
        ...(this.showBar ? showStyle : {}),
        [this.$_scrollbarType.posPropName]: `${this.sPosition}px !important`,
        [this.$_scrollbarType.sizeName]: `${this.size}px !important`,
        userSelect: 'none',
      }
    },
  },
  watch: {
    $_show: {
      handler(val) {
        this.$nextTick(() => {
          if (this.unbind) this.unbind()
          if (val && typeof window !== 'undefined' && this.$el) {
            this.unbind = DragMove.bind(this.$el, this.drag)
          }
        })
      },
      immediate: true,
    },
    parentScroll: {
      handler(val) {
        this.sPosition =
          ((this.positionRange.max - this.positionRange.min) /
            (this.scrollSize - this.clientSize)) *
            val +
          this.positionRange.min
      },
      immediate: true,
    },
  },
  methods: {
    drag(ev) {
      ev.originalEvent.preventDefault()
      if (ev.type === 'dragMoveStart') this.startPosition = this.sPosition
      const position = Math.min(
        this.positionRange.max,
        Math.max(
          this.positionRange.min,
          this.startPosition + ev[this.$_scrollbarType.deltaName],
        ),
      )
      this.$emit('scrollTo', {
        [this.$_scrollbarType.parentScrollPos]:
          ((position - this.marginToWrap) /
            (this.positionRange.max - this.marginToWrap)) *
          (this.scrollSize - this.clientSize),
      })
      this.showBar = ev.type !== 'dragMoveEnd'
    },
  },
  beforeDestroy() {
    if (this.unbind) this.unbind()
  },
}
</script>
