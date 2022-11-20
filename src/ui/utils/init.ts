import { rootId } from './constants'

// check if figma is mounted in window by polling every 300ms
function poll (next: () => void) {
  let timerId = setTimeout(function () {
    const { figma } = window
    if (!figma) {
      poll(next)
    } else {
      next()
      clearTimeout(timerId)
    }
  }, 300)
}

export function injectRootNode(callback) {
  window.onload = function () {
    const inspector = document.createElement('div')
    inspector.id = rootId
    document.body.appendChild(inspector)
    poll(function () {
      callback && callback()
    })
  }
}

