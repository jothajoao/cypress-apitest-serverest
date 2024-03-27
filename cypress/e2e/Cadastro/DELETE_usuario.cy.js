import 'cypress-plugin-api';

describe('Delete', () => {
    it('deletar um usuario', () => {
       cy.api({
           method: "DELETE",
           url: "/usuarios/z7ZSJPULlrEIKfKr",
       })
       .then((response) => {
           expect(response.status).to.equal(200);
           expect(response.body.message).to.equal("Registro excluído com sucesso")
       }) 
    });

    it(' Deletar usuário já excluído', () => {
        cy.api({
            method: "DELETE",
            url: "/usuarios/38V7Wy5U7tQwFg4G",
        })
        .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal("Nenhum registro excluído")
        })
    });

});