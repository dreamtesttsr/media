class E72 {
    
    // Selektory
    nazwaPoleTekstowe(){
        return cy.get('input[id="Search"]')
    }

    agencjaLista(){
        return cy.get('select[id="AgencyId"]')
    }

    dotyczyLista(){
        return cy.get('select[id="IsAgreement"]')
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

    zamknijPrzycisk(){
        return cy.get('button#addModal_modal-close')
    }
	
    nazwaPopupPoleTekstowe(){
        return cy.get('#Name')
    }
	
    agencjaPopupLista(){
        return cy.get('#select2-IdAgency-container')
    }
	
    czyAktywnyPopupPrzyciskWyboru(){
        return cy.get('#IsActive')
    }
		
    czyEdytowalnyPopupPrzyciskWyboru(){
        return cy.get('#IsEditable')
    }
	
    dotyczyPopupRadio(){
        return cy.get('input#IsAgreement')
    }
    
    potwierdźPopupPrzycisk(){
        return cy.get('#addModal_modal-yesBtn')
    }
	
    anulujPopupPrzycisk(){
        return cy.get('#addModal_modal-noBtn')
    }

    dodajRodzajStatusuPrzycisk(){
        return cy.get('button[title="Dodaj rodzaj statusu"]')
    }

    podgladPierwszyPrzycisk(){
        return cy.get('a[title="Podgląd"]').contains('P').first()
    }

    edycjaPierwszyPrzycisk(){
        return cy.get('a[title="Edycja"]').contains('E').first()
    }

    zamknijPopupPrzycisk(){
        return cy.get('#addModal_modal-close')
    }

    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/StatusType/Index') 
    }
    
    sprawdzWidok(){
        cy.get('.active').should('contain', 'Rodzaj Statusu')
        this.nazwaPoleTekstowe().should('be.visible')
        this.agencjaLista().should('be.visible')
        this.dotyczyLista().should('be.visible')
        this.czyAktywnyLista().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.podgladPierwszyPrzycisk().should('be.visible')
    }

    sprawdzPopup(){
        this.edycjaPierwszyPrzycisk().should('be.visible')
        this.dodajRodzajStatusuPrzycisk().should('be.visible').click()
        this.agencjaPopupLista().should('be.visible')
        this.nazwaPopupPoleTekstowe().should('be.visible')
        this.czyAktywnyPopupPrzyciskWyboru().should('be.visible')
        this.dotyczyPopupRadio().should('have.attr', 'value','true')
        this.potwierdźPopupPrzycisk().should('be.visible')
        this.anulujPopupPrzycisk().should('be.visible')
        this.zamknijPopupPrzycisk().should('be.visible').click()
    }

    sprawdzPopup1(){
        this.edycjaPierwszyPrzycisk().should('be.visible')
        this.dodajRodzajStatusuPrzycisk().should('be.visible').click()
        this.agencjaPopupLista().should('be.visible')
        this.nazwaPopupPoleTekstowe().should('be.visible')
        this.czyAktywnyPopupPrzyciskWyboru().should('be.visible')
        this.czyEdytowalnyPopupPrzyciskWyboru().should('be.visible')
        this.dotyczyPopupRadio().should('have.attr', 'value','true')
        this.potwierdźPopupPrzycisk().should('be.visible')
        this.anulujPopupPrzycisk().should('be.visible')
        this.zamknijPopupPrzycisk().should('be.visible').click()
    }

}

export const e72 = new E72()