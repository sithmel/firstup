var Qoda = require('qoda')
var firstUp = require('..')

var qoda = Qoda()

firstUp(qoda)

var counter = 0
var addMessage = document.querySelector('.add-message')

addMessage.addEventListener('click', function () {
  var content = document.createElement('div')
  content.innerHTML = 'Hello ' + (counter++) + ' <button data-firstup-next>next item</button>'
  qoda.push({ content: content, selector: '.messages' })
})
