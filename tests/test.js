/* eslint-env testcafe */
var testcafe = require('testcafe')
var Selector = testcafe.Selector

fixture`Getting Started`// declare the fixture
  .page`../dist/index.html`

// then create a test and place your code there
test('My first test', async (t) => {
  await t
    .expect(Selector('#test').innerText).eql('testing')
})
