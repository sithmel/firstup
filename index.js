var delegate = require('delegate')

function firstUp (queue) {
  var currentContent

  function addContent () {
    queue.fetch(function (notification) {
      var selector = notification.selector // string
      currentContent = notification.content // dom node
      var parentNode = document.querySelector(selector)
      parentNode.appendChild(currentContent)
    })
  }

  function removeContent () {
    currentContent.parentNode.removeChild(currentContent)
  }

  delegate(document.body, '[data-firstup-next]', 'click', function (e) {
    removeContent()
    addContent()
  }, false)

  addContent()
}

module.exports = firstUp
