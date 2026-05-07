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

  it('Valida cartão duplicado', () => {

    cy.fixture('cards').then((data) => {

      cy.intercept('GET', 'http://wallet.cardfify.dev/api/cards', {
        statusCode: 200,
        body: [
          {
            id: 1,
            number: '4111111111111111'
          }
        ]
      }).as('getCards')

      cy.fillCardForm(data.duplicateCard)

      cy.contains('button', 'Adicionar Cartão').click()

      cy.wait('@getCards')

      cy.contains('Este cartão já foi cadastrado anteriormente.')
        .should('be.visible')

    })

  })

  it('Valida limite máximo de cartões', () => {

    cy.fixture('cards').then((data) => {

      cy.intercept('GET', 'http://wallet.cardfify.dev/api/cards', {
        statusCode: 200,
        body: data.limitCards
      }).as('getCards')

      cy.fillCardForm(data.validCard)

      cy.intercept('POST', 'http://wallet.cardfify.dev/api/cards').as('addCard')

      cy.contains('button', 'Adicionar Cartão').click()

      cy.wait('@getCards')

      cy.contains('Você já cadastrou 3 cartões. Para gerenciar mais cartões, considere migrar para o plano Pro.')
        .should('be.visible')

      cy.contains('Clique aqui para fazer o Upgrade')
        .should('be.visible')

      cy.get('@addCard.all').should('have.length', 0)

    })

  })


})