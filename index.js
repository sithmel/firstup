var delegate = require('delegate')

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
  return node
}

function removeNode (node, queue) {
  node.parentNode.removeChild(node)
  return node
}

function firstUp (queue, opts) {
  opts = opts || {}
  var defaultCloseSelector = opts.closeSelector || '.firstup-close'
  var defaultTimeout = opts.timeout

  var defaultRemove = opts.remove || removeNode
  var defaultRender = opts.render || renderNode
  var currentContent, delegation, remove, timer

  function addContent () {
    remove && remove(currentContent, queue)
    delegation && delegation.destroy()
    timer && clearTimeout(timer)

    queue.fetch(function (notification) {
      var render = notification.render || defaultRender
      var timeout = notification.timeout || defaultTimeout

      var closeSelector = notification.closeSelector || defaultCloseSelector

      currentContent = render(notification, queue)
      remove = notification.remove || defaultRemove

      if (timeout) {
        timer = setTimeout(addContent, timeout)
      }
      delegation = delegate(document, closeSelector, 'click', addContent, false)
    })
  }

  addContent()
}

module.exports = firstUp
