class E508 {
    // Selektory
    pozycjaCennikowaLista(){
        return cy.get('select[id="EquipmentTypeId"]')
    }

    nazwaElementuSprzetowegoPoleTekstowe(){
        return cy.get('input[id="Name"]')
    }

    kodSapPoleTekstowe(){
        return cy.get('input[id="SapCode"]')
    }

    miejsceRealizacjiLista(){
        return cy.get('select[id="RealizationPlaceId"]')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]')
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]')
    }

    podgladPierwszyPrzycisk(){
        return cy.get('a[title="Podgląd"]').contains('P').first()
    }

    edycjaPierwszyPrzycisk(){
        return cy.get('a[title="Edycja"]').contains('E').first()
    }

    dodajElementSprzetowyPrzycisk(){
        return cy.get('button[title="Dodaj element sprzętowy"]')
    }

    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/smf/Equipment') 
    }
    
    sprawdzWidok(){
        cy.get('.active').should('contain', 'Elementy sprzętowe')
        this.pozycjaCennikowaLista().should('be.visible')
        this.nazwaElementuSprzetowegoPoleTekstowe().should('be.visible')
        this.kodSapPoleTekstowe().should('be.visible')
        this.miejsceRealizacjiLista().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.podgladPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok12(){
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok14(){
        this.dodajElementSprzetowyPrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }
}

export const e508 = new E508()