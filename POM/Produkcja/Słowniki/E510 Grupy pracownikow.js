class E510 {
    
    // Selektory
    grupaPracownikowLista(){
        return cy.get('#SelectedGroupId')
    }

    dodajGrupePrzycisk(){
        return cy.get('#addGroupBtn')
    }

    usunGrupePrzycisk(){
        return cy.get('#removeGroupBtn')
    }

    zapiszPrzycisk(){
        return cy.get('#saveForm').contains('Zapisz')
    }

    pracownikLista(){
        return cy.get('#SelectedWorker')
    }

    dodajPracownikaPrzycisk(){
        return cy.get('#addPersonBtn')
    }

    usunPracownikaPierwszyPrzycisk(){
        return cy.get('#deletPersonBtn0')
    }

    // Metody
    sprawdzWidok(){
        cy.get('.active').should('contain', 'Grupy pracowników')
        this.grupaPracownikowLista().should('be.visible')
        this.dodajGrupePrzycisk().should('be.visible')
        this.zapiszPrzycisk().should('be.visible')
    }

    sprawdzWidokPracownicy(){
        this.usunGrupePrzycisk().should('be.visible')
        this.pracownikLista().should('be.visible')
        this.dodajPracownikaPrzycisk().should('be.visible')
        this.usunPracownikaPierwszyPrzycisk().should('be.visible')
    }
}

export const e510 = new E510()