class E78 {
    
    // Selektory
    loginNazwaEmailPoleTekstowe(){
        return cy.get('#Search')
    }

    rolaLista(){
        return cy.get('#RoleId')
    }

    agencjaLista(){
        return cy.get('#AgencyId')
    }

    czyAktywnyLista(){
        return cy.get('#IsActive')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]')
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]')
    }

    edycjaPierwszyPrzycisk(){
        return cy.get('a[title="Edycja"]').first().contains('E')
    }

    dodajUzytkownikaPrzycisk(){
        return cy.get('button[title="Dodaj Użytkownika"]')
    }

    // Metody
    sprawdzWidok(){
        this.loginNazwaEmailPoleTekstowe().should('be.visible')
        this.rolaLista().should('be.visible')
        this.agencjaLista().should('be.visible')
        this.czyAktywnyLista().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
    }

    sprawdzWidok1(){
        this.dodajUzytkownikaPrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().scrollIntoView().should('be.visible')
    }
}

export const e78 = new E78()