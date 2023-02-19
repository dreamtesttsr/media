class E512 {
    
    // Selektory
    pozycjaCennikaLista(){
        return cy.get('#PriceListPosition')
    }

    nazwaPoleTekstowe(){
        return cy.get('#Name')
    }

    kategoriaLista(){
        return cy.get('#Category')
    }

    kodSapUrzadzeniaPoleTekstowe(){
        return cy.get('#SapCode')
    }

    aktywneOdData(){
        return cy.get('#ActiveFrom')
    }

    aktywneDoData(){
        return cy.get('#ActiveTo')
    }

    niedostepneOdData(){
        return cy.get('#UnavailableFrom')
    }

    niedostepneDoData(){
        return cy.get('#UnavailableTo')
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
        return cy.get('a[title="Usuń miejsce realizacji"]').first()
    }

    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/smf/RealisationLocations')
    }

    sprawdzWidok(){
        cy.get('.active').should('contain', 'Miejsca realizacji produkcji')
        this.pozycjaCennikaLista().should('be.visible')
        this.nazwaPoleTekstowe().should('be.visible')
        this.kategoriaLista().should('be.visible')
        this.kodSapUrzadzeniaPoleTekstowe().should('be.visible')
        this.aktywneOdData().should('be.visible')
        this.aktywneDoData().should('be.visible')
        this.niedostepneOdData().should('be.visible')
        this.niedostepneDoData().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.eksportujWidoczneKolumnyPrzycisk().should('be.visible')
        this.eksportujWszystkieKolumnyPrzycisk().should('be.visible')
        this.wybierzWidoczneKolumnyPrzycisk().should('be.visible')
        this.podgladPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok14(){
        this.edycjaPierwszyPrzycisk().should('be.visible')
        this.usunPierwszyPrzycisk().should('be.visible')
    }
}

export const e512 = new E512()