class E514 {
    
    // Selektory
    nazwaPoleTekstowe(){
        return cy.get('#NameFilter')
    }

    rodzajZasobuLista(){
        return cy.get('#ResourceTypeIdFilter')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]')
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]')
    }

    eksportujWidoczneKolumnyPrzycisk(){
        return cy.get('button[title="Eksportuj do Excel widoczne kolumny"]')
    }

    eksportujWszystkieKolumnyPrzycisk(){
        return cy.get('button[title="Eksportuj do Excel wszystkie kolumny"]')
    }

    wybierzWidoczneKolumnyPrzycisk(){
        return cy.get('button[title="Wybierz widoczne kolumny"]')
    }

    podgladPierwszyPrzycisk(){
        return cy.get('a[title="Podgląd"]').contains('P').first()
    }

    edycjaPierwszyPrzycisk(){
        return cy.get('a[title="Edycja"]').contains('E').first()
    }

    usunPierwszyPrzycisk(){
        return cy.get('a[title="Usuń"]').first()
    }

    dodajPowodNiedostepnosciPrzycisk(){
        return cy.get('button[title="Dodaj VAT w Kosztach"]')
    }

    // Metody
    sprawdzWidok(){
        this.nazwaPoleTekstowe().should('be.visible')
        this.rodzajZasobuLista().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.eksportujWidoczneKolumnyPrzycisk().should('be.visible')
        this.eksportujWszystkieKolumnyPrzycisk().should('be.visible')
        this.wybierzWidoczneKolumnyPrzycisk().should('be.visible')
        this.podgladPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok1(){
        this.edycjaPierwszyPrzycisk().should('be.visible')
        this.usunPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok14(){
        this.dodajPowodNiedostepnosciPrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
        this.usunPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok28(){
        this.dodajPowodNiedostepnosciPrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
        this.usunPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok29(){
        this.dodajPowodNiedostepnosciPrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
        this.usunPierwszyPrzycisk().should('be.visible')
    }
}

export const e514 = new E514()