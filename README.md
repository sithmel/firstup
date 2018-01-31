FirstUp
=======
A browser render scheduler.

This module allows to show html fragments, in a way that they are not displayed at the same time.

Fragments are queued and they are then displayed one at the time.
The package is in pure es5/vanilla js to ease integration with old browsers.

How to use it
-------------
You will need a queue from where to pick up fragments data.
[qoda](https://www.npmjs.com/package/qoda) implements the interface you need.

First import the packages and wire the queue to firstUp:
```js
var Qoda = require('qoda');
var FirstUp = require('firstup');
var qoda = Qoda();

var firstUp = new FirstUp(qoda);
```
You can queue fragments with:
```js
qoda.push({ content: 'Hello' });
```
By default firstUp will create a dom node under the dom node that matches the selector ".firstup-slot".
At this point the fragment is responsible to remove itself when it is not needed.
After removing itself we can render the next item on the queue calling:
```js
firstUp.next();
```
You can push multiple objects.

Options
-------
firstUp takes an option object as second argument. You can pass a custom render method to deal with the data coming from the queue:
```js
var firstUp = new FirstUp(qoda, {
  render: (data, firstUp) => {
    if (window.confirm(data.message)) {
      firstUp.next()
    }
  }
});
```
You can also pass the render method in the queue, this will override the default.
The render method takes as arguments the object coming out of the queue and the firstUp instance.
Using the firstUp instance you can call "next" or inspecting the queue "queue" (look at qoda documentation).
