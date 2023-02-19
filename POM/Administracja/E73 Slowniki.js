class E73{
    // Selektory
    dodajNowyElementDoSlownikaPrzycisk(){
        return cy.get('button[id="button_add"]')
    }

    wyczyscCachePrzycisk(){
        return cy.get('a[href="/DictionaryEdit/ClearCache"]')
    }

    przedmiotZleceniaLista(){
        return cy.get('select[id="DictionaryType"]')
    }

    nazwaPoleTekstowe(){
        return cy.get('input[id="Name"]')
    }

    czyAktywnyLista(){
        return cy.get('select[id="IsActive"]')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]')
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]')
    }

    slownikiTabela(){
        return cy.get('table')
    }

    nazwaPopupPoleTekstowe(){
        return cy.get('input#Name')
    }

    czyAktywnyPopupRadio(){
        return cy.get('input#IsActive')
    }

    czyEdytowalnyPopupPrzyciskWyboru(){
        return cy.get('#IsEditable')
    }
    
    potwierdźPopupPrzycisk(){
        return cy.get('button#addModal-yesBtn')
    }
	
    anulujPopupPrzycisk(){
        return cy.get('button#addModal-noBtn')
    }

    zamknijPopupPrzycisk(){
        return cy.get('#addModal-close')
    }

    podgladPierwszyPrzycisk(){
        return cy.get('a[title="Podgląd"]').first().contains('P')
    }

    edycjaPierwszyPrzycisk(){
        return cy.get('a[title="Edycja"]').first().contains('E')
    }

    // Metody
    sprawdzWidok(){
        cy.url().should('contain', '/DictionaryEdit/Index')
        this.przedmiotZleceniaLista().should('be.visible').and('have.attr', 'data-placeholder','Wybierz...')
        this.nazwaPoleTekstowe().should('be.visible').and('have.attr', 'title','Nazwa')
        this.czyAktywnyLista().should('be.visible').and('have.attr', 'data-title','Czy Aktywny')
        this.wyszukajPrzycisk().should('be.visible').and('have.attr', 'title','Wyszukaj')
        this.wyczyscFiltryPrzycisk().should('be.visible').and('have.attr', 'title','Wyczyść filtry wyszukiwania')
        this.podgladPierwszyPrzycisk().should('be.visible')
    }

    sprawdzPopup(){
        this.edycjaPierwszyPrzycisk().should('be.visible')
        this.dodajNowyElementDoSlownikaPrzycisk().should('be.visible').click()
        this.nazwaPopupPoleTekstowe().should('be.visible')
        this.czyAktywnyPopupRadio().should('be.visible')
        this.potwierdźPopupPrzycisk().should('be.visible')
        this.anulujPopupPrzycisk().should('be.visible')
        this.zamknijPopupPrzycisk().should('be.visible').click()
    }

    sprawdzPopup1(){
        this.edycjaPierwszyPrzycisk().should('be.visible')
        this.dodajNowyElementDoSlownikaPrzycisk().should('be.visible').click()
        this.nazwaPopupPoleTekstowe().should('be.visible')
        this.czyAktywnyPopupRadio().should('be.visible')
        this.czyEdytowalnyPopupPrzyciskWyboru().should('be.visible')
        this.potwierdźPopupPrzycisk().should('be.visible')
        this.anulujPopupPrzycisk().should('be.visible')
        this.zamknijPopupPrzycisk().should('be.visible').click()
    }
}

export const e73 = new E73()