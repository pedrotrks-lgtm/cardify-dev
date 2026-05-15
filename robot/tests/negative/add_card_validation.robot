*** Settings ***
Resource    ../../resources/common.robot


*** Test Cases ***

Validar Campos Obrigatórios
    [Tags]    negative    regression

    Abrir Cardfy

    Salvar Cartão

    Validar Mensagem Obrigatória
    ...    Número do cartão é obrigatório

    Validar Mensagem Obrigatória
    ...    Nome do titular é obrigatório

    Validar Mensagem Obrigatória
    ...    Data de expiração é obrigatória

    Validar Mensagem Obrigatória
    ...    CVV é obrigatório

    Validar Mensagem Obrigatória
    ...    Selecione um banco

    Capturar Evidência

    Fechar Navegador


Validar Nome Inválido
    [Tags]    negative    regression

    Abrir Cardfy

    Preencher Nome Inválido

    Selecionar Banco Nubank

    Salvar Cartão

    Validar Mensagem Erro
    ...    Nome deve ter pelo menos 2 caracteres

    Capturar Evidência

    Fechar Navegador


Validar CVV Inválido
    [Tags]    negative    regression

    Abrir Cardfy

    Preencher CVV Inválido

    Selecionar Banco Nubank

    Salvar Cartão

    Validar Mensagem Erro
    ...    CVV deve ter 3 ou 4 dígitos

    Capturar Evidência

    Fechar Navegador


Validar Sem Selecionar Banco
    [Tags]    negative    regression

    Abrir Cardfy

    Preencher Dados Cartão

    Salvar Cartão

    Validar Mensagem Obrigatória
    ...    Selecione um banco

    Capturar Evidência

    Fechar Navegador    