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

function FirstUp (queue, opts) {
  if (!(this instanceof FirstUp)) {
    return new FirstUp(queue, opts)
  }

  opts = opts || {}
  this.queue = queue
  this.defaultRender = opts.render || renderNode
  this.waitingForQueue = false
  this.next()
}

FirstUp.prototype.next = function next () {
  if (this.waitingForQueue) return
  this.waitingForQueue = true

  var handler = function (data) {
    this.waitingForQueue = false
    var render = data.render || this.defaultRender
    render.call(this, data, this)
  }

  this.queue.fetch(handler.bind(this))
}

module.exports = FirstUp
