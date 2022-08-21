class E71 {
    
    // Selektory
    ktoWpisalLista(){
        return cy.get('#WriterId')
    }

    dataOdData(){
        return cy.get('#dtFrom')
    }

    dataDoData(){
        return cy.get('#dtTo')
    }

    idObiektuPoleTekstowe(){
        return cy.get('#ObjectId')
    }

    typObiektuLista(){
        return cy.get('#ObjectTypeId')
    }

    typOperacjiLista(){
        return cy.get('#OperationTypeId')
    }

    nazwaPoleTekstowe(){
        return cy.get('#Name')
    }

    opisPoleTekstowe(){
        return cy.get('#Description')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]')
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]')
    }

    podgladPierwszyPrzycisk(){
        return cy.get('button.showHistory').first().contains('P')
    }

    // Metody
    sprawdzWidok(){
        this.ktoWpisalLista().should('be.visible')
        this.dataOdData().should('be.visible')
        this.dataDoData().should('be.visible')
        this.idObiektuPoleTekstowe().should('be.visible')
        this.typOperacjiLista().should('be.visible')
        this.nazwaPoleTekstowe().should('be.visible')
        this.opisPoleTekstowe().should('be.visible')
        this.typObiektuLista().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
    }
}

export const e71 = new E71()