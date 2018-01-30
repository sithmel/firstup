var delegate = require('delegate')

function removeNode (node) {
  node.parentNode.removeChild(node)
}

function firstUp (queue) {
  var currentContent, onCreate, onRemove, delegation

  function addContent () {
    onRemove && onRemove(currentContent)
    delegation && delegation.destroy()

    queue.fetch(function (notification) {
      var selector = notification.selector // string
      currentContent = notification.content // dom node
      onRemove = notification.onRemove || removeNode
      onCreate = notification.onCreate || function () {}
      var parentNode = document.querySelector(selector)
      parentNode.appendChild(currentContent)
      onCreate(currentContent)
      delegation = delegate(currentContent, '[data-firstup-next]', 'click', addContent, false)
    })
  }

  addContent()
}

module.exports = firstUp
