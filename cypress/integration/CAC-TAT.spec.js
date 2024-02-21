/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

    beforeEach(() => {
        cy.visit('src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Esse texto foi escrito por uma automação de testes, o intuito é usá-la como experimento de longo texto que será escrito de forma quase que imadiata, a ideia é ter um delay igual a 0'

        cy.get('#firstName').type('Luãn')
        cy.get('#lastName').type('Lã')
        cy.get('#email').type('luan.la@autoglass.com.br')
        cy.get('#phone').type('27996419906')
        cy.get('input[type=radio][value=elogio]').click()
        cy.get('#email-checkbox').click()
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success > strong').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Luãn')
        cy.get('#phone').type('27996419906')
        cy.get('input[type=radio][value=elogio]').click()
        cy.get('#email').type('luan.lA-teste.gg')
        cy.get('#email-checkbox').click()
        cy.get('#open-text-area').type('Teste de Sistema', { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.error > strong').should('be.visible')
    })

    it('Campo telefone vazio apos digitar letras', function () {
        cy.get('#phone').type('ABC').should('not.have.value')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Luãn')
        cy.get('#lastName').type('Lã')
        cy.get('#email').type('luan.la@autoglass.com.br')
        cy.get('input[type=radio][value=elogio]').click()
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste de Sistema', { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.error > strong').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone ', function () {
        cy.get('#firstName').type('Luãn').should('have.value', 'Luãn').clear().should('have.value', '')
        cy.get('#lastName').type('Lã').should('have.value', 'Lã').clear().should('have.value', '')
        cy.get('#email').type('luan.la@autoglass.com.br').should('have.value', 'luan.la@autoglass.com.br').clear().should('have.value', '')
        cy.get('#phone').type('27996419906').should('have.value', '27996419906').clear().should('have.value', '')
        cy.get('input[type=radio][value=elogio]').click()
        cy.get('#email-checkbox').click()
        cy.get('#open-text-area').type('Teste de Sistema', { delay: 0 }).should('have.value', 'Teste de Sistema').clear().should('have.value', '')
        cy.contains('button', 'Enviar').click()
        cy.get('.error > strong').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error > strong').should('be.visible')
    })

    it('Envia formulario com sucesso usando comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success > strong').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json')
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }) // "Arrastar o arquivo"
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json', { encoding: null }).as('exampleFile') // Aqui eu passo apenas a extensão que ja sabe a pasta padrão do cypress
        cy.get('#file-upload')
            .selectFile('@exampleFile')
            .then($input => {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })


})
