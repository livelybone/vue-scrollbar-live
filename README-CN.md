# vue-scrollbar-live
[![NPM Version](http://img.shields.io/npm/v/vue-scrollbar-live.svg?style=flat-square)](https://www.npmjs.com/package/vue-scrollbar-live)
[![Download Month](http://img.shields.io/npm/dm/vue-scrollbar-live.svg?style=flat-square)](https://www.npmjs.com/package/vue-scrollbar-live)
![gzip with dependencies: 4.9kb](https://img.shields.io/badge/gzip--with--dependencies-4.9kb-brightgreen.svg "gzip with dependencies: 4.9kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, 天然支持 tree-shaking, 使用 es module 引用即可

[English Document](./README.md)

A vue scrollbar component, support SSR.

## repository
https://github.com/livelybone/vue-scrollbar-live.git

## Demo
https://github.com/livelybone/vue-scrollbar-live#readme

## Run Example
你可以通过运行项目的 example 来了解这个组件的使用，以下是启动步骤：

1. 克隆项目到本地 `git clone https://github.com/livelybone/vue-scrollbar-live.git`
2. 进入本地克隆目录 `cd your-module-directory`
3. 安装项目依赖 `npm i`(使用 taobao 源: `npm i --registry=http://registry.npm.taobao.org`)
4. 启动服务 `npm run dev`
5. 在你的浏览器看 example (地址通常是 `http://127.0.0.1:3000/examples/test.html`)

## Installation
```bash
npm i -S vue-scrollbar-live
```

## Global name - The variable the module exported in `umd` bundle
`VueScrollbar`

## Interface
去 [index.d.ts](./index.d.ts) 查看可用方法和参数

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

## CDN
在 HTML 文件中直接引用，你可以在 [CDN: unpkg](https://unpkg.com/vue-scrollbar-live/lib/umd/) 看到你能用到的所有 js 脚本
```html
<-- 然后使用你需要的 -->
<script src="https://unpkg.com/vue-scrollbar-live/lib/umd/<--module-->.js"></script>
```

或者，你也可以使用 [CDN: jsdelivr](https://cdn.jsdelivr.net/npm/vue-scrollbar-live/lib/umd/) 看到你能用到的所有 js 脚本
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

> 你可能需要全局安装 node-sass，`npm i -g node-sass`

2. The domChange event not triggered when the sub dom changed.

> Check that the current browser support MutationObserver API.
> If not, you can use MutationObserver polyfill to solve this problem
