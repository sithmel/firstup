var delegate = require('delegate')

function FirstUp (queue) {
  this.queue = queue
}

FirstUp.prototype.init = function init () {
  var handler = function (e) {
    this.removeContent()
    this.addContent()
  }

  delegate(document.body, '[data-firstup-next]', 'click', handler.bind(this), false)
}

FirstUp.prototype.addContent = function addContent () {
  var handler = function (notification) {
    var selector = notification.selector // string
    this.currentContent = notification.content // dom node
    var parentNode = document.querySelector(selector)
    parentNode.appendChild(this.currentContent)
  }

  this.queue.fetch(handler.bind(this))
}

FirstUp.prototype.removeContent = function removeContent () {
  this.currentContent.parentNode.removeChild(this.currentContent)
}

module.exports = FirstUp
