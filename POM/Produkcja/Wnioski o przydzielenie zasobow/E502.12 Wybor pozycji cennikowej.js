class E50212 {
    
    // Selektory
    zatwierdzPrzycisk(){
        return cy.get('button#pricePositionModal-yesBtn').should('contain', 'Zatwierdź')
    }

    anulujPrzycisk(){
        return cy.get('button#pricePositionModal-noBtn').should('contain', 'Anuluj')
    }

    wyszukajPrzycisk(){
        return cy.get('button#positionsearchBtn')
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('button#clearFilter')
    }

    pozycjeCennikoweEtykieta(){
        return cy.get('h4.modal-title').contains('Pozycje cennikowe')
    }

    nazwaPoleTekstowe(){
        return cy.get('input#Name')
    }

    gatunekFormaLista(){
        return cy.get('select#TypeId')
    }

    podgatunekLista(){
        return cy.get('select#SubtypeId')
    }

    kategoriaLista(){
        return cy.get('select#CategoryId')
    }

    zaznaczWszystkiePrzyciskWyboru(){
        return cy.get('input#selectAllCheckboxes').first()
    }

    zaznaczPozycjeCennikowaPierwszyPrzyciskWyboru(){
        return cy.get('td.checkboxClass > input[type="checkbox"]').first()
    }

    pokazXPozycjiLista(){
        return cy.get('select[name="pricePositionTable_table_length"]')
    }

    // Metody
    sprawdzWidok(){
        this.zatwierdzPrzycisk().should('be.visible')
        this.anulujPrzycisk().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.pozycjeCennikoweEtykieta().should('be.visible')
        this.nazwaPoleTekstowe().should('be.visible')
        this.gatunekFormaLista().should('be.visible')
        this.podgatunekLista().should('be.visible')
        this.kategoriaLista().should('be.visible')
        this.zaznaczWszystkiePrzyciskWyboru().should('be.visible')
        this.zaznaczPozycjeCennikowaPierwszyPrzyciskWyboru().should('be.visible')
    }

}

export const e50212 = new E50212()
        