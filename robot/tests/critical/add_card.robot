*** Settings ***
Resource    ../../resources/common.robot

*** Test Cases ***
Cadastrar Cartão Com Sucesso
    [Tags]    critical    regression

    Abrir Cardfy

    Preencher Dados Cartão

    Selecionar Banco Nubank

    Salvar Cartão

    Validar Sucesso Cadastro

    Capturar Evidência

    Fechar Navegador