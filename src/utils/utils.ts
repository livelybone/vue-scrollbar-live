export function insertStyle() {
  const id = 'vue-scrollbar-live-module-style'
  const styleExist = document.getElementById(id)
  if (!styleExist) {
    const style = document.createElement('style')
    style.id = id
    style.innerText =
      '.scrollbar-wrap .scrollbar-content::-webkit-scrollbar{width:0;height:0;}' +
      '.scrollbar-wrap .scrollbar-content{-ms-overflow-style:none;scrollbar-width:none;}' +
      '.scrollbar-wrap .scrollbar{position:absolute;border-radius:.25em;background:#eee;box-shadow:0 0 2px rgba(0,0,0,0.1);opacity:0;pointer-events:none}' +
      '.scrollbar-wrap .scrollbar-y{right:0.25em;width:.5em}' +
      '.scrollbar-wrap .scrollbar-x{bottom:0.25em;height:.5em}' +
      '.scrollbar-wrap:hover .scrollbar{opacity:1;pointer-events:initial}'
    document.head.appendChild(style)
  }
}
