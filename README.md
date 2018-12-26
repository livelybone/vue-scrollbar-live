# vue-scrollbar-live 
![static](https://img.shields.io/badge/vue--scrollbar--live-static-blue.svg "static")
![gzip: 3.2kb](https://img.shields.io/badge/gzip-3.2kb-green.svg "gzip: 3.2kb")
![mobile supported](https://img.shields.io/badge/mobile-supported-green.svg "mobile supported")

A vue scrollbar component, supports SSR.

## repository
https://github.com/livelybone/vue-scrollbar-live.git

## Demo
https://livelybone.github.io/vue/vue-scrollbar-live

## Installation
```bash
npm i -S vue-scrollbar-live
```

## Register
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

## Rewrite style
You can rewrite the style. the css file content maybe like:
```scss
  .scrollbar-wrap {
    ...
    
    &:hover {
    ...
    
      .scrollbar{
        ... 
      }
    }
  
    .scrollbar-content {
      ...
    }
  
    .scrollbar {
      ...
    }
  }
```

## Attention for application
If you put the component at a div that is `display:none`, the component may be will not work

There are two solutions:

1. Set `opacity: 0; pointer-events: none;` instead of `display: none`
2. Use `v-if` instead of set `display: none`