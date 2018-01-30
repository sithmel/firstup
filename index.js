var delegate = require('delegate')

function removeNode (node) {
  node.parentNode.removeChild(node)
}

function firstUp (queue, opts) {
  opts = opts || {}
  var closeSelector = opts.closeSelector || '[data-firstup-next]'
  var currentContent, onCreate, onRemove, delegation, timer

  function addContent () {
    onRemove && onRemove(currentContent)
    delegation && delegation.destroy()
    timer && clearTimeout(timer)

    queue.fetch(function (notification) {
      var selector = notification.selector // string
      var timeout = notification.timeout
      currentContent = notification.content // dom node
      onRemove = notification.onRemove || removeNode
      onCreate = notification.onCreate || function () {}
      var parentNode = document.querySelector(selector)
      parentNode.appendChild(currentContent)
      onCreate(currentContent)
      if (timeout) {
        timer = setTimeout(addContent, timeout)
      }
      delegation = delegate(currentContent, closeSelector, 'click', addContent, false)
    })
  }

  addContent()
}

module.exports = firstUp
