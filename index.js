function renderNode (obj, queue) {
  var node
  var content = obj.content
  if (content instanceof window.Node) {
    node = content
  } else {
    node = document.createElement('div')
    node.innerHTML = content
  }
  var parentNode = document.querySelector('.firstup-slot')
  parentNode.appendChild(node)
}

function firstUp (queue, opts) {
  opts = opts || {}
  var defaultRender = opts.render || renderNode
  var waitingForQueue = false

  function addContent () {
    if (waitingForQueue) return
    waitingForQueue = true
    queue.fetch(function (notification) {
      waitingForQueue = false
      var render = notification.render || defaultRender
      render(notification, queue)
    })
  }

  addContent()

  return {
    next: addContent
  }
}

module.exports = firstUp
