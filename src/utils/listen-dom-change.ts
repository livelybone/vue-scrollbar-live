// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue'

export function listenDomChange(comp: Vue, cb: () => void) {
  if ('MutationObserver' in window) {
    const observer = new MutationObserver(records => {
      const childrenChangeExceptScrollbar = records.some(r => {
        if (!r.target) return true
        const { className } = r.target as any
        return !/^scrollbar\s/.test(className)
      })
      if (childrenChangeExceptScrollbar) cb()
    })
    observer.observe(comp.$el, {
      attributes: true,
      childList: true,
      subtree: true,
    })
    return () => {
      observer.disconnect()
    }
  }

  // If MutationObserver is not available, use updated lifecycle of Vue to call the cb
  // This will bring up a problem that the width/height data cannot be calculated at the right time in a async render scene
  comp.$on('hook:updated', cb)

  return () => {}
}
