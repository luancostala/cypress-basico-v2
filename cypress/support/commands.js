Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Luãn')
    cy.get('#lastName').type('Lã')
    cy.get('#email').type('luan.la@autoglass.com.br')
    cy.get('#open-text-area').type('Teste-Text')
    cy.contains('button', 'Enviar').click()
})


