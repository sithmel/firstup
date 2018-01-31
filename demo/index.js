var React = require('react')
var ReactDOM = require('react-dom')
var Qoda = require('qoda')
var or = require('occamsrazor')
var firstUp = require('..')

var render = or()
var qoda = Qoda()

var firstUpAPI = firstUp(qoda, { render })

render.add((o) => 'content' in o, function renderNode (obj, queue) {
  var parentNode = document.querySelector('.firstup-slot')
  parentNode.appendChild(obj.content)
})

var counter = 0
var addMessage = document.querySelector('.add-message')
var addMessageReact = document.querySelector('.add-message-react')
var nextMessage = document.querySelector('.next-message')
var slot = document.querySelector('.firstup-slot')
nextMessage.addEventListener('click', function () {
  slot.innerHTML = ''
  firstUpAPI.next()
})

addMessage.addEventListener('click', function () {
  var content = document.createElement('div')
  content.innerHTML = 'Hello ' + (counter++)
  qoda.push({ content: content })
})

addMessageReact.addEventListener('click', function () {
  qoda.push({ message: 'hello ' + (counter++) })
})

class Hello extends React.Component {
  constructor (props) {
    super(props)
    this.state = { message: '' }
    const that = this
    render.add((o) => 'message' in o, function (obj, queue) {
      that.updateMessage(obj.message)
    })
  }

  updateMessage (message) {
    this.setState({ message })
  }

  resetMessage () {
    this.setState({ message: '' })
    firstUpAPI.next()
  }

  render () {
    const nextButton = React.createElement('button', { onClick: () => this.resetMessage() }, 'next')
    return React.createElement('div', null, [this.state.message, nextButton])
  }
}

var element = React.createElement(Hello)

ReactDOM.render(
  element,
  document.querySelector('.firstup-slot-react')
)
