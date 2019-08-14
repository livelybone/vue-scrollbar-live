// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue'

declare interface ScrollData {
  x: number
  y: number
}

export interface VueScrollbarProps {
  /**
   * If the env is mobile, the component use the native scrollbar
   *
   * Require
   * */
  isMobile: boolean

  /**
   * maxHeight of scroll wrap
   *
   * Require
   * */
  maxHeight: number | string

  /**
   * Set scrollLeft or scrollTop of scroll wrap
   *
   * Value range： 0 ~ 1
   * */
  scrollTo?: number | ScrollData

  /**
   * Set margin of the scrollbar relative to scroll wrap
   *
   * Default to 5
   * */
  marginToWrap?: number
}

declare class VueScrollbar extends Vue implements VueScrollbarProps {
  isMobile: boolean

  maxHeight: number | string

  scrollTo?: number | ScrollData

  marginToWrap?: number
}

export default VueScrollbar
