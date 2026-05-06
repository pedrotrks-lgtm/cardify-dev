import React from 'react'
import AddCard from '../../src/pages/AddCard'

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

  it('Valida cadastrar um cartão novo', () => {

    cy.fixture('cards').then((data) => {

      cy.intercept('POST', 'http://wallet.cardfify.dev/api/cards', {
        statusCode: 201,
        body: { ...data.validCard, id: 1 }
      }).as('addCard')

      cy.fillCardForm(data.validCard)

      cy.contains('button', 'Adicionar Cartão').click()

      cy.wait('@addCard')

      cy.contains('Cartão cadastrado com sucesso!')
        .should('be.visible')
    })
  })

  it('Valida nome com menos de 2 caracteres', () => {

    cy.fixture('cards').then((data) => {

      cy.fillCardForm(data.invalidName)

      cy.contains('button', 'Adicionar Cartão').click()

      cy.contains('Nome deve ter pelo menos 2 caracteres')
        .should('be.visible')
    })
  })

  it('Valida data de expiração inválida', () => {

    cy.fixture('cards').then((data) => {

      cy.fillCardForm(data.invalidExpirationDate)

      cy.contains('button', 'Adicionar Cartão').click()

      cy.contains('Data de expiração inválida ou vencida')
        .should('be.visible')
    })
  })

  it('Valida CVV inválido', () => {

    cy.fixture('cards').then((data) => {

      cy.fillCardForm(data.invalidCVV)

      cy.contains('button', 'Adicionar Cartão').click()

      cy.contains('CVV deve ter 3 ou 4 dígitos')
        .should('be.visible')
    })
  })

  it('Valida não selecionar nenhum banco', () => {

    cy.fixture('cards').then((data) => {

      const cardWithoutBank = {
        ...data.validCard,
        bankLabel: null
      }

      cy.fillCardForm(cardWithoutBank)

      cy.contains('button', 'Adicionar Cartão').click()

      cy.contains('Selecione um banco')
        .should('be.visible')
    })
  })

})