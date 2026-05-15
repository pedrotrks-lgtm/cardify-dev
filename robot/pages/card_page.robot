*** Variables ***
${INPUT_CARTAO}      xpath=//input[@placeholder="1234 5678 9012 3456"]

${INPUT_NOME}        xpath=//input[@placeholder="FULANO DE TAL"]

${INPUT_VALIDADE}    xpath=//input[@placeholder="MM/AA"]

${INPUT_CVV}         xpath=//input[@placeholder="123"]

${BOTAO_SALVAR}      xpath=//button[@type="submit"]

${MENSAGEM_ERRO}     xpath=//div[contains(., "Erro ao salvar cartão")]

${BOTAO_NUBANK}      xpath=//button[contains(., "Nubank")]