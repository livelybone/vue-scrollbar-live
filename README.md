# vue-scrollbar-live
[![NPM Version](http://img.shields.io/npm/v/vue-scrollbar-live.svg?style=flat-square)](https://www.npmjs.com/package/vue-scrollbar-live)
[![Download Month](http://img.shields.io/npm/dm/vue-scrollbar-live.svg?style=flat-square)](https://www.npmjs.com/package/vue-scrollbar-live)
![gzip with dependencies: 4kb](https://img.shields.io/badge/gzip--with--dependencies-4kb-brightgreen.svg "gzip with dependencies: 4kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

A vue scrollbar component, support SSR.

How it works: Set the width of native scrollbar hidden -> append custom bar element to the wrap element

## repository
https://github.com/livelybone/vue-scrollbar-live.git

## Demo
https://livelybone.github.io/vue/vue-scrollbar-live/

## Installation
```bash
npm i -S vue-scrollbar-live
```

## Global name
`VueScrollbar`

## Usage
```js
import VueScrollbar from 'vue-scrollbar-live';

// 引入css
import 'vue-scrollbar-live/lib/css/index.css';

// Global register
Vue.component('scrollbar', VueScrollbar);

// Local register
new Vue({
  components:{VueScrollbar}
})
```

when you want to set this module as external while you are developing another module, you should import it like this:
```js
import * as VueScrollbar  from 'vue-scrollbar-live'

// then use it by need
```

Use in html, see what your can use in [CDN: unpkg](https://unpkg.com/vue-scrollbar-live/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/vue-scrollbar-live/lib/umd/<--module-->.js"></script>
```

## Props
See in [index.d.ts](./index.d.ts)
| Name            | Type                                      | DefaultValue         | Description  |
| -------------   | ----------------------------------------- | -------------------- | ------------ |
| `isMobile`      | `Boolean`                                 | `false`              | Mark the device that component be used |
| `maxHeight`     | `[String, Number]`                        | none                 | Used to set style max-height of the wrap `.scrollbar-wrap`.$/ |
| `scrollTo`      | `[Number, Object]`                        | `0`                  | Used to set scroll y of the content wrap `.scrollbar-content`. value: `0 ~ 1`$/ |
| `marginToWrap`  | `Number`                                  | `0`                  | Used to set scroll y of the content wrap `.scrollbar-content`. value: `0 ~ 1`$/ |

## Events
| Name                  | EmittedData           | Description                                       |
| --------------------- | --------------------- | ------------------------------------------------- |
| `wrapClick`           | `event`               | `click` event of the wrap                         |
| `reachBottom`         | none                  | Triggered when the scrollbar reach the bottom     |
| `reachTop`            | none                  | Triggered when the scrollbar reach the top        |
| `reachLeft`           | none                  | Triggered when the scrollbar reach the left       |
| `reachRight`          | none                  | Triggered when the scrollbar reach the right      |
| `startDrag`           | `Object`              | Drag start event of the scrollbar                 |
| `endDrag`             | `Object`              | Drag end event of the scrollbar                   | 

## style
Since 5.0.0， you don't need to import the css file in your project

For rewrite style, you can copy the `index.scss` or `index.css` file, rewrite it use `!important`(this is necessary), and the import the file in your project

## Attention for application
If you put the component at a div that is `display:none`, the component may be will not work

There are two solutions:

1. Set `opacity: 0; pointer-events: none;` instead of `display: none`
2. Use `v-if` instead of set `display: none`

## QA

1. Error `Error: spawn node-sass ENOENT`

> You may need install node-sass globally, `npm i -g node-sass`
