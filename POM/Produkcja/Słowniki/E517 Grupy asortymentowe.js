class E517 {
    
    // Selektory
    nazwaPoleTekstowe(){
        return cy.get('#Name')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]')
    }
	
    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]')
    }
	
    dodajPrzycisk(){
        return cy.get('button[title="Dodaj"]')
    }
	
    podgladPierwszyPrzycisk(){
        return cy.get('a[title="Podgląd"]').first().contains('P')
    }
	
    grupyAsortymentoweTabela(){
        return cy.get('table[aria-describedby="assortymentList_table_info"]')
    }
	
    edycjaPierwszyPrzycisk(){
        return cy.get('a[title="Edycja"]').first().contains('E')
    }
	
    usunPrzycisk(){
        return cy.get('a[title="Usuń"]')
    }	
		
    // dopisać selektory i metody do tabeli wyników	
		
    // Metody
    sprawdzWidok(){
        this.nazwaPoleTekstowe().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.dodajPrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
        this.podgladPierwszyPrzycisk().should('be.visible')
        this.usunPrzycisk().should('be.visible')
    }
}

export const e517 = new E517()