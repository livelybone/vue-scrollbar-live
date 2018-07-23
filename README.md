# vue-scrollbar-live 
<img src="https://img.shields.io/badge/vue--scrollbar--live-static-blue.svg">
<img src="https://img.shields.io/badge/gzip-2.08kb-green.svg">

A vue scrollbar component for PC, surpported SSR.

## repository
https://github.com/livelybone/vue-scrollbar-live.git

## Demo
https://github.com/livelybone/vue-scrollbar-live#readme

## Installation
```bash
npm i -D vue-scrollbar-live
```

## Register
```js
import Scrollbar from 'vue-srollbar-live';

// 引入css
import 'vue-srollbar-live/lib/index.css';

// Global register
Vue.component('scrollbar', Scrollbar);

// Local register
new Vue({
  components:{Scrollbar}
})
```

## props
| Name          | Type                                      | DefaultValue         | Description  |
| ------------- | ----------------------------------------- | -------------------- | ------------ |
| `maxHeight`   | `[String, Number]`                        | none                 | Used to set style max-height of the wrap `.scrollbar-wrap`.$/ |
| `wrapStyle`   | `Object`                                  | none                 | Used to set the style of the wrap `.scrollbar-wrap`. |
| `contentStyle`| `Object`                                  | none                 | Used to set the style of the content wrap `.scrollbar-content`. |
| `barStyle`    | `Object`                                  | none                 | Used to set the style of the bar `.scrollbar`. |
