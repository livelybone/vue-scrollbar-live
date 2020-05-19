# vue-scrollbar-live
[![NPM Version](http://img.shields.io/npm/v/vue-scrollbar-live.svg?style=flat-square)](https://www.npmjs.com/package/vue-scrollbar-live)
[![Download Month](http://img.shields.io/npm/dm/vue-scrollbar-live.svg?style=flat-square)](https://www.npmjs.com/package/vue-scrollbar-live)
![gzip with dependencies: 4.9kb](https://img.shields.io/badge/gzip--with--dependencies-4.9kb-brightgreen.svg "gzip with dependencies: 4.9kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

[中文文档](./README-CN.md)

A vue scrollbar component, support SSR.

## repository
https://github.com/livelybone/vue-scrollbar-live.git

## Demo
https://github.com/livelybone/vue-scrollbar-live#readme

## Run Example
you can see the usage by run the example of the module, here is the step:

1. Clone the library `git clone https://github.com/livelybone/vue-scrollbar-live.git`
2. Go to the directory `cd your-module-directory`
3. Install npm dependencies `npm i`(use taobao registry: `npm i --registry=http://registry.npm.taobao.org`)
4. Open service `npm run dev`
5. See the example(usually is `http://127.0.0.1:3000/examples/test.html`) in your browser

## Installation
```bash
npm i -S vue-scrollbar-live
```

## Global name - The variable the module exported in `umd` bundle
`VueScrollbar`

## Interface
See what method or params you can use in [index.d.ts](./index.d.ts)

## Usage
```js
import VueScrollbar from 'vue-scrollbar-live';

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

## CDN
Use in html, see what you can use in [CDN: unpkg](https://unpkg.com/vue-scrollbar-live/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/vue-scrollbar-live/lib/umd/<--module-->.js"></script>
```

Or，see what you can use in [CDN: jsdelivr](https://cdn.jsdelivr.net/npm/vue-scrollbar-live/lib/umd/)
```html
<script src="https://cdn.jsdelivr.net/npm/vue-scrollbar-live/lib/umd/<--module-->.js"></script>
```

## style
Since 5.0.0， you don't need to import the css file in your project

For rewrite style, you can copy the `index.scss` or `index.css` file, rewrite it use `!important`(this is necessary), and the import the file in your project

## Props
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
| `scroll`              | `Event`               | Native scroll event                               | 
| `domChange`           | none                  | Triggered when the dom that refer to this comp changed        | 

## QA

1. Error `Error: spawn node-sass ENOENT`

> You may need install node-sass globally, `npm i -g node-sass`

2. The domChange event not triggered when the sub dom changed.

> Check that the current browser support MutationObserver API.
> If not, you can use MutationObserver polyfill to solve this problem
