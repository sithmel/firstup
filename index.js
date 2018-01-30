var delegate = require('delegate')

function removeNode (node) {
  node.parentNode.removeChild(node)
}

function createNode (node) {}

function firstUp (queue, opts) {
  opts = opts || {}
  var defaultSelector = opts.selector || '.messages'
  var defaultCloseSelector = opts.closeSelector || '[data-firstup-next]'
  var defaultTimeout = opts.timeout
  var defaultRemoveNode = opts.removeNode || removeNode
  var defaultCreateNode = opts.createNode || createNode

  var currentContent, onCreate, onRemove, delegation, timer

  function addContent () {
    onRemove && onRemove(currentContent)
    delegation && delegation.destroy()
    timer && clearTimeout(timer)

    queue.fetch(function (notification) {
      var selector = notification.selector || defaultSelector
      var timeout = notification.timeout || defaultTimeout
      var closeSelector = notification.closeSelector || defaultCloseSelector
      currentContent = notification.content // dom node
      onRemove = notification.onRemove || defaultRemoveNode
      onCreate = notification.onCreate || defaultCreateNode
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
