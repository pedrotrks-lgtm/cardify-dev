*** Settings ***
Resource    ../../resources/common.robot


*** Test Cases ***

Validar Cartão Criado Via API
    [Tags]    critical    api    regression

    Abrir Cardfy

    Wait Until Page Contains
    ...    Pedro Teste
    ...    10s

    Wait Until Page Contains
    ...    Nubank
    ...    10s

    Capturar Evidência

    Fechar Navegador

Validar Cartão Na Listagem API
    [Tags]    api    critical

    Create Session
    ...    cardfy
    ...    ${BASE_URL}

    ${response}=    GET On Session
    ...    cardfy
    ...    /cards

    Status Should Be
    ...    200
    ...    ${response}

    ${response_body}=    Set Variable
    ...    ${response.json()}

    Should Not Be Empty
    ...    ${response_body}

    Log To Console
    ...    ${response_body}