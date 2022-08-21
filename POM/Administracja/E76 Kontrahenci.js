class E76 {
    
    // Selektory
    nazwaPoleTekstowe(){
        return cy.get('#Name')
    }

    nipPoleTekstowe(){
        return cy.get('#Nip')
    }

    regonPoleTekstowe(){
        return cy.get('#Regon')
    }

    peselPoleTekstowe(){
        return cy.get('#Pesel')
    }

    imiePoleTekstowe(){
        return cy.get('#FirstName')
    }

    nazwiskoPoleTekstowe(){
        return cy.get('#LastName')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]')
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]')
    }

    podgladPierwszyPrzycisk(){
        return cy.get('a[title="Podgląd"]').first().contains('P')
    }

    edycjaPierwszyPrzycisk(){
        return cy.get('a[title="Edycja"]').first().contains('E')
    }

    dodajKontrahentaPrzycisk(){
        return cy.get('button[title="Dodaj kontrahenta"]')
    }

    // Metody
    sprawdzWidok(){
        this.nazwaPoleTekstowe().should('be.visible')
        this.nipPoleTekstowe().should('be.visible')
        this.regonPoleTekstowe().should('be.visible')
        this.peselPoleTekstowe().should('be.visible')
        this.imiePoleTekstowe().should('be.visible')
        this.nazwiskoPoleTekstowe().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.podgladPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok6(){
        this.dodajKontrahentaPrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok26(){
        this.dodajKontrahentaPrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

}

export const e76 = new E76()