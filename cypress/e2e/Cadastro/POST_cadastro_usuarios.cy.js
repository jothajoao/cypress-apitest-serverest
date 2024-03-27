import { faker} from '@faker-js/faker';
import 'cypress-plugin-api';

//Variaveis para ser usadas no teste
const nomeAleatorio = faker.person.fullName()
const emailAleatorio = faker.internet.email()
const adminAleatorio = Math.random() < 0.5 ? 'true' : 'false';

describe('Cadatro do usuario', () => {
  it('Cadastro realizado com sucesso', () => {
    cy.api({
      method: "POST",
      url: "/usuarios",
      body: {
        "nome": nomeAleatorio,
        "email": emailAleatorio,
        "password": Cypress.env('password'),
        "administrador": adminAleatorio,
        "password": Cypress.env('password'), // Usando o mesmo password
      }
    })
    .then((response) => {
        expect(response.status).to.eq(201); // Verifica se a resposta tem status 200
        expect(response.body.message).to.equal("Cadastro realizado com sucesso");
        expect(response.body._id).to.exist;
      });
  });

  it('Cadastrando um nome em branco', () => {
    cy.api({
      method: "POST",
      url: "/usuarios",
      body: {
        "nome": "",
        "email": emailAleatorio,
        "password": Cypress.env('password'),
        "administrador": adminAleatorio,
      },
      failOnStatusCode: false
    })
    .then((response) => {
        expect(response.status).to.eq(400); // Verifica se a resposta tem status 400
        expect(response.body.nome).to.equal("nome não pode ficar em branco");
        expect(response.body._id).to.not.exist;
      })
  });

  it('Cadastrando um email em branco', () => {
    cy.api({
      method: "POST",
      url: "/usuarios",
      body: {
        "nome": nomeAleatorio,
        "email": "",
        "password": Cypress.env('password'),
        "administrador": adminAleatorio,
      },
      failOnStatusCode: false
    })
    .then((response) => {
        expect(response.status).to.eq(400); // Verifica se a resposta tem status 400
        expect(response.body.email).to.equal("email não pode ficar em branco");
        expect(response.body._id).to.not.exist;
      })
  });

  it('cadastrando uma senha em branco', () => {
    
    cy.api({
      method: "POST",
      url: "/usuarios",
      body: {
        "nome": nomeAleatorio,
        "email": emailAleatorio,
        "password": "",
        "administrador": adminAleatorio,
      },
      failOnStatusCode: false
    })
    .then((response) => {
        expect(response.status).to.eq(400); // Verifica se a resposta tem status 400
        expect(response.body.password).to.equal("password não pode ficar em branco");
        expect(response.body._id).to.not.exist;
      })
  });

  it('Cadastrando um administrador em branco', () => {
    cy.api({
      method: "POST",
      url: "/usuarios",
      body: {
        "nome": nomeAleatorio,
        "email": emailAleatorio,
        "password": Cypress.env('password'),
        "administrador": "",
      },
      failOnStatusCode: false
    })
    .then((response) => {
        expect(response.status).to.eq(400); // Verifica se a resposta tem status 400
        expect(response.body.administrador).to.equal("administrador deve ser 'true' ou 'false'");
        expect(response.body._id).to.not.exist;
      })
  });

  it('Cadastrando um email incorreto', () => {
    cy.api({
      method: "POST",
      url: "/usuarios",
      body: {
        "nome": nomeAleatorio,
        "email": '@teste.com',
        "password": Cypress.env('password'),
        "administrador": adminAleatorio, 
      },
      failOnStatusCode: false
    })
    .then((response) => {
        expect(response.status).to.eq(400); // Verifica se a resposta tem status 400
        expect(response.body.email).to.equal("email deve ser um email válido");
        expect(response.body._id).to.not.exist;
      })
  });

  it('Cadastrar usuário existente', () => {
    cy.api({
        method: 'POST',
        url: '/usuarios',
        body: {
            "nome": "Benicio Teste",
            "email": Cypress.env('emailInvalido'),
            "password": Cypress.env('password'),
            "administrador": "true"
          },
        failOnStatusCode: false
    })
    .then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal("Este email já está sendo usado");
    })
  });
});
    