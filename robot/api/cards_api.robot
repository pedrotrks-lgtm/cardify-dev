*** Settings ***
Library    RequestsLibrary
Library    ../libraries/utils.py


*** Variables ***
${BASE_URL}    http://localhost:3001


*** Test Cases ***

Validar API Listar Cartões
    [Tags]    api    smoke

    Create Session
    ...    cardfy
    ...    ${BASE_URL}

    ${response}=    GET On Session
    ...    cardfy
    ...    /cards

    Status Should Be
    ...    200
    ...    ${response}

    Log To Console
    ...    ${response.json()}

Validar API Criar Cartão
    [Tags]    api    regression

    Create Session
    ...    cardfy
    ...    ${BASE_URL}

    ${nome}=    Gerar Nome
    ${cartao}=    Gerar Numero Cartao
    ${validade}=    Gerar Validade
    ${cvv}=    Gerar Cvv

    ${body}=    Create Dictionary
    ...    number=${cartao}
    ...    holder=${nome}
    ...    expiration=${validade}
    ...    cvv=${cvv}
    ...    bank=Nubank

    ${response}=    POST On Session
    ...    cardfy
    ...    /cards
    ...    json=${body}

    Status Should Be
    ...    201
    ...    ${response}

    ${response_body}=    Set Variable
    ...    ${response.json()}

    Should Be Equal
    ...    ${response_body}[holder]
    ...    ${nome}

    Should Be Equal
    ...    ${response_body}[bank]
    ...    Nubank

    Should Not Be Empty
    ...    ${response_body}[id]

    Log To Console
    ...    ${response_body}