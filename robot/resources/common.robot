*** Settings ***
Library    SeleniumLibrary    screenshot_root_directory=results/screenshots
Library    ../libraries/utils.py

Resource    ../pages/card_page.robot


*** Variables ***
${URL}    http://localhost:5173/add


*** Keywords ***

Abrir Cardfy
    ${options}=    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver

    Evaluate    $options.add_argument('--headless')

    Evaluate    $options.add_argument('--window-size=1440,900')

    Create Webdriver
    ...    Chrome
    ...    options=${options}

    Go To    ${URL}

    Set Window Size    1440    900


Fechar Navegador
    Close Browser


Capturar Evidência
    Capture Page Screenshot


Validar Tela Inicial
    Wait Until Element Is Visible
    ...    tag:h1
    ...    10s

    Element Should Contain
    ...    tag:h1
    ...    Adicionar Novo Cartão


Preencher Dados Cartão
    ${nome}=    Gerar Nome
    ${cartao}=    Gerar Numero Cartao
    ${validade}=    Gerar Validade
    ${cvv}=    Gerar Cvv

    Preencher Formulário Cartão
    ...    ${cartao}
    ...    ${nome}
    ...    ${validade}
    ...    ${cvv}


Preencher Formulário Cartão
    [Arguments]
    ...    ${cartao}
    ...    ${nome}
    ...    ${validade}
    ...    ${cvv}

    Input Text
    ...    ${INPUT_CARTAO}
    ...    ${cartao}

    Input Text
    ...    ${INPUT_NOME}
    ...    ${nome}

    Input Text
    ...    ${INPUT_VALIDADE}
    ...    ${validade}

    Input Text
    ...    ${INPUT_CVV}
    ...    ${cvv}


Preencher Nome Inválido
    Preencher Formulário Cartão
    ...    4111111111111111
    ...    A
    ...    12/30
    ...    123


Preencher CVV Inválido
    Preencher Formulário Cartão
    ...    4111111111111111
    ...    Pedro Teste
    ...    12/30
    ...    1


Preencher Data Inválida
    Preencher Formulário Cartão
    ...    4111111111111111
    ...    Pedro Teste
    ...    01/20
    ...    123


Selecionar Banco Nubank
    Wait Until Element Is Visible
    ...    ${BOTAO_NUBANK}
    ...    10s

    Click Element
    ...    ${BOTAO_NUBANK}


Salvar Cartão
    Wait Until Element Is Visible
    ...    ${BOTAO_SALVAR}
    ...    10s

    Click Button
    ...    ${BOTAO_SALVAR}


Validar Mensagem Erro
    [Arguments]    ${mensagem}

    Wait Until Page Contains
    ...    ${mensagem}
    ...    10s


Validar Mensagem Obrigatória
    [Arguments]    ${mensagem}

    Wait Until Page Contains
    ...    ${mensagem}
    ...    10s


Validar Sucesso Cadastro
    Wait Until Page Contains
    ...    Cartão cadastrado com sucesso!
    ...    10s

