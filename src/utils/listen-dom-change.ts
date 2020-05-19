// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue'

export function listenDomChange(comp: Vue, cb: () => void) {
  if ('MutationObserver' in window) {
    const observer = new MutationObserver(records => {
      const childrenChangeExceptScrollbar = records.some(r => {
        const { target } = r
        if (comp.$el.contains(target)) {
          if (!(target instanceof Element)) return true

          const { className } = target
          return !/^scrollbar\s/.test(className)
        }
        return target.contains(comp.$el)
      })
      if (childrenChangeExceptScrollbar) cb()
    })
    observer.observe(document.body, {
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
