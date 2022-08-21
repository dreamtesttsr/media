class E10{
    nazwaUzytkownika(){
        return cy.get('[data-cy="menu-navbar"]').parent('div').children('div').eq(1).children('div').children('a')
    }

    loginPoleTekstowe(){
        return cy.get('input#Username')
    }

    hasloPoleTekstowe(){
        return cy.get('input#Password')
    }

    zalogujPrzycisk(){
        return cy.get('#idMainLoginForm > .modal-dialog > .modal-content > .modal-body > :nth-child(3) > .btn') // zmiana tylko dla środowiska Verify gdzie mamy 2 Zaloguj się
    }
}

export const e10 = new E10()