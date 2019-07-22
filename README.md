# vue-scrollbar-live
[![NPM Version](http://img.shields.io/npm/v/vue-scrollbar-live.svg?style=flat-square)](https://www.npmjs.com/package/vue-scrollbar-live)
[![Download Month](http://img.shields.io/npm/dm/vue-scrollbar-live.svg?style=flat-square)](https://www.npmjs.com/package/vue-scrollbar-live)
![gzip with dependencies: kb](https://img.shields.io/badge/gzip--with--dependencies-kb-brightgreen.svg "gzip with dependencies: kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

A vue scrollbar component, support SSR.

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
| Name          | Type                                      | DefaultValue         | Description  |
| ------------- | ----------------------------------------- | -------------------- | ------------ |
| `isMobile`    | `Boolean`                                 | `false`              | Mark the device that component be used |
| `maxHeight`   | `[String, Number]`                        | none                 | Used to set style max-height of the wrap `.scrollbar-wrap`.$/ |
| `scrollTo`    | `Number`                                  | `0`                  | Used to set scroll y of the content wrap `.scrollbar-content`. value: `0 ~ 1`$/ |
| `wrapStyle`   | `Object`                                  | none                 | Used to set the style of the wrap `.scrollbar-wrap`. |
| `contentStyle`| `Object`                                  | none                 | Used to set the style of the content wrap `.scrollbar-content`. |
| `barStyle`    | `Object`                                  | none                 | Used to set the style of the bar `.scrollbar`. |

## Events
| Name                  | EmittedData           | Description                                       |
| --------------------- | --------------------- | ------------------------------------------------- |
| `wrapClick`           | `event`               | `click` event of the wrap                         |
| `reachBottom`         | none                  | Triggered when the scrollbar reach the bottom     |
| `reachTop`            | none                  | Triggered when the scrollbar reach the top        |
| `startDrag`           | `Object`              | Drag start event of the scrollbar                 |
| `endDrag`             | `Object`              | Drag end event of the scrollbar                   | 

## style
For building style, you can use the css or scss file in lib directory.
```js
// scss
import 'node_modules/vue-scrollbar-live/lib/css/index.scss'

// css
import 'node_modules/vue-scrollbar-live/lib/css/index.css'
```
Or
```scss
// scss
@import 'node_modules/vue-scrollbar-live/lib/css/index.scss'

// css
@import 'node_modules/vue-scrollbar-live/lib/css/index.css'
```

Or, you can build your custom style by copying and editing `index.scss`

// TODO
## Attention for application
If you put the component at a div that is `display:none`, the component may be will not work

There are two solutions:

1. Set `opacity: 0; pointer-events: none;` instead of `display: none`
2. Use `v-if` instead of set `display: none`

## QA

1. Error `Error: spawn node-sass ENOENT`

> You may need install node-sass globally, `npm i -g node-sass`
