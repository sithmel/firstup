FirstUp
=======
A browser notification scheduler.

This module allows to show html fragments, in a way that they are not displayed at the same time.

Fragments are queued and they are then displayed one at the time. Fragments can have a timeout or can be closed with a button.
The package is in pure es5/vanilla js to ease integration with old browsers.

How to use it
-------------
You will need a queue from where to pick up fragments data.
[qoda](https://www.npmjs.com/package/qoda) implements the interface we need.

First import the packages and wire the queue to firstUp:
```js
var Qoda = require('qoda');
var firstUp = require('firstup');
var qoda = Qoda();

firstUp(qoda);
```
From now on we can queue fragments with:
```js
var content = document.createElement('div')
content.innerHTML = 'Hello <button data-firstup-next>next item</button>'
qoda.push({ content: content, selector: '.messages' });
```
You can push multiple objects.
firstUp will paste the DOM node inside "content" under the DOM node that matches the "selector" property (.messages in the previous example).
Clicking the button with the attribute "data-firstup-next", the fragment is removed and the next one (if available) will be processed.

The fragment object
-------------------
The only mandatory field is content. This is a DOM node (possibly detached from the DOM). You can also pass one of more of these options:

* **selector**: is the selector of the container that is going to contain the fragment
* **closeSelector**: is a string with the selector of the element that triggers the next item
* **timeout**: it removes the fragment automatically after a certain amount of time
* **removeNode**: this function is used to remove a fragment
* **createNode**: this function runs on the newly created fragment

Options
-------
The firstUp function can take as argument an option object. They can be used as defaults of the parameter sent in the fragment object:
```js
firstUp(qoda, {
  closeSelector: '[data-firstup-next]',
  timeout: 0, // no timeout
  removeNode: function (node) { node.parentNode.removeChild(node) },
  createNode: function () {},
});
```
