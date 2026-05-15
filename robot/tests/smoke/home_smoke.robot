*** Settings ***
Resource    ../../resources/common.robot

*** Test Cases ***
Validar Home Cardfy
    [Tags]    smoke

    Abrir Cardfy

    Validar Tela Inicial

    Capturar Evidência

    Fechar Navegador