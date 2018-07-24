<template>
  <div class="scrollbar-wrap" :style="_wrapStyle" @mouseover="bind" @mouseout="bindRes&&bindRes()"
       ref="wrap">
    <div class="scrollbar-content" :style="_contentStyle" ref="content">
      <slot/>
    </div>
    <div v-if="showBar" class="scrollbar" :draggable="false" :style="_barStyle"
         @mousedown="drag"></div>
  </div>
</template>

<script>
import MouseWheel from '@livelybone/mouse-wheel';

export default {
  name: 'Scrollbar',
  mounted() {
    this.height = this.getHeight();
  },
  props: {
    maxHeight: [Number, String],
    wrapStyle: Object,
    contentStyle: Object,
    barStyle: Object,
  },
  data() {
    return {
      height: {},
      bindRes: null,
      scrollDelta: 0,
      isBottom: false,
      isTop: true,
      begin: { showBar: false, x: 0, y: 0, scrollDelta: 0 },
    };
  },
  computed: {
    wrapHeight() {
      return typeof this.maxHeight === 'number' ? `${this.maxHeight}px` : this.maxHeight;
    },
    showBar() {
      const { height } = this;
      return height.content && height.wrap < height.content;
    },
    _wrapStyle() {
      const maxHeight = this.wrapHeight;
      return { ...this.wrapStyle, maxHeight };
    },
    _barStyle() {
      if (!this.showBar) return null;
      const { height } = this;
      return {
        ...this.barStyle,
        ...(this.begin.showBar ? { display: 'block' } : {}),
        height: `${(height.wrap * height.wrap) / height.content}px`,
        top: `${this.scrollDelta}px`,
      };
    },
    _contentStyle() {
      const { height } = this;
      return {
        ...this.contentStyle,
        top: `${(-this.scrollDelta * height.content) / height.wrap}px`,
      };
    },
  },
  methods: {
    getHeight() {
      if (!this.$refs.wrap) return { wrap: 0, content: 0 };
      return {
        wrap: this.$refs.wrap.clientHeight,
        content: this.$refs.content.clientHeight,
      };
    },
    scroll(ev) {
      this.isTop = false;
      this.isBottom = false;
      const { height } = this;
      this.setDelta({ delta: ev.dy / height.content * height.wrap });
    },
    drag(ev) {
      const e = ev || window.event;
      if (e.type === 'mousedown') {
        this.begin.x = e.clientX;
        this.begin.y = e.clientY;
        this.begin.scrollDelta = this.scrollDelta;
        this.begin.showBar = true;
        window.addEventListener('mousemove', this.drag);
        window.addEventListener('mouseup', this.drag);
      } else if (e.type === 'mousemove') {
        this.setDelta({ value: e.clientY - this.begin.y + this.begin.scrollDelta });
      } else if (e.type === 'mouseup') {
        this.begin.showBar = false;
        window.removeEventListener('mousemove', this.drag);
        window.removeEventListener('mouseup', this.drag);
      }
    },
    setDelta({ delta = 0, value = 0 }) {
      const { height } = this;
      if (delta) this.scrollDelta += delta;
      else if (value) this.scrollDelta = value;
      const maxTop = height.wrap - height.wrap * height.wrap / height.content;
      if (this.scrollDelta > maxTop) {
        this.scrollDelta = maxTop;
        this.isBottom = true;
      } else if (this.scrollDelta < 0) {
        this.scrollDelta = 0;
        this.isTop = true;
      }
    },
    bind() {
      this.bindRes = MouseWheel.bind(this.$refs.wrap, this.scroll, ({ dy, e }) => {
        if (!(this.isBottom && dy > 0) && !(this.isTop && dy < 0)) {
          e.preventDefault();
        }
      });
    },
  },
};
</script>
