Cypress.Commands.add('alertErrorHaveText', (selector, expectedText) => {
  cy.contains(selector, expectedText)
    .should('be.visible')
})

Cypress.Commands.add('fillCardForm', (card) => {

  cy.contains('label', 'Número do Cartão')
    .parent()
    .find('input')
    .type(card.number)

  cy.contains('label', 'Nome do Titular')
    .parent()
    .find('input')
    .type(card.holderName)

  cy.contains('label', 'Validade')
    .parent()
    .find('input')
    .type(card.expirationDate)

  cy.contains('label', 'CVV')
    .parent()
    .find('input')
    .type(card.cvv)

  if (card.bankLabel) {
    cy.contains('button', card.bankLabel).click()
  }
})