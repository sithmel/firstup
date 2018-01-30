var Qoda = require('qoda')
var firstUp = require('..')

var qoda = Qoda()

firstUp(qoda)

var counter = 0
var addMessage = document.querySelector('.add-message')

addMessage.addEventListener('click', function () {
  var content = document.createElement('div')
  content.innerHTML = 'Hello ' + (counter++) + ' <button class="firstup-close">next item</button>'
  qoda.push({ content: content })
})

/*
example with react
*/
var React = require('react')
var ReactDOM = require('react-dom')

// function Hello (props) {
//   return React.createElement('div', null, props.message)
// }

class Hello extends React.Component {
  constructor (props) {
    super(props)
    this.state = { message: '' }
  }
  render () {
    return React.createElement('div', null, this.state.message)
  }
}

var element = React.createElement(Hello)

ReactDOM.render(
  element,
  document.querySelector('.firstup-slot-react')
)

var qoda2 = Qoda()

firstUp(qoda2, {
  render: function (obj, queue) {
    element.setState({ message: obj.message })
  },
  remove: function (node, queue) {
    element.setState({ message: '' })
  }
})

var addMessageReact = document.querySelector('.add-message-react')

addMessageReact.addEventListener('click', function () {
  qoda2.push({ message: 'hello ' + (counter++), timeout: 1000 })
})
