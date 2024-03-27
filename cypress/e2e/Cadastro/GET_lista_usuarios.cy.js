import 'cypress-plugin-api';


describe('Listar usuarios', () => {

    it('Listar todos os usuarios', () => {
        cy.api({
            mmethod: "GET",
            url: "/usuarios/",
        })
        .then((response) => {
            expect(response.status).to.eq(200); // Verifica se a resposta tem status 200
            expect(response.body.usuarios.length).to.be.greaterThan(0); // Verifica se o tamanho do array 'usuarios' é maior que 0
            expect(response.body).to.have.property('quantidade').that.is.a('number'); // Verifica se a propriedade 'quantidade' existe e se é um número
        })
    });



    it('Listar um usuário por ID', () => {
        cy.api({
            mmethod: "GET",
            url: "/usuarios/38V7Wy5U7tQwFg4G",
        })
        .then ((response) => {
            expect(response.status).to.eq(200); // Verifica se a resposta tem status 200
            expect(response.body.nome).to.equal("FakerLibrary.Name"); // Verifica se o nome do usuário é 'Fulano da Silva'
            expect(response.body.email).to.equal("gabriel88@example.org") // Verifica se o email do usuário é 'jfwcdijm@qacodres.com.br'
            expect(response.body.password).to.equal(Cypress.env('senhaValida')); // Verifica se a senha do usuario'
            expect(response.body._id).to.equal("38V7Wy5U7tQwFg4G");
        })  
    });



    it('Listar um usuário por ID inválido', () => {
        cy.api({
            mmethod: "GET",
            url:"/usuarios/38Dw6HQ4IhooHD5K", 
            failOnStatusCode: false
        })  
        .then ((response) => {
            expect(response.status).to.equal(400);  // Verifica se a resposta tem status 400
            expect(response.body.message).to.equal("Usuário não encontrado"); // Verifica se a mensagem de erro é 'Usuário não encontrado'
        })
    });


    it('Listar um usuário por ID valido', () => {
       cy.api({
           mmethod: "GET",
           url: "/usuarios/38V7Wy5U7tQwFg4G",         
       })
       .then ((response) => {
           expect(response.status).to.equal(200);
           expect(response.body.nome).to.equal("FakerLibrary.Name");
           expect(response.body.email).to.equal("gabriel88@example.org");
           expect(response.body.password).to.equal(Cypress.env('senhaValida'));
           expect(response.body._id).to.equal("38V7Wy5U7tQwFg4G")
       }) 
    });

})