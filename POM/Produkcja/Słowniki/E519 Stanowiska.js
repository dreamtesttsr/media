class E519{
    // selektory
    nazwaPoleTekstowe(){
        return cy.get('input[id="Name"]')
    }
	
    kodSapPoleTekstowe(){
        return cy.get('input[id="SapCode"]')
    }
	
    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]').first()
    }
	
    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]')
    }
	
    dodajStanowiskoPrzycisk(){
        return cy.get('button[class="btn btn-secondary btn-sm btn-success"]')
    }
	
    stanowiskaTabela(){
        return cy.get('table[aria-describedby="positionsList_table_info"]')
    }
	
    podgladPierwszyPrzycisk(){
        return cy.get('[data-cy="Podglad"]').contains('P').first()
    }
	
    edycjaPierwszyPrzycisk(){
        return cy.get('[data-cy="Edycja"]').contains('E').first()
    }
	
    usunPierwszyPrzycisk(){
        return cy.get('[data-cy="Usun"]').first()
    }
	
    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/smf/Positions')
    }

    sprawdzWidok(){
        this.nazwaPoleTekstowe().should('be.visible')
        this.kodSapPoleTekstowe().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.stanowiskaTabela().should('be.visible')
        this.podgladPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok1(){
        this.dodajStanowiskoPrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
        this.usunPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok28(){
        this.dodajStanowiskoPrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
        this.usunPierwszyPrzycisk().should('be.visible')
    }
    
}

export const e519 = new E519()