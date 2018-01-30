var testcafe = require('testcafe')
var Selector = testcafe.Selector

fixture`Getting Started`
  .page`../dist/index.html`

test('Add 3 messages and click through all 3', async (t) => {
  await t
    .click(Selector('.add-message'))

  await t
    .click(Selector('.add-message'))

  await t
    .click(Selector('.add-message'))

  const content1 = await Selector('.firstup-slot').textContent
  await t
    .click(Selector('button.firstup-close'))
    .expect(content1).eql('Hello 0 next item')

  const content2 = await Selector('.firstup-slot').textContent
  await t
    .click(Selector('button.firstup-close'))
    .expect(content2).eql('Hello 1 next item')

  const content3 = await Selector('.firstup-slot').textContent
  await t
    .click(Selector('button.firstup-close'))
    .expect(content3).eql('Hello 2 next item')
})
