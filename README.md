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
import 'vue-srollbar-live/lib/css/index.css';

// Global register
Vue.component('scrollbar', Scrollbar);

// Local register
new Vue({
  components:{Scrollbar}
})
```

## Props
| Name          | Type                                      | DefaultValue         | Description  |
| ------------- | ----------------------------------------- | -------------------- | ------------ |
| `maxHeight`   | `[String, Number]`                        | none                 | Used to set style max-height of the wrap `.scrollbar-wrap`.$/ |
| `scrollTo`    | `Number`                                  | `0`                  | Used to set scroll y of the content wrap `.scrollbar-content`. value: `0 ~ 1`$/ |
| `wrapStyle`   | `Object`                                  | none                 | Used to set the style of the wrap `.scrollbar-wrap`. |
| `contentStyle`| `Object`                                  | none                 | Used to set the style of the content wrap `.scrollbar-content`. |
| `barStyle`    | `Object`                                  | none                 | Used to set the style of the bar `.scrollbar`. |

## Events
| Name                  | EmittedData           | Description                                       |
| --------------------- | --------------------- | ------------------------------------------------- |
| `wrapClick`           | `event`               | `click` event of the wrap                         |
| `startDrag`           | `Object`              | `mousedown` event of the scrollbar                |
| `endDrag`             | `Object`              | `mouseup` event of the scrollbar                  | 

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