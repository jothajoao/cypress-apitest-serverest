import 'cypress-plugin-api';


describe('Atualizar usuário', () => {
    it('Atualizar um usuário', () => {
        cy.api({
            method: "PUT",
            url: "/usuarios/yiQjKkyOXI09CfNy",
            body: {
                nome: "Joao Antonio de Souza",
                email: "jothajoao@example.org",
                password: Cypress.env('senhaAlterada'),
                administrador: "true",
            }                
        })
        .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal("Registro alterado com sucesso");
        })
    });

    it('Email ja cadastrado', () => {
        cy.api({
            method: "PUT",
            url: "/usuarios/yiQjKkyOXI09CfNy",
            body: {
                nome: "Joao Antonio de Souza",
                email: Cypress.env('emailInvalido'),
                password: Cypress.env('senhaAlterada'),
                administrador: "true",
            },
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal("Este email já está sendo usado");
        })
    });


});