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
    .click(Selector('.next-message'))
    .expect(content1).eql('Hello (simple renderer) 0')

  const content2 = await Selector('.firstup-slot').textContent
  await t
    .click(Selector('.next-message'))
    .expect(content2).eql('Hello (simple renderer) 1')

  const content3 = await Selector('.firstup-slot').textContent
  await t
    .click(Selector('.next-message'))
    .expect(content3).eql('Hello (simple renderer) 2')
})
