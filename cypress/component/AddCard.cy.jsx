import React from 'react'
import AddCard from '../../src/pages/AddCard'

Cypress.Commands.add('alertErrorHaveText', (selector, expectedText) => {
  cy.contains(selector, expectedText)
    .should('be.visible')
})

Cypress.Commands.add('fillCardForm', (card) => {
  cy.contains('label', 'Número do Cartão').parent().find('input').type(card.number)
  cy.contains('label', 'Nome do Titular').parent().find('input').type(card.holderName)
  cy.contains('label', 'Validade').parent().find('input').type(card.expirationDate)
  cy.contains('label', 'CVV').parent().find('input').type(card.cvv)
  cy.contains('button', card.bankLabel).click()
})

describe('<AddCard />', () => {

  beforeEach(() => {
    cy.viewport(1440, 900)
    cy.mount(<AddCard />)
  })

  it('Valida mensagem de campos obrigatórios', () => {

    cy.contains('button', 'Adicionar Cartão').click()

    const alerts = [
      'Número do cartão é obrigatório',
      'Nome do titular é obrigatório',
      'Data de expiração é obrigatória',
      'CVV é obrigatório',
      'Selecione um banco'
    ]

    alerts.forEach((alert) => {
      cy.alertErrorHaveText('.alert-error', alert)
    })
  })

  it('Valida Cadastrar um cartão novo', () => {
    const myCard = {
      number: '5116 6096 7668 2899',
      holderName: 'Pedro Teste',
      expirationDate: '12/30',
      cvv: '123',
      bankLabel: 'Nubank'
    }

    cy.intercept('POST', 'http://wallet.cardfify.dev/api/cards', (req) => {
      req.reply({
        statusCode: 201,
        body: { ...myCard, id: 1 }
      })
    }).as('addCard')

cy.fillCardForm(myCard)

    cy.contains('button', 'Adicionar Cartão').click()
    cy.wait('@addCard')

    cy.contains('Cartão cadastrado com sucesso!').should('be.visible')
  })

  it('Valida nome com menos de 2 caracteres', () => {
    const myCard = {
      number: '5116 6096 7668 2899',
      holderName: 'P',
      expirationDate: '12/30',
      cvv: '123',
      bankLabel: 'Nubank'
    }

cy.fillCardForm(myCard)

    cy.contains('button', 'Adicionar Cartão').click()

    cy.contains('Nome deve ter pelo menos 2 caracteres').should('be.visible')
  })

  it('ValidaData de expiração inválida1', () => {
    const myCard = {
      number: '5116 6096 7668 2899',
      holderName: 'Pedro Teste 1',
      expirationDate: '13/30',
      cvv: '123',
      bankLabel: 'Nubank'
    }

cy.fillCardForm(myCard)

    cy.contains('button', 'Adicionar Cartão').click()

    cy.contains('Data de expiração inválida ou vencida').should('be.visible')
  })

  it('Valida Data de expiração inválida2', () => {
    const myCard = {
      number: '5116 6096 7668 2899',
      holderName: 'Pedro Teste 2',
      expirationDate: '12/00',
      cvv: '123',
      bankLabel: 'Nubank'
    }

cy.fillCardForm(myCard)

    cy.contains('button', 'Adicionar Cartão').click()

    cy.contains('Data de expiração inválida ou vencida').should('be.visible')
  })

  it('ValidaCVV inválido', () => {
    const myCard = {
      number: '5116 6096 7668 2899',
      holderName: 'Pedro Teste',
      expirationDate: '01/30',
      cvv: '12',
      bankLabel: 'Nubank'
    }

    cy.fillCardForm(myCard)

    cy.contains('button', 'Adicionar Cartão').click()

    cy.contains('CVV deve ter 3 ou 4 dígitos').should('be.visible')
  })

    it('Valida Não selecionar nenhum banco', () => {
    const myCard = {
      number: '5116 6096 7668 2899',
      holderName: 'Pedro Teste',
      expirationDate: '01/30',
      cvv: '123',
      bankLabel: 'Nubank'
    }

    cy.contains('label', 'Número do Cartão').parent().find('input').type(myCard.number)
    cy.contains('label', 'Nome do Titular').parent().find('input').type(myCard.holderName)
    cy.contains('label', 'Validade').parent().find('input').type(myCard.expirationDate)
    cy.contains('label', 'CVV').parent().find('input').type(myCard.cvv)
    //cy.contains('button', myCard.bankLabel).click()

    cy.contains('button', 'Adicionar Cartão').click()

    cy.contains('Selecione um banco').should('be.visible')
  })

})