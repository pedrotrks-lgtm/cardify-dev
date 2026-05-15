class AddCardPage {

  fillCardForm(card) {

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
  }

  submit() {
    cy.contains('button', 'Adicionar Cartão').click()
  }

  validateSuccessMessage() {
    cy.contains('Cartão cadastrado com sucesso!')
      .should('be.visible')
  }

  validateErrorMessage(message) {
    cy.contains(message)
      .should('be.visible')
  }

}

export default new AddCardPage()